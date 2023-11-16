import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { CharacterService } from '../character/character.service';
import { InventoryContainerEnum } from '../shared/enums/inventory-container.enum';
import { CharacterUpdateContainerDto } from '../shared/dtos/character-update-container.dto';
import { CharacterInventoryService } from '../character-inventory/character-inventory.service';
import { CharacterCreateDto } from '../shared/dtos/character-create.dto';

@Controller('character')
export class CharacterController {
  constructor(private characterService: CharacterService, private inventoryService: CharacterInventoryService) {}

  @Get()
  public get() {
    return this.characterService.getAll();
  }

  @Get(':id')
  public getById(@Param('id') id: number) {
    return this.characterService.get(id);
  }

  @Post()
  public async create(@Body() dto: CharacterCreateDto) {
    const character = await this.characterService.create(dto.name, dto.server);

    if (character != null && character.id != 0) {
      const containerList = Object.values(InventoryContainerEnum);

      for (const containerType of containerList) {
        const container = await this.inventoryService.createContainer(character.id, containerType);
        await this.inventoryService.initContainerItems(container.id);
      }
    }

    return character;
  }

  @Delete(':id')
  public async delete(@Param('id') id: number) {
    const character = await this.characterService.get(id);
    if (character == null) {
      const errorMessage = 'character with ID ' + id.toString() + ' not found';
      throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
    }

    await this.inventoryService.deleteByCharacterId(id);
    await this.characterService.delete(id);
  }

  @Get('inventory/:id')
  public getInventory(@Param('id') id: number) {
    return this.characterService.getInventory(id);
  }

  @Get('inventory/:id/:container')
  public getInventoryContainer(@Param('id') id: number, @Param('container') container: InventoryContainerEnum) {
    return this.characterService.getInventoryContainer(id, container);
  }

  @Post('inventory/')
  public async updateContainer(@Body() dto: CharacterUpdateContainerDto) {
    if (!Object.values(InventoryContainerEnum).includes(dto.type)) {
      const errorMessage = 'container type ' + dto.type + ' not allowed';
      throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
    }

    const character = await this.characterService.getByNameAndServer(dto.characterName, dto.server);
    if (character == null) {
      const errorMessage = 'character with ' + dto.characterName + ' on ' + dto.server + ' not found';
      throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
    }

    const doesContainerExist = await this.inventoryService.doesExist(character.id, dto.type);
    if (!doesContainerExist) {
      await this.inventoryService.createContainer(character.id, dto.type);
    }

    await this.inventoryService.updateContainerItems(character.id, dto.type, dto.items);
  }
}

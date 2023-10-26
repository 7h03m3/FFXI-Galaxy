import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CharacterService } from '../character/character.service';
import { InventoryContainerEnum } from '../shared/enums/inventory-container.enum';
import { CharacterUpdateContainerDto } from '../shared/dtos/character-update-container.dto';
import { CharacterInventoryService } from '../character-inventory/character-inventory.service';

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

  @Get('inventory/:id')
  public getInventory(@Param('id') id: number) {
    return this.characterService.getInventory(id);
  }

  @Get('inventory/:id/:container')
  public getInventoryContainer(@Param('id') id: number, @Param('container') container: InventoryContainerEnum) {
    return this.characterService.getInventoryContainer(id, container);
  }

  @Post('inventory/')
  public async getUpdateContainer(@Body() dto: CharacterUpdateContainerDto) {
    const doesCharacterExist = await this.characterService.doesExist(dto.characterId);
    if (!doesCharacterExist) {
    }

    return this.inventoryService.updateContainer(dto.characterId, dto.type, dto.items);
  }
}

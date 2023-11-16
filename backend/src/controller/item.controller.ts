import { Controller, Get, Param } from '@nestjs/common';
import { CharacterInventoryService } from '../character-inventory/character-inventory.service';
import { ItemSearchDto } from '../shared/dtos/item-search.dto';
import { CharacterInventoryItemEntity } from '../character-inventory/character-inventory-item.entity';

@Controller('item')
export class ItemController {
  constructor(private inventoryService: CharacterInventoryService) {}

  @Get(':name')
  public async getByName(@Param('name') name: string) {
    return this.convertToDto(await this.inventoryService.getItemByName(name));
  }

  @Get(':name/:characterName')
  public async getByNameAndCharacter(@Param('name') name: string, @Param('characterName') characterName: string) {
    return this.convertToDto(await this.inventoryService.getItemByNameAndCharacter(name, characterName));
  }

  private convertToDto(list: CharacterInventoryItemEntity[]) {
    return list.map((item) => {
      const entry = new ItemSearchDto();
      entry.position = item.position;
      entry.itemId = item.itemId;
      entry.count = item.count;
      entry.name = item.name;
      entry.description = item.description;
      entry.container = item.container.type;
      entry.characterId = item.container.characterId;
      entry.characterName = item.container.character.name;
      entry.characterServer = item.container.character.server;
      return entry;
    });
  }
}

import { InventoryContainerEnum } from '../enums/inventory-container.enum';
import { CharacterDto } from './character.dto';
import { CharacterInventoryItemDto } from './character-inventory-item.dto';

export class CharacterInventoryContainerDto {
  id: number = 0;
  type: InventoryContainerEnum = InventoryContainerEnum.Inventory;
  character: CharacterDto = new CharacterDto();
  characterId: number = 0;
  items: CharacterInventoryItemDto[] = new Array<CharacterInventoryItemDto>();
}

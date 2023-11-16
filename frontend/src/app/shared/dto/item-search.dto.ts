import { InventoryContainerEnum } from '../enums/inventory-container.enum';

export class ItemSearchDto {
  position: number = 0;
  itemId: number = 0;
  count: number = 0;
  name: string = '';
  description: string = '';
  container: InventoryContainerEnum = InventoryContainerEnum.Inventory;
  characterId: number = 0;
  characterName: string = '';
  characterServer: string = '';
}

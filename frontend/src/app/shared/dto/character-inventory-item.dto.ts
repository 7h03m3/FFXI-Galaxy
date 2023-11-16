import { CharacterInventoryContainerDto } from './character-inventory-container.dto';

export class CharacterInventoryItemDto {
  id: number = 0;
  position: number = 0;
  itemId: number = 0;
  count: number = 0;
  name: string = '';
  description: string = '';
  container: CharacterInventoryContainerDto =
    new CharacterInventoryContainerDto();
  containerId: number = 0;
}

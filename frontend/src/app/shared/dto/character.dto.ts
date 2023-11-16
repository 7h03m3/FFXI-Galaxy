import { CharacterInventoryContainerDto } from './character-inventory-container.dto';

export class CharacterDto {
  id: number = 0;
  name: string = '';
  server: string = '';
  containers: CharacterInventoryContainerDto[] =
    new Array<CharacterInventoryContainerDto>();
}

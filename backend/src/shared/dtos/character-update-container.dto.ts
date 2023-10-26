import { InventoryContainerEnum } from '../enums/inventory-container.enum';
import { ApiProperty } from '@nestjs/swagger';
import { CharacterInventoryItemDto } from './character-inventory-item.dto';

export class CharacterUpdateContainerDto {
  @ApiProperty()
  characterId: number = 0;

  @ApiProperty()
  type: InventoryContainerEnum = InventoryContainerEnum.Inventory;

  @ApiProperty()
  items: CharacterInventoryItemDto[] = new Array<CharacterInventoryItemDto>();
}

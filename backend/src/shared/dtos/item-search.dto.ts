import { ApiProperty } from '@nestjs/swagger';
import { InventoryContainerEnum } from '../enums/inventory-container.enum';

export class ItemSearchDto {
  @ApiProperty()
  position: number = 0;

  @ApiProperty()
  itemId: number = 0;

  @ApiProperty()
  count: number = 0;

  @ApiProperty()
  name: string = '';

  @ApiProperty()
  description: string = '';

  @ApiProperty()
  container: InventoryContainerEnum = InventoryContainerEnum.Inventory;

  @ApiProperty()
  characterId: number = 0;

  @ApiProperty()
  characterName: string = '';

  @ApiProperty()
  characterServer: string = '';
}

import { InventoryContainerEnum } from '../enums/inventory-container.enum';
import { ApiProperty } from '@nestjs/swagger';
import { CharacterUpdateContainerItemDto } from './character-update-container-item.dto';

export class CharacterUpdateContainerDto {
  @ApiProperty()
  characterName: string = '';

  @ApiProperty()
  server: string = '';

  @ApiProperty()
  type: InventoryContainerEnum = InventoryContainerEnum.Inventory;

  @ApiProperty()
  items: CharacterUpdateContainerItemDto[] = new Array<CharacterUpdateContainerItemDto>();
}

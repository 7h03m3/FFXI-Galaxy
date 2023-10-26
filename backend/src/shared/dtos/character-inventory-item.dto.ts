import { ApiProperty } from '@nestjs/swagger';

export class CharacterInventoryItemDto {
  @ApiProperty()
  id: number = 0;

  @ApiProperty()
  itemId: number = 0;

  @ApiProperty()
  count: number = 0;

  @ApiProperty()
  containerId: number = 0;
}

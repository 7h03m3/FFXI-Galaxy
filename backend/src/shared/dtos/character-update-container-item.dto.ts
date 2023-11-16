import { ApiProperty } from '@nestjs/swagger';

export class CharacterUpdateContainerItemDto {
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
}

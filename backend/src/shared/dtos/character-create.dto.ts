import { ApiProperty } from '@nestjs/swagger';

export class CharacterCreateDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  server: string;
}

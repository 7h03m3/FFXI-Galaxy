import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CharacterInventoryContainerEntity } from '../character-inventory/character-inventory-container.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('characters')
export class CharacterEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  server: string;

  @OneToMany((type) => CharacterInventoryContainerEntity, (container) => container.character)
  @JoinColumn()
  containers: CharacterInventoryContainerEntity[];
}

import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { InventoryContainerEnum } from '../shared/enums/inventory-container.enum';
import { CharacterEntity } from '../character/character.entity';
import { CharacterInventoryItemEntity } from './character-inventory-item.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('character-inventory-containers')
export class CharacterInventoryContainerEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({
    type: 'enum',
    enum: InventoryContainerEnum,
    default: InventoryContainerEnum.Inventory,
  })
  type: InventoryContainerEnum;

  @ManyToOne((type) => CharacterEntity, (character) => character.containers)
  @JoinColumn({ name: 'characterId' })
  character: CharacterEntity;

  @ApiProperty()
  @Column()
  characterId: number;

  @OneToMany((type) => CharacterInventoryItemEntity, (item) => item.container)
  items: CharacterInventoryItemEntity[];
}

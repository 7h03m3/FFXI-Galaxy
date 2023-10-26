import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CharacterInventoryContainerEntity } from './character-inventory-container.entity';
import { ApiProperty } from '@nestjs/swagger';
import { CharacterInventoryItemDto } from '../shared/dtos/character-inventory-item.dto';

@Entity('character-inventory-items')
export class CharacterInventoryItemEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  itemId: number;

  @ApiProperty()
  @Column()
  count: number;

  @ManyToOne((type) => CharacterInventoryContainerEntity, (container) => container.items)
  @JoinColumn({ name: 'containerId' })
  container: CharacterInventoryContainerEntity;

  @ApiProperty()
  @Column()
  containerId: number;

  public loadDto(dto: CharacterInventoryItemDto) {
    this.id = dto.id;
    this.itemId = dto.itemId;
    this.count = dto.count;
    this.containerId = dto.containerId;
  }
}

import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CharacterInventoryContainerEntity } from './character-inventory-container.entity';
import { ApiProperty } from '@nestjs/swagger';
import { CharacterUpdateContainerItemDto } from '../shared/dtos/character-update-container-item.dto';

@Entity('character-inventory-items')
export class CharacterInventoryItemEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  position: number;

  @ApiProperty()
  @Column()
  itemId: number;

  @ApiProperty()
  @Column()
  count: number;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column({ type: 'text' })
  description: string;

  @ManyToOne((type) => CharacterInventoryContainerEntity, (container) => container.items)
  @JoinColumn({ name: 'containerId' })
  container: CharacterInventoryContainerEntity;

  @ApiProperty()
  @Column()
  containerId: number;

  public setEmpty(containerId: number, position: number) {
    this.containerId = containerId;
    this.position = position;
    this.id = 0;
    this.itemId = 0;
    this.count = 0;
    this.name = '';
    this.description = '';
  }

  public loadUpdateDto(dto: CharacterUpdateContainerItemDto) {
    this.itemId = dto.itemId;
    this.count = dto.count;
    this.name = dto.name;
    this.description = dto.description;
  }
}

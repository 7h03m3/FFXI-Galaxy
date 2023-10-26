import { Module } from '@nestjs/common';
import { CharacterInventoryService } from './character-inventory.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CharacterInventoryContainerEntity } from './character-inventory-container.entity';
import { CharacterInventoryItemEntity } from './character-inventory-item.entity';

@Module({
  providers: [CharacterInventoryService],
  imports: [TypeOrmModule.forFeature([CharacterInventoryContainerEntity, CharacterInventoryItemEntity])],
  exports: [CharacterInventoryService],
})
export class CharacterInventoryModule {}

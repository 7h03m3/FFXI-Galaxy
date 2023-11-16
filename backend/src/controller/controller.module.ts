import { Module } from '@nestjs/common';
import { CharacterController } from './character.controller';
import { CharacterModule } from '../character/character.module';
import { CharacterInventoryModule } from '../character-inventory/character-inventory.module';
import { ItemController } from './item.controller';

@Module({
  imports: [CharacterModule, CharacterInventoryModule],
  controllers: [CharacterController, ItemController],
})
export class ControllerModule {}

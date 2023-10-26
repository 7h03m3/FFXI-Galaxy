import { Module } from '@nestjs/common';
import { CharacterController } from './character.controller';
import { CharacterModule } from '../character/character.module';
import { CharacterInventoryModule } from '../character-inventory/character-inventory.module';

@Module({
  imports: [CharacterModule, CharacterInventoryModule],
  controllers: [CharacterController],
})
export class ControllerModule {}

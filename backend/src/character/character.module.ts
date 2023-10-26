import { Module } from '@nestjs/common';
import { CharacterService } from './character.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CharacterEntity } from './character.entity';

@Module({
  providers: [CharacterService],
  controllers: [],
  imports: [TypeOrmModule.forFeature([CharacterEntity])],
  exports: [CharacterService],
})
export class CharacterModule {}

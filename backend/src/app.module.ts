import { Module } from '@nestjs/common';
import { CharacterInventoryModule } from './character-inventory/character-inventory.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from './config/configuration';
import { CharacterModule } from './character/character.module';
import { CharacterInventoryContainerEntity } from './character-inventory/character-inventory-container.entity';
import { CharacterEntity } from './character/character.entity';
import { CharacterInventoryItemEntity } from './character-inventory/character-inventory-item.entity';
import { ControllerModule } from './controller/controller.module';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration] }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('database.host'),
        port: configService.get<number>('database.port'),
        username: configService.get('database.username'),
        password: configService.get('database.password'),
        database: configService.get('database.name'),
        entities: [CharacterEntity, CharacterInventoryContainerEntity, CharacterInventoryItemEntity],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    CharacterInventoryModule,
    CharacterModule,
    ControllerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

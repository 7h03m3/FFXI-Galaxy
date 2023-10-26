import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CharacterInventoryContainerEntity } from './character-inventory-container.entity';
import { CharacterInventoryItemEntity } from './character-inventory-item.entity';
import { InventoryContainerEnum } from '../shared/enums/inventory-container.enum';
import { CharacterInventoryItemDto } from '../shared/dtos/character-inventory-item.dto';

@Injectable()
export class CharacterInventoryService {
  constructor(
    @InjectRepository(CharacterInventoryContainerEntity)
    private containerRepository: Repository<CharacterInventoryContainerEntity>,
    @InjectRepository(CharacterInventoryItemEntity) private itemRepository: Repository<CharacterInventoryItemEntity>,
  ) {}

  public async updateContainer(
    characterId: number,
    type: InventoryContainerEnum,
    items: CharacterInventoryItemDto[],
  ): Promise<CharacterInventoryContainerEntity> {
    let container = await this.containerRepository.findOne({
      where: {
        characterId: characterId,
        type: type,
      },
    });

    if (container == null) {
      container = new CharacterInventoryContainerEntity();
      container.characterId = characterId;
      container.type = type;
      await this.containerRepository.save(container);
    } else {
      await this.itemRepository.delete({ containerId: container.id });
    }

    for (const item of items) {
      item.containerId = container.id;

      const itemEntity = new CharacterInventoryItemEntity();
      itemEntity.loadDto(item);

      await this.itemRepository.save(item);
    }

    return this.containerRepository.findOne({
      where: { id: container.id },
      relations: {
        items: true,
      },
    });
  }
}

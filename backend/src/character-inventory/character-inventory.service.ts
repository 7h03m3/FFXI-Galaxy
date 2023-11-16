import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Like, Repository } from 'typeorm';
import { CharacterInventoryContainerEntity } from './character-inventory-container.entity';
import { CharacterInventoryItemEntity } from './character-inventory-item.entity';
import { InventoryContainerEnum } from '../shared/enums/inventory-container.enum';
import { CharacterUpdateContainerItemDto } from '../shared/dtos/character-update-container-item.dto';

@Injectable()
export class CharacterInventoryService {
  constructor(
    @InjectRepository(CharacterInventoryContainerEntity)
    private containerRepository: Repository<CharacterInventoryContainerEntity>,
    @InjectRepository(CharacterInventoryItemEntity) private itemRepository: Repository<CharacterInventoryItemEntity>,
  ) {}

  public async createContainer(characterId: number, type: InventoryContainerEnum) {
    const container = new CharacterInventoryContainerEntity();
    container.characterId = characterId;
    container.type = type;
    container.items = new Array<CharacterInventoryItemEntity>();
    return await this.containerRepository.save(container);
  }

  public async initContainerItems(containerId: number) {
    const items = new Array<CharacterInventoryItemEntity>();
    for (let position = 1; position <= 80; position++) {
      const itemEntity = new CharacterInventoryItemEntity();
      itemEntity.setEmpty(containerId, position);
      items.push(itemEntity);
    }

    await this.itemRepository.createQueryBuilder().insert().into(CharacterInventoryItemEntity).values(items).execute();
  }

  public async deleteByCharacterId(characterId: number) {
    const containers = await this.containerRepository.find({
      where: {
        characterId: characterId,
      },
    });

    for (const container of containers) {
      await this.itemRepository.delete({ containerId: container.id });
      await this.containerRepository.delete({ id: container.id });
    }
  }

  public async doesExist(characterId: number, type: InventoryContainerEnum): Promise<boolean> {
    const count = await this.containerRepository.count({
      where: {
        characterId: characterId,
        type: type,
      },
    });

    return count == 1;
  }

  public async updateContainerItems(
    characterId: number,
    type: InventoryContainerEnum,
    items: CharacterUpdateContainerItemDto[],
  ) {
    const positions = items.map((a) => {
      return a.position;
    });
    const container = await this.containerRepository.findOne({
      where: {
        characterId: characterId,
        type: type,
      },
    });

    container.items = await this.itemRepository.find({
      where: {
        position: In(positions),
        containerId: container.id,
      },

      order: {
        position: 'ASC',
      },
    });

    for (const updateItem of items) {
      if (updateItem.position >= 1 && updateItem.position <= 80) {
        let item = undefined;
        if (container != null && container.items != null && container.items.length != 0) {
          item = container.items.find((a) => {
            return a.position == updateItem.position;
          });
        }

        if (item == undefined) {
          item = new CharacterInventoryItemEntity();
          item.containerId = container.id;
          item.position = updateItem.position;
        }

        item.loadUpdateDto(updateItem);
        await this.itemRepository.save(item);
      }
    }
  }

  public async getItemByName(name: string) {
    return await this.itemRepository.find({
      where: {
        name: Like('%' + name + '%'),
      },
      relations: {
        container: {
          character: true,
        },
      },
    });
  }

  public async getItemByNameAndCharacter(name: string, characterName: string) {
    return await this.itemRepository.find({
      where: {
        name: Like('%' + name + '%'),
        container: {
          character: {
            name: characterName,
          },
        },
      },
      relations: {
        container: {
          character: true,
        },
      },
    });
  }
}

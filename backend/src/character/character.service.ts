import { Injectable } from '@nestjs/common';
import { CharacterEntity } from './character.entity';
import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { InventoryContainerEnum } from '../shared/enums/inventory-container.enum';

@Injectable()
export class CharacterService {
  constructor(@InjectRepository(CharacterEntity) private repository: Repository<CharacterEntity>) {}

  public async create(name: string, server: string): Promise<CharacterEntity> {
    const entity = new CharacterEntity();
    entity.name = name;
    entity.server = server;
    await this.repository.save(entity);

    return entity;
  }

  public async doesExistByNameAndServer(name: string, server: string): Promise<boolean> {
    const count = await this.repository.count({
      where: {
        name: name,
        server: server,
      },
    });

    return count == 1;
  }

  public async doesExist(id: number): Promise<boolean> {
    const count = await this.repository.count({
      where: {
        id: id,
      },
    });

    return count == 1;
  }

  public async get(id: number): Promise<CharacterEntity> {
    return this.repository.findOne({ where: { id: id } });
  }

  public async getAll(): Promise<CharacterEntity[]> {
    return this.repository.find();
  }

  public async getInventory(id: number): Promise<CharacterEntity> {
    return this.repository.findOne({
      where: { id: id },
      relations: {
        containers: { items: true },
      },
    });
  }

  public async getInventoryContainer(id: number, container: InventoryContainerEnum): Promise<CharacterEntity> {
    return this.repository.findOne({
      where: {
        id: id,
        containers: {
          type: container,
        },
      },
      relations: {
        containers: { items: true },
      },
    });
  }

  public async getByNameAndServer(name: string, server: string): Promise<CharacterEntity> {
    return this.repository.findOne({ where: { name: name, server: server } });
  }

  public async delete(id: number): Promise<DeleteResult> {
    return this.repository.delete({ id: id });
  }
}

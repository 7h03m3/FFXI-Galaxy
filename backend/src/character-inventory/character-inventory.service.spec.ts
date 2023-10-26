import { Test, TestingModule } from '@nestjs/testing';
import { CharacterInventoryService } from './character-inventory.service';

describe('CharacterInventoryService', () => {
  let service: CharacterInventoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CharacterInventoryService],
    }).compile();

    service = module.get<CharacterInventoryService>(CharacterInventoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

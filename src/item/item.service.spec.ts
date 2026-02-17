import { Test, TestingModule } from '@nestjs/testing';
import { Item } from './entity/item.entity';
import { ItemService } from './item.service';
import { ItemFactory } from './item.factory';
import { getRepositoryToken } from '@nestjs/typeorm';
import { jest } from '@jest/globals';

class itemRepositoryMock {
  find = jest.fn() as jest.MockedFunction<() => Promise<Item[]>>;
  findOne = jest.fn() as jest.MockedFunction<
    (id: string) => Promise<Item | null>
  >;
  save = jest.fn() as jest.MockedFunction<(item: Item) => Promise<Item>>;
}

class itemFactoryMock {
  create = jest.fn() as jest.MockedFunction<(dto: any) => Item>;
}

describe('ItemService', () => {
  let itemService: ItemService;
  let itemRepository: itemRepositoryMock;
  let itemFactory: itemFactoryMock;

  beforeAll(async () => {
    const testingModule: TestingModule = await Test.createTestingModule({
      providers: [
        ItemService,
        {
          provide: ItemFactory,
          useClass: itemFactoryMock,
        },
        {
          provide: getRepositoryToken(Item),
          useClass: itemRepositoryMock,
        },
      ],
    }).compile();

    itemService = testingModule.get<ItemService>(ItemService);
    itemRepository = testingModule.get<itemRepositoryMock>(
      getRepositoryToken(Item),
    );
    itemFactory = testingModule.get<itemFactoryMock>(ItemFactory);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should be defined', () => {
    expect(itemService).toBeDefined();
  });
});

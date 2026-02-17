import { Test, TestingModule } from '@nestjs/testing';
import { RpgService } from './rpg.service';
import { PaginationService } from '../common/pagination/pagination.service';
import { Rpg } from './entities/rpg.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { QueryPaginationDto } from 'src/common/pagination/dto/query_pagination.dto';
import { PaginatedDataDto } from 'src/common/pagination/dto/paginated-data.dto';
import { jest } from '@jest/globals';
import { Item } from 'src/item/entity/item.entity';
import { ItemCategory } from 'src/item/enum/item-category.enum';
import { ItemResponseDto } from 'src/item/dto/item-response.dto';

class rpgRepositoryMock {
  findOne = jest.fn() as jest.MockedFunction<
    (id: string) => Promise<Rpg | null>
  >;
  find = jest.fn() as jest.MockedFunction<() => Promise<Rpg[]>>;
  save = jest.fn() as jest.MockedFunction<(rpg: Rpg) => Promise<Rpg>>;
}

class itemRepositoryMock {
  find = jest.fn() as jest.MockedFunction<() => Promise<Item[]>>;
  findOne = jest.fn() as jest.MockedFunction<
    (id: string) => Promise<Item | null>
  >;
}

describe('RpgService', () => {
  let rpgService: RpgService;
  let paginationService: PaginationService;
  let rpgRepository: rpgRepositoryMock;
  let itemRepository: itemRepositoryMock;

  const mockPaginationService = {
    returnPaginatedData: jest.fn() as jest.MockedFunction<
      <T>(data: T[], paginationDto?: QueryPaginationDto) => PaginatedDataDto<T>
    >,
  };

  beforeAll(async () => {
    const moduleReference: TestingModule = await Test.createTestingModule({
      providers: [
        RpgService,
        {
          provide: PaginationService,
          useValue: mockPaginationService,
        },
        {
          provide: getRepositoryToken(Rpg),
          useClass: rpgRepositoryMock,
        },
        {
          provide: getRepositoryToken(Item),
          useClass: itemRepositoryMock,
        },
      ],
    }).compile();

    rpgService = moduleReference.get<RpgService>(RpgService);
    paginationService =
      moduleReference.get<PaginationService>(PaginationService);
    rpgRepository = moduleReference.get<rpgRepositoryMock>(
      getRepositoryToken(Rpg),
    );
    itemRepository = moduleReference.get<itemRepositoryMock>(
      getRepositoryToken(Item),
    );
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should be defined', () => {
    expect(rpgService).toBeDefined();
  });

  it('Should return a list of Rpgs', async () => {
    const mockPaginatedResult: PaginatedDataDto<Rpg> = {
      totalItems: 2,
      data: [
        {
          id: 'e0510a77-1872-48ed-8f39-31b333ff4f3c',
          name: 'rpg1',
          description: 'descrição do rpg1',
          launchYear: '1998',
          publisher: 'editora1',
          author: 'autor1',
        },
        {
          id: '6bb01647-d559-460a-bbda-1a84cb2bc8d9',
          name: 'rpg2',
          description: 'descrição do rpg2',
          launchYear: '1998',
          publisher: 'editora1',
          author: 'autor1',
        },
      ],
      limit: 10,
      offset: 0,
      hasNext: false,
    };
    const mockedRpgList = [
      {
        id: 'e0510a77-1872-48ed-8f39-31b333ff4f3c',
        name: 'rpg1',
        description: 'descrição do rpg1',
        launchYear: '1998',
        publisher: 'editora1',
        author: 'autor1',
      },
      {
        id: '6bb01647-d559-460a-bbda-1a84cb2bc8d9',
        name: 'rpg2',
        description: 'descrição do rpg2',
        launchYear: '1998',
        publisher: 'editora1',
        author: 'autor1',
      },
    ];

    rpgRepository.find.mockResolvedValueOnce(mockedRpgList);
    mockPaginationService.returnPaginatedData.mockReturnValueOnce(
      mockPaginatedResult,
    );

    const foundRpgs = await rpgService.getAllRpgs();

    expect(rpgRepository.find).toHaveBeenCalledTimes(1);
    expect(paginationService.returnPaginatedData).toHaveBeenCalledWith(
      mockedRpgList,
      undefined,
    );
    expect(foundRpgs).toEqual(mockPaginatedResult);
  });

  it('Should return an empty data array when no information is found', async () => {
    const mockedResult: PaginatedDataDto<Rpg> = {
      totalItems: 0,
      data: [],
      limit: 10,
      offset: 0,
      hasNext: false,
    };
    const mockRpgList = [];
    rpgRepository.find.mockResolvedValueOnce(mockRpgList);
    mockPaginationService.returnPaginatedData.mockReturnValueOnce(mockedResult);

    const rpgs = await rpgService.getAllRpgs();

    expect(rpgRepository.find).toHaveBeenCalledTimes(1);
    expect(paginationService.returnPaginatedData).toHaveBeenCalledTimes(1);
    expect(paginationService.returnPaginatedData).toHaveBeenCalledWith(
      mockRpgList,
      undefined,
    );
    expect(rpgs).toEqual(mockedResult);
  });

  it('Should return all public information of an Rpg', async () => {
    const mockRpg: Rpg = {
      id: 'e0510a77-1872-48ed-8f39-31b333ff4f3c',
      name: 'rpg1',
      description: 'descrição do rpg1',
      launchYear: '1998',
      publisher: 'editora1',
      author: 'autor1',
    };

    rpgRepository.findOne.mockResolvedValueOnce(mockRpg);

    const foundRpg = await rpgService.getRpgInfo(mockRpg.id);

    expect(rpgRepository.findOne).toHaveBeenCalledTimes(1);
    expect(foundRpg).toEqual(mockRpg);
  });

  it('Should throw an error if the Rpg is not found', async () => {
    const mockRpgId = 'e0510a77-1872-48ed-8f39-31b333ff4f3c';
    rpgRepository.findOne.mockResolvedValueOnce(null);

    await expect(rpgService.getRpgInfo(mockRpgId)).rejects.toThrow(
      'Rpg not found',
    );
  });

  it('Should return a list of all items in an Rpg', async () => {
    const rpgId = 'e0510a77-1872-48ed-8f39-31b333ff4f3c';
    const mockItems: Item[] = [
      {
        id: 'b8d02fac-366d-47ff-94ff-f82ec39002d5',
        name: 'item 1',
        description: 'descrição do item 1',
        category: ItemCategory.FOOD,
        price: 123,
        weight: 2,
        rpgId: rpgId,
      },
      {
        id: 'b8d02fac-366d-47ff-94ff-f82ec39002d5',
        name: 'item 2',
        description: 'descrição do item 2',
        category: ItemCategory.CLOTHING,
        price: 123,
        weight: 1,
        rpgId: rpgId,
      },
    ];
    const mockedResult: PaginatedDataDto<ItemResponseDto> = {
      totalItems: 2,
      data: mockItems,
      limit: 10,
      offset: 0,
      hasNext: false,
    };

    itemRepository.find.mockResolvedValue(mockItems);
    mockPaginationService.returnPaginatedData.mockReturnValueOnce(mockedResult);

    const items = await rpgService.getRpgItems(rpgId);

    expect(items).toEqual(mockedResult);
  });

  it('Should return an empty list when there are no items in an Rpg', async () => {
    const mockedResult: PaginatedDataDto<Item> = {
      totalItems: 0,
      data: [],
      limit: 10,
      offset: 0,
      hasNext: false,
    };
    const rpgId = 'e0510a77-1872-48ed-8f39-31b333ff4f3c';
    const mockItems: Item[] = [];

    itemRepository.find.mockResolvedValue(mockItems);
    mockPaginationService.returnPaginatedData.mockReturnValueOnce(mockedResult);

    const items = await rpgService.getRpgItems(rpgId);

    expect(items).toEqual(mockedResult);
  });

  it('Should return all of the public information of an item from an Rpg', async () => {
    const rpgId = 'e0510a77-1872-48ed-8f39-31b333ff4f3c';
    const itemId = 'b8d02fac-366d-12321-94ff-f82ec39002d5';
    const item = {
      id: itemId,
      name: 'item 2',
      description: 'descrição do item 2',
      category: ItemCategory.CLOTHING,
      price: 123,
      weight: 1,
      rpgId: rpgId,
    };

    itemRepository.findOne.mockResolvedValue(item);

    const foundItem = await rpgService.getRpgItemInfo(rpgId, itemId);

    expect(foundItem).toEqual(item);
  });

  it('Should throw a NotFoundException when an item is not found', async () => {
    const rpgId = 'e0510a77-1872-48ed-8f39-31b333ff4f3c';
    const itemId = 'b8d02fac-366d-47ff-94ff-f82ec39002d5';
    itemRepository.findOne.mockResolvedValueOnce(null);

    await expect(rpgService.getRpgItemInfo(rpgId, itemId)).rejects.toThrow(
      'Item not found',
    );
  });

  it('Should create an Rpg', () => {});

  it('Should update an Rpg information', () => {});

  it('Should delete an Rpg', () => {});
});

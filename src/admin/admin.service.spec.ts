import { Test } from '@nestjs/testing';
import { HashingService } from 'src/common/hashing/hashing.service';
import { AdminService } from './admin.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Admin } from './entity/admin.entity';
import { QueryPaginationDto } from 'src/common/pagination/dto/query_pagination.dto';
import { PaginatedDataDto } from 'src/common/pagination/dto/paginated-data.dto';
import { PaginationService } from 'src/common/pagination/pagination.service';

class mockHashingService {
  hash = jest.fn();
  compare = jest.fn();
}

class mockAdminRepository {
  save = jest.fn();
  find = jest.fn();
  findOne = jest.fn();
}

describe('AdminService', () => {
  const mockPaginationService = {
    returnPaginatedData: jest.fn() as jest.MockedFunction<
      <T>(data: T[], paginationDto?: QueryPaginationDto) => PaginatedDataDto<T>
    >,
  };
  let adminService: AdminService;
  let hashingService: mockHashingService;
  let adminRepository: mockAdminRepository;
  beforeAll(async () => {
    const testingModule = await Test.createTestingModule({
      providers: [
        AdminService,
        {
          provide: HashingService,
          useClass: mockHashingService,
        },
        {
          provide: getRepositoryToken(Admin),
          useClass: mockAdminRepository,
        },
        {
          provide: PaginationService,
          useValue: mockPaginationService,
        },
      ],
    }).compile();

    adminService = testingModule.get(AdminService);
    hashingService = testingModule.get(HashingService);
    adminRepository = testingModule.get(getRepositoryToken(Admin));
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should be Defined', () => {
    expect(adminService).toBeDefined();
  });

  it('Should create a new admin account that is not allowed', async () => {
    const newAdminAccount = {
      name: 'teste1',
      email: 'teste123@gmail.com',
      password: 'teste123',
    };

    adminRepository.findOne.mockResolvedValueOnce(null);
    hashingService.hash.mockResolvedValueOnce('hashedPassword');
    adminRepository.save.mockResolvedValueOnce({
      name: 'teste1',
      email: 'teste123@gmail.com',
      password: 'hashedPassword',
    });

    const newAdmin = await adminService.signup(newAdminAccount);
    expect(newAdmin).toEqual({
      name: 'teste1',
      email: 'teste123@gmail.com',
    });
  });

  it('Should return a list of all admins', async () => {
    const adminList = [
      {
        name: 'teste1',
        email: 'teste123@gmail.com',
      },
      {
        name: 'teste2',
        email: 'teste456@gmail.com',
      },
    ];

    const mockedResult: PaginatedDataDto<{ name: string; email: string }> = {
      totalItems: 2,
      data: adminList,
      limit: 10,
      offset: 0,
      hasNext: false,
    };

    adminRepository.find.mockResolvedValue(adminList);
    mockPaginationService.returnPaginatedData.mockReturnValueOnce(mockedResult);

    adminRepository.find.mockResolvedValueOnce(adminList);

    const allAdmins = await adminService.findAll();

    expect(allAdmins).toEqual(mockedResult);
  });

  it('Should return the information of an admin', async () => {
    const email = 'teste123@gmail.com';
    const adminInfo = {
      name: 'teste1',
      email: email,
      isAllowed: false,
    };

    adminRepository.findOne.mockResolvedValueOnce(adminInfo);

    const foundAdmin = await adminService.findOne(email);

    expect(foundAdmin).toEqual(adminInfo);
  });

  it('Should throw an error on signup if the email is already registered', async () => {
    const existingAdminAccount = {
      name: 'teste1',
      email: 'teste123@gmail.com',
    };

    adminRepository.findOne.mockResolvedValueOnce(existingAdminAccount);

    await expect(
      adminService.signup({
        name: 'teste2',
        email: 'teste123@gmail.com',
        password: 'password',
      }),
    ).rejects.toThrow('Usuário Já existe');
  });

  it('Should throw an error if the admin is not found', async () => {
    const email = 'teste123@gmail.com';

    adminRepository.findOne.mockResolvedValueOnce(null);

    await expect(adminService.findOne(email)).rejects.toThrow(
      'Usuário não cadastrado no sistema',
    );
  });
});

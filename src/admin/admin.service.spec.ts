import { Test } from '@nestjs/testing';
import { HashingService } from 'src/common/hashing/hashing.service';
import { AdminService } from './admin.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Admin } from './entity/admin.entity';

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
      ],
    }).compile();

    adminService = testingModule.get(AdminService),
    hashingService = testingModule.get(HashingService),
    adminRepository = testingModule.get(getRepositoryToken(Admin))
  });
  

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should be Defined', () => {
    expect(adminService).toBeDefined();
  });
});

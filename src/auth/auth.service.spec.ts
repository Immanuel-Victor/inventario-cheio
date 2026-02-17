import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { AdminService } from 'src/admin/admin.service';
import { HashingService } from 'src/common/hashing/hashing.service';
import { jest } from '@jest/globals';

class mockHashingService {
  hash = jest.fn();
  compare = jest.fn();
}

class mockAdminService {
  findOne = jest.fn();
}

describe('AuthService', () => {
  let authService: AuthService;
  let jwtService: jest.Mocked<JwtService>;
  let hashingService: mockHashingService;
  let adminService: mockAdminService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn(),
          },
        },
        {
          provide: HashingService,
          useClass: mockHashingService,
        },
        {
          provide: AdminService,
          useClass: mockAdminService,
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    jwtService = module.get(JwtService);
    hashingService = module.get<mockHashingService>(HashingService);
    adminService = module.get<mockAdminService>(AdminService);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should be defined', () => {
    expect(authService).toBeDefined();
  });
});
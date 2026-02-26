import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { AdminService } from 'src/admin/admin.service';
import { HashingService } from 'src/common/hashing/hashing.service';
import { jest } from '@jest/globals';
import { Admin } from 'src/admin/entity/admin.entity';
import { UnauthorizedException } from '@nestjs/common';

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

  it('Should return a valid JwtToken when user is authenticated', async () => {
    const admin: Admin = {
      name: 'name 1',
      email: 'teste123@gmail.com',
      password: 'password',
      isAllowed: true,
    } as Admin;

    adminService.findOne.mockResolvedValue(admin);
    hashingService.compare.mockResolvedValue(true);
    jwtService.signAsync.mockResolvedValue('token');

    const result = await authService.signIn({
      email: 'teste123@gmail.com',
      password: 'password',
    });

    expect(result).toEqual({ accessToken: 'token' });
  });

  it('Should throw an UnauthorizedException if passwords do not match', async () => {
    const mismatchedPassword = 'passoword';
    const admin: Admin = {
      name: 'name 1',
      email: 'teste123@gmail.com',
      password: 'hashedPassword',
      isAllowed: true,
    } as Admin;

    adminService.findOne.mockResolvedValue(admin);
    hashingService.compare.mockResolvedValue(false);

    await expect(
      authService.signIn({ email: admin.email, password: mismatchedPassword }),
    ).rejects.toThrow(UnauthorizedException);
  });
});

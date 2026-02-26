import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from './entity/admin.entity';
import { SignupDto } from './dto/signup.dto';
import { HashingService } from 'src/common/hashing/hashing.service';
import { PaginationService } from 'src/common/pagination/pagination.service';
import { PaginatedDataDto } from 'src/common/pagination/dto/paginated-data.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
    private readonly paginationService: PaginationService,
    private readonly hashingService: HashingService,
  ) {}

  async signup(signUpDto: SignupDto) {
    const existingUser = await this.findByEmail(signUpDto.email);

    if (existingUser) {
      throw new BadRequestException('Usuário Já existe');
    }

    const hashedPassword = await this.hashingService.hash(signUpDto.password);

    const savedUser = await this.adminRepository.save({
      email: signUpDto.email,
      password: hashedPassword,
      name: signUpDto.name,
    });

    return {
      name: savedUser.name,
      email: savedUser.email,
    };
  }

  private async findByEmail(email: string) {
    return this.adminRepository.findOne({
      where: { email: email },
    });
  }

  async findOne(email: string) {
    const admin = await this.findByEmail(email);

    if (!admin) {
      throw new NotFoundException('Usuário não cadastrado no sistema');
    }

    return admin;
  }

  async findAll(paginationDto?: PaginatedDataDto<Admin>) {
    const { limit = 10, offset = 0 } = paginationDto || {};
    const admins = await this.adminRepository.find({
      select: ['name', 'email'],
      skip: offset,
      take: limit,
    });

    const paginatedData = this.paginationService.returnPaginatedData<Admin>(
      admins,
      paginationDto,
    );

    return paginatedData;
  }
}

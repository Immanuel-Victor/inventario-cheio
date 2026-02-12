import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from './entity/admin.entity';
import { SignupDto } from './dto/signup.dto';
import { HashingService } from 'src/common/hashing/hashing.service';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
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

    return savedUser;
  }

  async findByEmail(email: string) {
    return this.adminRepository.findOne({
      where: { email: email },
    });
  }

  async findOne(email: string) {
    const admin = await this.findByEmail(email);

    if (!admin) {
      throw new NotFoundException('Usuário não cadastrado no sistema');
    }

    if (!admin.isAllowed) {
      throw new ForbiddenException('Usuário não permitido no sistema');
    }

    return admin;
  }
}

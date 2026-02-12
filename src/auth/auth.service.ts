import { ForbiddenException, Injectable } from '@nestjs/common';
import { SignInDto } from './dto/signin.dto';
import { AdminService } from 'src/admin/admin.service';
import { JwtService } from '@nestjs/jwt';
import { HashingService } from 'src/common/hashing/hashing.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly adminService: AdminService,
    private readonly jwtService: JwtService,
    private readonly hashignService: HashingService,
  ) {}

  async signIn(signInDto: SignInDto): Promise<{
    accessToken: string;
  }> {
    const admin = await this.adminService.findOne(signInDto.email);

    const match = await this.hashignService.compare(
      signInDto.password,
      admin.password,
    );

    if (!match) {
      throw new ForbiddenException();
    }

    const token = await this.jwtService.signAsync({
      email: admin.email,
      name: admin.name,
    });

    return {
      accessToken: token,
    };
  }
}

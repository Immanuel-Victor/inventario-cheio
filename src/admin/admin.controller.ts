import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AdminService } from './admin.service';
import { SignupDto } from './dto/signup.dto';
import { Public } from 'src/common/decorators/is-public.decorator';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Public()
  @Post('/signup')
  async signup(@Body() signupDto: SignupDto) {
    return this.adminService.signup(signupDto);
  }

  @Get()
  async getAllAdmins() {
    return this.adminService.findAll();
  }

  @Get(':email')
  async getAdminInfo(@Param('email') email: string) {
    return this.adminService.findOne(email);
  }
}

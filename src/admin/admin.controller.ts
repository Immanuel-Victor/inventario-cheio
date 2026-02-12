import { Body, Controller, Post } from '@nestjs/common';
import { AdminService } from './admin.service';
import { SignupDto } from './dto/signup.dto';
import { Public } from 'src/common/decorators/is-public.decorator';

@Controller()
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Public()
  @Post('/signup')
  async signup(@Body() signupDto: SignupDto) {
    return await this.adminService.signup(signupDto);
  }
}

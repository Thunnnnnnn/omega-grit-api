import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from './dto/authLogin.dto';
import { AuthService } from './auth.service';
import { Public } from '../common/decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @Public()
  async login(@Body() user: LoginDto) {
    const res = await this.authService.login(user);

    return res;
  }
}

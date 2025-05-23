import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() body: AuthDto) {
    return this.authService.register(String(body.login), String(body.password));
  }

  @Post('login')
  login(@Body() body: AuthDto) {
    return this.authService.login(String(body.login), String(body.password));
  }
}

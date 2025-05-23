import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './authorization.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() body: { login: string; password: string }) {
    return this.authService.register(String(body.login), String(body.password));
  }

  @Post('login')
  login(@Body() body: { login: string; password: string }) {
    return this.authService.login(String(body.login), String(body.password));
  }
}

import { Injectable, UnauthorizedException } from '@nestjs/common';

import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(login: string, password: string) {
    const hash = await bcrypt.hash(password, 10);
    const user = await this.usersService.create(login, hash);
    const payload = { sub: user.id, login: user.login, role: user.role };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async login(login: string, password: string) {
    const user = await this.usersService.findByLogin(login);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Недействительные учетные данные');
    }

    const payload = {
      sub: user.id,
      login: user.login,
      role: user.role || 'guest',
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

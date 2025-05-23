import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepo: Repository<User>,
  ) {}

  async create(login: string, password: string) {
    const user = this.usersRepo.create({ login, password, role: 'user' });
    return this.usersRepo.save(user);
  }

  findByLogin(login: string) {
    return this.usersRepo.findOne({ where: { login } });
  }
}

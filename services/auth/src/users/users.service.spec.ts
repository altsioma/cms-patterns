import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

describe('UsersService', () => {
  let service: UsersService;
  let repo: jest.Mocked<Repository<User>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            findOneBy: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repo = module.get(getRepositoryToken(User));
  });

  describe('create', () => {
    it('должен создать и сохранить пользователя', async () => {
      const mockUser = {
        id: '1',
        login: 'test',
        password: 'hashed',
        role: 'user',
      } as User;

      repo.create.mockReturnValue(mockUser);
      repo.save.mockResolvedValue(mockUser);

      const result = await service.create('test', 'hashed');

      expect(result).toEqual(mockUser);
    });
  });

  describe('findByLogin', () => {
    it('должен вернуть пользователя по логину', async () => {
      const user = {
        id: '1',
        login: 'admin',
        password: 'pass',
        role: 'user',
      } as User;

      repo.findOneBy.mockResolvedValue(user);

      const result = await service.findByLogin('admin');

      expect(result).toEqual(user);
    });

    it('должен вернуть null, если пользователь не найден', async () => {
      repo.findOneBy.mockResolvedValue(null);

      const result = await service.findByLogin('unknown');

      expect(result).toBeNull();
    });
  });
});

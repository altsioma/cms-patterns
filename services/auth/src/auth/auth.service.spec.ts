import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let authService: AuthService;

  const mockUsersService = {
    create: jest.fn(),
    findByLogin: jest.fn(),
  };

  const mockJwtService = {
    sign: jest.fn().mockReturnValue('mock-jwt-token'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: mockUsersService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  afterEach(() => jest.clearAllMocks());

  it('Должен быть получен JWT при успешной регистрации', async () => {
    mockUsersService.create.mockResolvedValue({
      id: '1',
      login: 'newuser',
      password: 'hashed',
      role: 'user',
    });

    const result = await authService.register('newuser', 'password');

    expect(mockUsersService.create).toHaveBeenCalled();
    expect(result).toEqual({ access_token: 'mock-jwt-token' });
  });

  it('Должен быть получен JWT при успешной авторизации', async () => {
    mockUsersService.findByLogin.mockResolvedValue({
      id: '1',
      login: 'existing',
      password: await bcrypt.hash('password', 10),
      role: 'user',
    });

    const result = await authService.login('existing', 'password');

    expect(mockUsersService.findByLogin).toHaveBeenCalledWith('existing');
    expect(result).toEqual({ access_token: 'mock-jwt-token' });
  });

  it('Должна быть ошибка при неверном логине', async () => {
    mockUsersService.findByLogin.mockResolvedValue(null);

    await expect(authService.login('wrong', 'pass')).rejects.toThrow(
      'Недействительные учетные данные',
    );
  });

  it('Должна быть ошибка при неверном пароле', async () => {
    mockUsersService.findByLogin.mockResolvedValue({
      id: '1',
      login: 'existing',
      password: await bcrypt.hash('password', 10),
      role: 'user',
    });

    await expect(authService.login('existing', 'wrong')).rejects.toThrow();
  });
});

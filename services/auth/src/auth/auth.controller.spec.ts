import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { AuthDto } from './auth.dto';

describe('AuthController', () => {
  let controller: AuthController;
  const mockAuthService = {
    register: jest.fn(),
    login: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
        {
          provide: APP_PIPE,
          useValue: new ValidationPipe({ whitelist: true, transform: true }),
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  describe('validation', () => {
    it('должен не пройти валидацию при коротком пароле', async () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
      const dto = plainToInstance(AuthDto, { login: 'test', password: '123' });

      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].constraints).toHaveProperty('minLength');
    });

    it('валидный dto должен проходить валидацию', async () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
      const dto = plainToInstance(AuthDto, {
        login: 'test',
        password: 'validpass',
      });
      const errors = await validate(dto);
      expect(errors.length).toBe(0);
    });
  });

  describe('register', () => {
    it('должен вернуть access_token при успешной регистрации', async () => {
      const body = { login: 'testuser', password: 'testpass' };
      mockAuthService.register.mockResolvedValue({
        access_token: 'mock-token',
      });

      const result = await controller.register(body);

      expect(mockAuthService.register).toHaveBeenCalledWith(
        'testuser',
        'testpass',
      );
      expect(result).toEqual({ access_token: 'mock-token' });
    });
  });

  describe('login', () => {
    it('должен вернуть access_token при успешном входе', async () => {
      const body = { login: 'user1', password: 'secret' };
      mockAuthService.login.mockResolvedValue({ access_token: 'jwt-token' });

      const result = await controller.login(body);

      expect(mockAuthService.login).toHaveBeenCalledWith('user1', 'secret');
      expect(result).toEqual({ access_token: 'jwt-token' });
    });

    it('должен пробросить исключение при ошибке сервиса', async () => {
      const body = { login: 'baduser', password: 'wrongpass' };
      mockAuthService.login.mockRejectedValue(new Error('Unauthorized'));

      await expect(controller.login(body)).rejects.toThrow('Unauthorized');
    });
  });
});

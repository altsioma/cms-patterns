import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  const mockAuthService = {
    register: jest.fn().mockResolvedValue({ access_token: 'token123' }),
    login: jest.fn().mockResolvedValue({ access_token: 'token123' }),
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, transform: true }),
    );
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST /auth/register', () => {
    it('успешная регистрация возвращает токен', async () => {
      return request(app.getHttpServer())
        .post('/auth/register')
        .send({ login: 'user1', password: 'securePass' })
        .expect(201)
        .expect({ access_token: 'token123' });
    });

    it('ошибка валидации при коротком пароле', async () => {
      return request(app.getHttpServer())
        .post('/auth/register')
        .send({ login: 'user1', password: '123' })
        .expect(400)
        .expect((res) => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          expect(res.body.message[0]).toContain('password');
        });
    });
  });

  describe('POST /auth/login', () => {
    it('успешный логин возвращает токен', async () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({ login: 'user1', password: 'securePass' })
        .expect(201)
        .expect({ access_token: 'token123' });
    });

    it('ошибка валидации при пустом логине', async () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({ login: '', password: 'securePass' })
        .expect(400);
    });
  });
});

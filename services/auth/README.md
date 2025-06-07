# Auth Service

## Обзор

Сервис аутентификации (Auth Service) - это микросервис, отвечающий за управление пользователями, аутентификацию и авторизацию в CMS системе. Сервис предоставляет API для регистрации, входа, управления пользователями и проверки прав доступа.

## Технологии

- NestJS
- TypeScript
- PostgreSQL
- TypeORM
- JWT
- Passport
- Docker
- Jest (тестирование)

## Структура Проекта

```
src/
├── auth/              # Основной модуль аутентификации
│   ├── dto/          # Data Transfer Objects
│   ├── entities/     # Сущности базы данных
│   ├── guards/       # Guards для защиты маршрутов
│   ├── strategies/   # Passport стратегии
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   └── auth.module.ts
├── users/            # Модуль управления пользователями
│   ├── dto/
│   ├── entities/
│   ├── users.controller.ts
│   ├── users.service.ts
│   └── users.module.ts
├── common/           # Общие утилиты и интерфейсы
├── config/          # Конфигурация приложения
└── main.ts         # Точка входа
```

## API Endpoints

### Аутентификация

- `POST /auth/register` - Регистрация нового пользователя
- `POST /auth/login` - Вход в систему

### User

```typescript
interface User {
  id: string;
  login: string;
  password: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}
```

## Установка и Запуск

### Требования

- Node.js
- PostgreSQL
- Docker

### Установка

```bash
npm install
```

### Разработка

```bash
npm run start:dev
```

### Сборка

```bash
npm run build
```

## Тестирование

- Unit тесты: `npm run test`
- E2E тесты: `npm run test:e2e`
- Покрытие кода: `npm run test:cov`

## Безопасность

- JWT аутентификация
- Refresh токены
- Валидация входных данных через class-validator
- Хеширование паролей с bcrypt

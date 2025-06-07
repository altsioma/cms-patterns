# Pages Service

## Обзор

Сервис управления страницами (Pages Service) - это микросервис, отвечающий за управление контентом страниц в CMS системе. Сервис предоставляет API для создания, чтения, обновления и удаления страниц, а также их конфигурации.

## Технологии

- NestJS
- TypeScript
- PostgreSQL
- TypeORM
- Docker
- Jest (тестирование)

## Структура Проекта

```
src/
├── pages/                  # Основной модуль страниц
│   ├── dto/                # Data Transfer Objects
│   ├── page.entity.ts/     # Сущности базы данных
│   ├── page.controller.ts  # Контроллер входящих запросов
│   ├── page.service.ts     # Сервис для работы с данными
│   └── page.module.ts      # Модуль Page
└── main.ts                 # Точка входа
```

## API Endpoints

### Страницы

- `GET /pages` - Получить список всех страниц
- `GET /pages/:slug` - Получить страницу по slug
- `POST /pages` - Создать новую страницу
- `PUT /pages/:id` - Обновить существующую страницу
- `DELETE /pages/:id` - Удалить страницу

## Модели Данных

### Page

```typescript
interface Page {
  id: string;
  slug: string;
  components: string[];
  params: Record<string, object>;
  createdAt: Date;
  updatedAt: Date;
}
```

## Установка и Запуск

### Требования

- Node.js (v14 или выше)
- MongoDB
- Docker (опционально)

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

## Документация API

Swagger документация доступна по адресу: `/api/v1/pages/api-docs`

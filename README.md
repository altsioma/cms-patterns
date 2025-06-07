# CMS Project

## Обзор

CMS построена с использованием микросервисной архитектуры.

Проект состоит из фронтенд-приложения и набора микросервисов, обеспечивающих различные функции системы.

## Структура Проекта

```
.
├── frontend/          # Фронтенд приложение
├── services/          # Микросервисы
│   ├── auth/          # Сервис аутентификации
│   └── pages/         # Сервис управления страницами CMS
├── .docker/           # Docker конфигурации
└── Makefile           # Скрипты сборки и развертывания
```

## Технологический Стек

### Фронтенд

- TypeScript
- Vite
- Inversify (DI)
- Nginx
- Docker

### Бэкенд

- NestJS (TypeScript)
- TypeORM
- PostgreSQL
- Docker
- Nginx

## Начало Работы

### Требования

- Node.js (v14 или выше)
- Docker и Docker Compose
- Make

### Установка

1. Клонируйте репозиторий:

```bash
git clone git@github.com:altsioma/cms-patterns.git
cd cms
```

2. Установите сертификаты:

```bash
make install-certificates
```

3. Запустите проект в режиме разработки:

```bash
make dev-up
```

### Сборка для Продакшена

```bash
make dev-prod
```

## Архитектура

### Фронтенд

Фронтенд построен на основе модульной архитектуры с использованием паттернов:

- Dependency Injection
- Factory
- Chain of responsibility
- Middleware
- Plugin
- Command
- Builder

Подробное описание фронтенд архитектуры можно найти в [frontend/README.md](frontend/README.md).

### Бэкенд

Бэкенд реализован как набор микросервисов на базе NestJS:

1. **Auth Service**

   - Управление пользователями
   - Аутентификация и авторизация
   - JWT токены
   - Guards и Decorators для защиты маршрутов

2. **Page Service**
   - Управление контентом
   - CRUD операции через TypeORM
   - Swagger документация API

## История Изменений

### Версия 1.0.0

- Начальная версия проекта
- Реализована базовая архитектура фронтенда
- Настроена микросервисная архитектура бэкенда
- Добавлены основные сервисы:
  - Auth Service (NestJS)
  - Page Service (NestJS)
- Реализованы базовые плагины для фронтенда:
  - Header
  - Footer
  - ErrorSection
  - FallbackComponent
- Настроена система плагинов
- Добавлена поддержка Docker
- Настроен CI/CD пайплайн

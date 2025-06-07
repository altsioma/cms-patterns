# Фронтенд Приложение CMS

## Обзор

Приложение следует модульной архитектуре и разработано с учетом масштабируемости и поддерживаемости, расширение функциональности происходит за счет плагинов.

## Структура Проекта

```
frontend/
├── src/                   # Исходный код
│   ├── app/               # Главный модуль приложения
│   ├── bootstrap/         # Код инициализации приложения
│   ├── core/              # Базовые интерфейсы и DI
│   ├── render/            # Реализация HTML-рендеринга
│   ├── middleware/        # Middleware для обработки запросов/ответов
│   ├── mocks/             # Моки для тестов
│   ├── plugins/           # Плагины-компоненты
│   ├── services/          # Сервисы бизнес-логики
│   └── shared/            # Общие компоненты и утилиты
├── public/                # Статические публичные ресурсы
├── nginx/                 # Конфигурация Nginx для продакшена
└── dist/                  # Директория сборки
```

## Технологический Стек

- **TypeScript**: Основной язык разработки
- **Nginx**: Для раздачи продакшен-сборки и статики
- **Docker**: Для контейнеризации

## Начало Работы

### Требования

- Node.js (v14 или выше)
- npm или yarn

### Установка

1. Установка зависимостей:

```bash
npm install
# или
yarn install
```

2. Запуск сервера разработки:

```bash
npm run dev
# или
yarn dev
```

## Принципы работы

1. Инициализация:

```ts
bootstrap(document.getElementById("root"));
```

2. Поток данных

```
Запрос URL → SlugService → PageService →
→ Загрузка данных → Обработка →
→ Создание компонентов → Рендеринг
```

3. Обработка ошибок:

- Автоматический fallback на заглушку при ошибках загрузки
- Единая точка обработки ошибок запросов

### Система плагинов

#### Структура плагина

Плагины представляют собой UI-компоненты, расположенные в папке plugins. Каждый плагин должен:

1. Экспортировать класс компонента, реализующий IUIComponent
2. Иметь метод render, возвращающий HTMLElement
3. (Опционально) Может включать адаптер для преобразования props

#### Пример плагина:

```ts
// plugins/Header/Header.component.ts
export class Header implements IUIComponent {
  render(props: any): HTMLElement {
    const header = document.createElement("header");
    // ... реализация рендеринга
    return header;
  }
}
```

#### Автоматическая загрузка

Плагины загружаются автоматически при старте приложения через:

```ts
const modules = import.meta.glob("../plugins/**/*.component.ts");
```

Особенности:

- Поддержка глубокой вложенности в папке plugins
- Имя файла должно содержать .component.ts
- Класс компонента регистрируется в DI-контейнере под своим именем

#### Конфигурация плагинов

Плагины получают параметры из конфига страницы:

```ts
// Конфиг страницы
{
  components: ["Header", "Section", "Footer", ""],
  params: {
    headerTitle: "Awesome CMS",
    copyrightText: "© 2025 My Awesome App",
    links: [
      { text: "Privacy Policy", url: "#privacy" },
      { text: "Terms of Service", url: "#terms" },
    ],
    title: "Welcome to Our App",
    content:
      "This is a demo application showcasing UI components with Design Patterns (IoC, Adapters, Commands, etc)",
    buttonText: "Get Started",
  },
}
```

#### Общие принципы разработки плагинов

1. Структура компонента:

   - Обязательная реализация IUIComponent
   - Метод render() возвращает HTMLElement
   - Опциональный адаптер параметров

2. Стилизация:

   - Рекомендуется использовать инлайн-стили для изоляции

3. Типизация:

   - Отдельный файл types.ts для интерфейсов
   - Строгая типизация пропсов

4. Именование:

   - Файлы компонентов: [Name].component.ts
   - Имена классов в PascalCase

5. Регистрация:
   - Автоматическая при соблюдении структуры
   - Имя компонента = имя класса

#### Шаблон нового плагина

```ts
import type { IUIComponent } from "../../core/interfaces/IUIComponent";
import type { MyComponentProps } from "./types";

export class MyComponent implements IUIComponent {
  adapter<MyComponentProps>(params: Record<string, unknown>) {
    return {
      // преобразование параметров
    } as MyComponentProps;
  }

  render(props: MyComponentProps): HTMLElement {
    const element = document.createElement("div");
    // логика рендеринга
    return element;
  }
}
```

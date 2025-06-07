import { inject, injectable } from "inversify";
import { APP_PARAMS } from "../../config";
import type { IPageService } from "./IPageService";
import type { PageConfig } from "../../shared/types";

import type { IMiddlewareExecutor } from "../../core/interfaces/IMiddleware";
import type { HttpRequestContext } from "../../middleware/http/HttpRequestContext";

/**
 * Сервис для загрузки данных страницы
 * @class
 * @injectable
 * @implements {IPageService}
 */
@injectable()
export class PageService implements IPageService {
  /**
   * @constructor
   * @param {IRequestMiddleware} requestMiddleware - Middleware для обработки запросов
   */
  constructor(
    @inject("HttpMiddlewareExecutor")
    private readonly middleware: IMiddlewareExecutor<HttpRequestContext>
  ) {}

  /**
   * Загружает конфигурацию страницы по slug
   * @async
   * @param {string} slug - Идентификатор страницы
   * @returns {Promise<PageConfig>} Конфигурация страницы или fallback-страница при ошибке
   */
  async load(slug: string): Promise<PageConfig> {
    const ctx: HttpRequestContext = {
      request: () => fetch(`${APP_PARAMS.API_URL}/pages/${slug}`),
    };

    await this.middleware.execute<PageConfig>(
      ctx,
      () => this.fallbackPage(slug) // выполняется в случае ошибки выполнения middleware
    );

    // если данные корректные возвращаем их и приводим к PageConfig
    if (ctx.data && typeof ctx.data === "object") {
      return ctx.data as PageConfig;
    }

    // если данные получены успешно, но они не валидные
    return this.fallbackPage(slug);
  }

  /**
   * Возвращает fallback-страницу при ошибке загрузки
   * @param {string} requestedSlug - Запрошенный slug
   * @returns {PageConfig} Конфигурация fallback-страницы
   */
  fallbackPage(requestedSlug: string): PageConfig {
    return {
      components: ["Header", "ErrorSection", "Footer"],
      params: {
        headerTitle: "Страница не найдена",
        errorCode: 404,
        errorMessage: `Страница "${requestedSlug}" не существует`,
        buttonText: "На главную",
        buttonUrl: "/",
        copyrightText: "© 2025 My Awesome App",
        links: [
          { text: "Home", url: "/" },
          { text: "Contact Support", url: "#support" },
        ],
      },
    };
  }
}

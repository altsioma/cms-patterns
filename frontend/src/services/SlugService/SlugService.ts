import { injectable } from "inversify";
import type { ISlugService } from "./ISlugService";

/**
 * Сервис для работы с URL-адресами (slug)
 * @class
 * @injectable
 * @implements {ISlugService}
 */
@injectable()
export class SlugService implements ISlugService {
  /**
   * Извлекает slug из текущего URL
   * @returns {string} Текущий slug или 'home', если slug пустой
   */
  getSlug(): string {
    const path = window.location.pathname;
    const slug = path.replace(/^\/|\/$/g, "");
    return slug || "home";
  }
}

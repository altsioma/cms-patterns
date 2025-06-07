import { injectable } from "inversify";
import { container } from "../core/di/di";
import type { IUIComponent } from "../core/interfaces/IUIComponent";

/**
 * Фабрика для создания UI компонентов
 * @class
 * @injectable
 */
@injectable()
export class HTMLComponentFactory {
  /**
   * Создает экземпляр компонента по его имени
   * @param {string} name - Имя компонента
   * @returns {IUIComponent} Экземпляр компонента или компонент "FallbackComponent", если не найден
   */
  create(name: string): IUIComponent {
    if (container.isBound(name)) {
      return container.get<IUIComponent>(name) as IUIComponent;
    }

    return container.get<IUIComponent>("FallbackComponent") as IUIComponent;
  }
}

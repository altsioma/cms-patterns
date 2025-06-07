import { App } from "../app/App";

import { container, registerDependency } from "../core/di/di";
import { MacroCommand } from "../core/commands/MacroCommand";

import { HTMLComponentFactory } from "../render/HTMLComponentFactory";
import { HTMLCommandBuilder } from "../render/HTMLCommandBuilder";

import { PageService } from "../services/PageService/PageService";
import { SlugService } from "../services/SlugService/SlugService";

import type { IUIComponent } from "../core/interfaces/IUIComponent";
import { registerMiddleware } from "../middleware/registerMiddleware";

const modules = import.meta.glob("../plugins/**/*.component.ts");

/**
 * Инициализирует приложение и регистрирует зависимости
 * @async
 * @param {HTMLElement} rootElement - Корневой DOM-элемент для рендеринга
 * @returns {Promise<void>}
 */
export async function bootstrap(rootElement: HTMLElement) {
  registerDependency(App);
  registerDependency(PageService);
  registerDependency(SlugService);
  registerDependency(HTMLComponentFactory);
  registerDependency(MacroCommand);

  container.bind("HTMLCommandBuilder").toDynamicValue(() => {
    return new HTMLCommandBuilder(rootElement);
  });

  /**
   * Автоматическая загрузка плагинов
   * TODO: рассмотреть ленивую загрузку
   */
  for (const path in modules) {
    try {
      const module = (await modules[path]()) as any;

      for (const key in module) {
        registerDependency<IUIComponent>(module[key]);
      }
    } catch (error) {
      console.warn(`⚠️ Не удалось загрузить модуль ${path}:`, error);
    }
  }

  registerMiddleware();
}

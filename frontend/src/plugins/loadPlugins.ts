import { registerDependencyFactory } from "../core/di/di";
import type { ICommand } from "../core/interfaces/ICommand";

/**
 * Автоматическая загрузка плагинов
 * TODO: рассмотреть ленивую загрузку
 */
export async function loadPlugins() {
  const modules = import.meta.glob("../plugins/**/*.component.ts");

  for (const path in modules) {
    try {
      const module = (await modules[path]()) as any;

      for (const key in module) {
        registerDependencyFactory<ICommand>(module[key].name, module[key]);
      }
    } catch (error) {
      console.warn(`⚠️ Не удалось загрузить модуль ${path}:`, error);
    }
  }
}

import { container, registerDependency } from "../core/di/di";

import { registerMiddleware } from "../middleware/registerMiddleware";

import { PageService } from "../services/PageService/PageService";
import { SlugService } from "../services/SlugService/SlugService";

import { PageProcessCommand } from "../commands/PageProcessCommand";
import { MacroCommand } from "../commands/MacroCommand";

import { loadPlugins } from "../plugins/loadPlugins";

/**
 * Инициализирует приложение и регистрирует зависимости
 * @async
 * @returns {Promise<void>}
 */
export async function bootstrap() {
  registerDependency(PageService);
  registerDependency(SlugService);
  registerDependency(PageProcessCommand);

  registerMiddleware();

  await loadPlugins();

  // Глобальная макрокоманда
  container
    .bind<MacroCommand>("MacroCommand")
    .toConstantValue(new MacroCommand());
}

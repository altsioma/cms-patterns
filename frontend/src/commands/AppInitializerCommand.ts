import { bootstrap } from "../bootstrap/bootstrap";
import { container } from "../core/di/di";

import type { ICommand } from "../core/interfaces/ICommand";
import type { MacroCommand } from "./MacroCommand";

export class AppInitializerCommand implements ICommand {
  private macro: MacroCommand | undefined;

  async execute() {
    // Регистрация  зависимостей
    await bootstrap();

    // Получем глобальную макрокоманду
    this.macro = container.get<MacroCommand>("MacroCommand");

    // Получаем процессор страниц, который реализует рендеринг текущей страницы
    const processPageCmd = container.get<ICommand>("PageProcessCommand");

    // Добавляем процессор глобальную макрокоманду
    // в результате работы PageProcessCommand добавит в эту же макрокоманду команды необходимые для построения страницы
    this.macro.add(processPageCmd);

    // Выполняет все команды приложения последовательно
    this.macro.execute();
  }
}

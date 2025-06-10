import { injectable } from "inversify";
import type { ICommand } from "../core/interfaces/ICommand";
/**
 * Команда для выполнения последовательности других команд (паттерн "Композитная команда").
 * Реализует интерфейс ICommand.
 * @class
 * @implements {ICommand}
 */
@injectable()
export class MacroCommand implements ICommand {
  private readonly commands: ICommand[] = [];

  /**
   * Добавляет команду в очередь выполнения
   * @param {ICommand} cmd - Команда для добавления
   */
  add(cmd: ICommand) {
    this.commands.push(cmd);
  }

  /**
   * Выполняет все добавленные команды последовательно
   * @async
   * @returns {Promise<void>}
   */
  async execute() {
    for (const cmd of this.commands) {
      await cmd.execute();
    }
  }
}

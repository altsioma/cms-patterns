import type { ICommand } from "../interfaces/ICommand";
/**
 * Команда для выполнения последовательности других команд (паттерн "Композитная команда").
 * Реализует интерфейс ICommand.
 * @class
 * @implements {ICommand}
 */
export class MacroCommand implements ICommand {
  private commands: ICommand[] = [];

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

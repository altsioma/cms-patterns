import { HTMLRenderCommand } from "./HTMLRenderCommand";
import type { ICommand } from "../core/interfaces/ICommand";
import type { ICommandBuilder } from "../core/interfaces/ICommandBuilder";
import type { IUIComponent } from "../core/interfaces/IUIComponent";
import { injectable } from "inversify";

/**
 * Builder команд для рендеринга HTML компонентов
 * @class
 * @injectable
 * @implements {ICommandBuilder}
 */
@injectable()
export class HTMLCommandBuilder implements ICommandBuilder {
  /**
   * @constructor
   * @param {HTMLElement} ctx - Контекст (DOM-элемент) для рендеринга
   */
  constructor(private ctx: HTMLElement) {}

  /**
   * Создает команду для рендеринга компонента
   * @param {IUIComponent} component - Компонент для рендеринга
   * @param {Record<string, any>} params - Параметры компонента
   * @returns {ICommand} Команда для выполнения рендеринга
   */
  build(component: IUIComponent, params: Record<string, any>): ICommand {
    return new HTMLRenderCommand(this.ctx, component, params);
  }
}

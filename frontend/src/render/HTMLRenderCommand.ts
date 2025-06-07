import type { ICommand } from "../core/interfaces/ICommand";
import type { IUIComponent } from "../core/interfaces/IUIComponent";

/**
 * Команда для рендеринга HTML компонента
 * @class
 * @implements {ICommand}
 */
export class HTMLRenderCommand implements ICommand {
  /**
   * @constructor
   * @param {HTMLElement} _element - DOM-элемент для рендеринга
   * @param {IUIComponent} _component - Компонент для рендеринга
   * @param {Record<string, any>} [_params={}] - Параметры компонента
   */
  constructor(
    private _element: HTMLElement,
    private _component: IUIComponent,
    private _params: Record<string, any> = {}
  ) {}

  /**
   * Выполняет рендеринг компонента
   * @returns {void}
   */
  execute(): void {
    const props = this._component.adapter?.(this._params) ?? this._params;
    const el = this._component.render(props);
    this._element?.appendChild(el);
  }
}

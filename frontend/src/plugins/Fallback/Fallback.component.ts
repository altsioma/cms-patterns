import type { ICommand } from "../../core/interfaces/ICommand";

export class FallbackComponent implements ICommand {
  constructor(private readonly _ctx: HTMLElement) {}

  execute(): void {
    const el = document.createElement("div");
    el.style.cssText = "padding: 1rem; background: #ffe0e0; color: #900;";
    el.innerText = `⚠️ Ошибка: Компонент не найден`;
    this._ctx.appendChild(el);
  }
}

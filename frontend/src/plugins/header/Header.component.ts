import type { ICommand } from "../../core/interfaces/ICommand";
import type { HeaderProps } from "./types";

export class Header implements ICommand {
  constructor(
    private readonly _ctx: HTMLElement,
    private readonly _params: Record<string, unknown>
  ) {}

  private adapter<T>(params: Record<string, unknown>) {
    return {
      headerTitle: params["headerTitle"],
    } as T;
  }

  execute(): void {
    const props = this.adapter<HeaderProps>(this._params);

    const header = document.createElement("header");
    header.className = "header";
    header.style.cssText = `
      background: #1a1a1a;
      color: white;
      padding: 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    `;

    const logo = document.createElement("div");
    logo.className = "logo";
    logo.textContent = props.headerTitle;
    logo.style.cssText = `
      font-size: 1.5rem;
      font-weight: bold;
    `;

    const nav = document.createElement("nav");
    nav.className = "nav";
    nav.style.display = "flex";
    nav.style.gap = "1rem";

    header.append(logo, nav);
    this._ctx.appendChild(header);
  }
}

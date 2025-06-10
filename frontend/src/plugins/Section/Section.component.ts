import type { ICommand } from "../../core/interfaces/ICommand";
import type { SectionProps } from "./types";

export class Section implements ICommand {
  constructor(
    private readonly _ctx: HTMLElement,
    private readonly _params: Record<string, unknown>
  ) {}

  private adapter<T>(params: Record<string, unknown>) {
    return {
      title: params["title"],
      content: params["content"],
    } as T;
  }

  execute(): void {
    const props = this.adapter<SectionProps>(this._params);

    const section = document.createElement("section");
    section.style.cssText = `
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
      text-align: center;
      flex-grow: 1;
    `;

    const title = document.createElement("h2");
    title.textContent = props.title;
    title.style.cssText = `
      font-size: 2rem;
      margin-bottom: 1rem;
      color: #333;
    `;

    const content = document.createElement("p");
    content.textContent = props.content;
    content.style.cssText = `
      font-size: 1.1rem;
      line-height: 1.6;
      color: #666;
      margin-bottom: 2rem;
    `;

    section.append(title, content);
    this._ctx.appendChild(section);
  }
}

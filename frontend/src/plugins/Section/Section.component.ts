import type { IUIComponent } from "../../core/interfaces/IUIComponent";
import type { SectionProps } from "./types";

export class Section implements IUIComponent {
  adapter<SectionProps>(params: Record<string, unknown>) {
    return {
      title: params["title"],
      content: params["content"],
      buttonText: params["content"],
    } as SectionProps;
  }

  render(props: SectionProps): HTMLElement {
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

    return section;
  }
}

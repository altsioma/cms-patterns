import type { IUIComponent } from "../../core/interfaces/IUIComponent";
import type { ErrorSectionProps } from "./types";

export class ErrorSection implements IUIComponent {
  adapter<ErrorSectionProps>(params: Record<string, unknown>) {
    return {
      errorCode: (params.errorCode as number) || 500,
      title: params.title || "Ошибка",
      errorMessage: params.errorMessage || "Что-то пошло не так",
      buttonText: params.buttonText,
      buttonUrl: params.buttonUrl || "#",
    } as ErrorSectionProps;
  }

  render(props: ErrorSectionProps): HTMLElement {
    const section = document.createElement("section");
    section.className = "error-section";

    // Основные стили
    section.style.cssText = `
      padding: 3rem 0;
      margin: 0 auto;
      text-align: center;
      border-radius: 8px;
      background: #f8f9fa;
      color: #333;
      flex-grow: 1;
      width: 100%;
    `;

    // Код ошибки
    const errorCode = document.createElement("div");
    errorCode.className = "error-code";
    errorCode.textContent = props.errorCode.toString();
    errorCode.style.cssText = `
      font-size: 4rem;
      font-weight: 700;
      margin-bottom: 1rem;
      color: #f5222d;
      line-height: 1;
    `;

    // Заголовок
    const title = document.createElement("h2");
    title.className = "error-title";
    title.textContent = props.errorMessage;
    title.style.cssText = `
      font-size: 1.8rem;
      margin-bottom: 1rem;
      color: inherit;
    `;

    // Кнопка (если есть)
    let button: HTMLAnchorElement | string = "";
    if (props.buttonText && props.buttonUrl) {
      button = document.createElement("a");
      button.className = "error-button";
      button.textContent = props.buttonText;
      button.href = props.buttonUrl;
      button.style.cssText = `
        display: inline-block;
        padding: 0.75rem 1.5rem;
        background: 1a73e8;
        color: #1a73e8;
        text-decoration: none;
        border-radius: 4px;
        font-weight: 500;
        transition: background 0.2s;
        border: none;
        cursor: pointer;
      `;
    }

    section.append(errorCode, title, button);

    return section;
  }
}

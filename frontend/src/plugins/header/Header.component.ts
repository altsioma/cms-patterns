import type { IUIComponent } from "../../core/interfaces/IUIComponent";
import type { HeaderProps } from "./types";

class Header implements IUIComponent {
  adapter<HeaderProps>(params: Record<string, unknown>) {
    return {
      headerTitle: params["headerTitle"],
    } as HeaderProps;
  }

  render(props: HeaderProps): HTMLElement {
    // Контейнер шапки
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

    // Логотип в шапке
    const logo = document.createElement("div");
    logo.className = "logo";
    logo.textContent = props.headerTitle;
    logo.style.cssText = `
      font-size: 1.5rem;
      font-weight: bold;
    `;

    // Меню навигации в шапке
    const nav = document.createElement("nav");
    nav.className = "nav";
    nav.style.display = "flex";
    nav.style.gap = "1rem";

    header.append(logo, nav);

    return header;
  }
}

export { Header as HeaderPlugin };

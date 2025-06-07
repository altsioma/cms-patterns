import type { IUIComponent } from "../../core/interfaces/IUIComponent";

class FallbackComponent implements IUIComponent {
  render(): HTMLElement {
    const el = document.createElement("div");
    el.style.cssText = "padding: 1rem; background: #ffe0e0; color: #900;";
    el.innerText = `⚠️ Ошибка: Компонент не найден`;
    return el;
  }
}

export { FallbackComponent as FallbackComponentPlugin };

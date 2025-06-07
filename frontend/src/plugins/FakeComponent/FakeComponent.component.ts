import type { IUIComponent } from "../../core/interfaces/IUIComponent";

class FakeComponent implements IUIComponent {
  render(): HTMLElement {
    const el = document.createElement("div");
    el.textContent = "FakeComponent";
    return el;
  }
}

export { FakeComponent as FakeComponentPlugin };
import { describe, it, expect, beforeEach } from "vitest";
import { Header } from "./Header.component";

describe("Header", () => {
  let container: HTMLElement;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.innerHTML = "";
    document.body.appendChild(container);
  });

  it("Должен рендерить header с заголовком", () => {
    const props = {
      headerTitle: "Мой сайт",
    };

    const component = new Header(container, props);
    component.execute();

    const header = container.querySelector("header");
    const logo = header?.querySelector(".logo");

    expect(header).not.toBeNull();
    expect(logo).not.toBeNull();
    expect(logo?.textContent).toBe("Мой сайт");
  });

  it("Должен создавать nav элемент с классом nav", () => {
    const props = {
      headerTitle: "Заголовок",
    };

    const component = new Header(container, props);
    component.execute();

    const nav = container.querySelector("nav");

    expect(nav).not.toBeNull();
    expect(nav?.className).toBe("nav");
  });
});

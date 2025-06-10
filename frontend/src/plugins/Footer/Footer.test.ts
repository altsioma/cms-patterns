import { describe, it, expect, beforeEach } from "vitest";
import { Footer } from "./Footer.component";

describe("Footer", () => {
  let container: HTMLElement;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.innerHTML = "";
    document.body.appendChild(container);
  });

  it("Должен рендерить футер с текстом и ссылками", () => {
    const props = {
      copyrightText: "© 2025 Моя компания",
      links: [
        { url: "/privacy", text: "Политика конфиденциальности" },
        { url: "/terms", text: "Условия использования" },
      ],
    };

    const component = new Footer(container, props);
    component.execute();

    const footer = container.querySelector("footer")!;
    const text = footer.querySelector("p")!;
    const links = footer.querySelectorAll("a");

    expect(footer).not.toBeNull();
    expect(text.textContent).toBe("© 2025 Моя компания");
    expect(links.length).toBe(2);
    expect(links[0].href).toContain("/privacy");
    expect(links[0].textContent).toBe("Политика конфиденциальности");
  });

  it("Должен рендерить футер без ссылок, если массив ссылок пуст", () => {
    const props = {
      copyrightText: "© 2025 Моя компания",
      links: [],
    };

    const component = new Footer(container, props);
    component.execute();

    const footer = container.querySelector("footer")!;
    const links = footer.querySelectorAll("a");

    expect(footer).not.toBeNull();
    expect(links.length).toBe(0);
  });

  it("Не должен рендерить блок ccskjr, если links отсутствует", () => {
    const props = {
      copyrightText: "Все права защищены",
    };

    const component = new Footer(container, props);
    component.execute();

    const footer = container.querySelector("footer")!;
    const linksBlock = footer.querySelector("a");

    expect(footer).not.toBeNull();
    expect(linksBlock).toBeNull();
  });
});

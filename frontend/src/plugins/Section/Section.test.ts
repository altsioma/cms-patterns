import { describe, it, expect, beforeEach } from "vitest";
import { Section } from "./Section.component";

describe("Section", () => {
  let container: HTMLElement;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.innerHTML = "";
    document.body.appendChild(container);
  });

  it("рендерит секцию с заголовком и контентом", () => {
    const props = {
      title: "О нас",
      content: "Мы разрабатываем современные веб-приложения.",
      buttonText: "Подробнее",
    };

    const component = new Section(container, props);
    component.execute();

    const section = container.querySelector("section");
    const title = section?.querySelector("h2");
    const paragraph = section?.querySelector("p");

    expect(section).not.toBeNull();
    expect(title?.textContent).toBe("О нас");
    expect(paragraph?.textContent).toBe(
      "Мы разрабатываем современные веб-приложения."
    );
  });
});

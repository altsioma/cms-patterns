import { describe, it, expect } from "vitest";
import { Section } from "./Section.component";

describe("Section", () => {
  const component = new Section();

  describe("adapter", () => {
    it("должен корректно адаптировать параметры", () => {
      const input = {
        title: "О нас",
        content: "Контент секции",
      };
      const result = component.adapter(input);

      expect(result).toEqual({
        title: "О нас",
        content: "Контент секции",
        buttonText: "Контент секции", // как в оригинальном коде
      });
    });

    it("должен вернуть undefined, если параметры не переданы", () => {
      const result = component.adapter({});
      expect(result).toEqual({
        title: undefined,
        content: undefined,
        buttonText: undefined,
      });
    });
  });

  describe("render", () => {
    it("должен создавать секцию с заголовком и текстом", () => {
      const props = {
        title: "Заголовок секции",
        content: "Описание секции",
        buttonText: "Кнопка", // не используется, но присутствует в props
      };

      const el = component.render(props);

      expect(el.tagName).toBe("SECTION");

      const h2 = el.querySelector("h2");
      const p = el.querySelector("p");

      expect(h2).not.toBeNull();
      expect(h2?.textContent).toBe("Заголовок секции");

      expect(p).not.toBeNull();
      expect(p?.textContent).toBe("Описание секции");
    });
  });
});

import { describe, it, expect } from "vitest";
import { HeaderPlugin } from "./Header.component";

describe("HeaderPlugin", () => {
  const component = new HeaderPlugin();

  describe("adapter", () => {
    it("должен вернуть props типа HeaderProps", () => {
      const input = { headerTitle: "My App" };
      const props = component.adapter(input);

      expect(props).toEqual({ headerTitle: "My App" });
    });

    it("должен возвращать undefined, если параметра нет", () => {
      const props = component.adapter({});
      expect(props).toEqual({ headerTitle: undefined });
    });
  });

  describe("render", () => {
    it("должен возвращать корректный DOM элемент", () => {
      const props = { headerTitle: "Dashboard" };
      const element = component.render(props);

      expect(element.tagName).toBe("HEADER");
      expect(element.className).toBe("header");

      const logo = element.querySelector(".logo");
      expect(logo).not.toBeNull();
      expect(logo?.textContent).toBe("Dashboard");

      const nav = element.querySelector(".nav");
      expect(nav).not.toBeNull();
    });
  });
});

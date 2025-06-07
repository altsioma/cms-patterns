import { describe, it, expect } from "vitest";
import { FallbackComponentPlugin } from "./Fallback.component";

describe("FallbackComponentPlugin", () => {
  it("должен отрендерить предупреждение об отсутствии компонента", () => {
    const component = new FallbackComponentPlugin();
    const element = component.render();

    expect(element).toBeInstanceOf(HTMLElement);
    expect(element.tagName).toBe("DIV");
    expect(element.innerText).toContain("⚠️ Ошибка: Компонент не найден");
  });
});

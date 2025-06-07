import { describe, it, expect } from "vitest";
import { FakeComponentPlugin } from "./FakeComponent.component";

describe("FallbackComponentPlugin", () => {
  it("должен отрендерить предупреждение об отсутствии компонента", () => {
    const component = new FakeComponentPlugin();
    const element = component.render();

    expect(element).toBeInstanceOf(HTMLElement);
    expect(element.tagName).toBe("DIV");
    expect(element.textContent).toContain("FakeComponent");
  });
});

import { describe, it, expect, vi, beforeEach } from "vitest";
import { HTMLRenderCommand } from "./HTMLRenderCommand";
import type { IUIComponent } from "../core/interfaces/IUIComponent";

describe("HTMLRenderCommand", () => {
  let container: HTMLElement;

  beforeEach(() => {
    container = document.createElement("div");
  });

  it("Должен отрендерить компонент без адаптера", () => {
    const fakeElement = document.createElement("p");
    fakeElement.textContent = "Простой рендер";

    const mockComponent: IUIComponent = {
      render: vi.fn().mockReturnValue(fakeElement),
    };

    const command = new HTMLRenderCommand(container, mockComponent);
    command.execute();

    expect(mockComponent.render).toHaveBeenCalledWith({});
    expect(container.contains(fakeElement)).toBe(true);
  });

  it("Должен отрендерить компонент с параметрами", () => {
    const fakeElement = document.createElement("p");
    fakeElement.textContent = "С параметрами";

    const mockComponent: IUIComponent = {
      render: vi.fn().mockReturnValue(fakeElement),
    };

    const params = { text: "Hello", color: "red" };
    const command = new HTMLRenderCommand(container, mockComponent, params);
    command.execute();

    expect(mockComponent.render).toHaveBeenCalledWith(params);
    expect(container.contains(fakeElement)).toBe(true);
  });

  it("Должен использовать адаптер, если он задан", () => {
    const fakeElement = document.createElement("p");
    fakeElement.textContent = "С адаптером";

    const adapter = vi.fn().mockReturnValue({ transformed: true });

    const mockComponent: IUIComponent = {
      render: vi.fn().mockReturnValue(fakeElement),
      adapter,
    };

    const originalParams = { raw: true };
    const command = new HTMLRenderCommand(
      container,
      mockComponent,
      originalParams
    );
    command.execute();

    expect(adapter).toHaveBeenCalledWith(originalParams);
    expect(mockComponent.render).toHaveBeenCalledWith({ transformed: true });
    expect(container.contains(fakeElement)).toBe(true);
  });
});

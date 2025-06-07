import { describe, it, expect, vi, beforeEach } from "vitest";
import { HTMLComponentFactory } from "./HTMLComponentFactory";
import { container } from "../core/di/di";
import type { IUIComponent } from "../core/interfaces/IUIComponent";

// Моки компонентов
class TestComponent implements IUIComponent {
  render(): HTMLElement {
    const el = document.createElement("div");
    el.textContent = "Test";
    return el;
  }
}

class FallbackComponent implements IUIComponent {
  render(): HTMLElement {
    const el = document.createElement("div");
    el.textContent = "Fallback";
    return el;
  }
}

vi.mock("../core/di/di", () => {
  const bindings = new Map<string, any>();

  return {
    container: {
      isBound: (name: string) => bindings.has(name),
      get: (name: string) => {
        if (!bindings.has(name)) throw new Error(`Not bound: ${name}`);
        return bindings.get(name);
      },
      // Мок-функции для управления зависимостями в тестах
      __setMockBinding: (name: string, value: any) => {
        bindings.set(name, value);
      },
      __clearBindings: () => {
        bindings.clear();
      },
    },
  };
});

describe("HTMLComponentFactory", () => {
  const factory = new HTMLComponentFactory();

  beforeEach(() => {
    //@ts-ignore
    container.__clearBindings(); // очищаем моки перед каждым тестом
  });

  it("Должен вернуть компонент, если он зарегистрирован в контейнере", () => {
    const testComponent = new TestComponent();
    //@ts-ignore мокируем методы di-контейнера
    container.__setMockBinding("TestComponent", testComponent);

    const component = factory.create("TestComponent");

    expect(component).toBe(testComponent);
    expect(component.render().textContent).toBe("Test");
  });

  it("должен вернуть FallbackComponent, если компонент не найден", () => {
    const fallback = new FallbackComponent();
    //@ts-ignore мокируем методы di-контейнера
    container.__setMockBinding("FallbackComponent", fallback);

    const component = factory.create("UnknownComponent");

    expect(component).toBe(fallback);
    expect(component.render().textContent).toBe("Fallback");
  });

  it("должен ыфкинуть ошибку, если FallbackComponent не зарегистрирован", () => {
    expect(() => factory.create("UnknownComponent")).toThrow(
      "Not bound: FallbackComponent"
    );
  });
});

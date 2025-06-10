import { describe, it, expect, beforeEach } from "vitest";
import { FallbackComponent } from "./Fallback.component";

describe("FallbackComponent", () => {
  let container: HTMLElement;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.innerHTML = "";
    document.body.appendChild(container);
  });

  it("Должен добавлять предупреждающий div в контейнер", () => {
    const component = new FallbackComponent(container);

    component.execute();

    const fallback = container.querySelector("div");

    expect(fallback).not.toBeNull();
    expect(fallback?.innerText).toContain("⚠️ Ошибка: Компонент не найден");
  });

  it("Должен применять ожидаемые стили к div", () => {
    const component = new FallbackComponent(container);

    component.execute();

    const fallback = container.querySelector("div") as HTMLElement;

    expect(fallback.style.padding).toBe("1rem");
    expect(fallback.style.background).toBe("rgb(255, 224, 224)");
    expect(fallback.style.color).toBe("rgb(153, 0, 0)");
  });
});

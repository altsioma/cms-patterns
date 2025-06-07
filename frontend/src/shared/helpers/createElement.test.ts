import { describe, it, expect, beforeEach } from "vitest";
import { createRootElement } from "./createElement";

describe("createRootElement", () => {
  beforeEach(() => {
    // Сброс DOM перед каждым тестом
    document.body.innerHTML = "";
  });

  it("Должен возвращать существующий элемент по селектору", () => {
    const existingDiv = document.createElement("div");
    existingDiv.id = "app";
    document.body.appendChild(existingDiv);

    const result = createRootElement("#app");
    expect(result).toBe(existingDiv);
  });

  it("Выбрасывает ошибку, если элемент по селектору не найден", () => {
    expect(() => createRootElement("#not-found")).toThrowError(
      "Элемент с селектором '#not-found' не найден"
    );
  });

  it("Создает новый div с id=root, если передано undefined", () => {
    const result = createRootElement(undefined);
    expect(result).toBeInstanceOf(HTMLElement);
    expect(result.id).toBe("root");
    expect(document.body.contains(result)).toBe(true);
  });

  it("Создает новый div с id=root, если передана пустая строка", () => {
    const result = createRootElement("");
    expect(result).toBeInstanceOf(HTMLElement);
    expect(result.id).toBe("root");
    expect(document.body.contains(result)).toBe(true);
  });

  it("Создает только один #root при многократных вызовах без аргумента", () => {
    const first = createRootElement(undefined);
    const second = createRootElement(undefined);
    expect(first).toBe(second);
    expect(document.querySelectorAll("#root").length).toBe(1);
  });
});

import { describe, it, expect, beforeEach } from "vitest";
import { container, registerDependency } from "./di";

describe("DI Container", () => {
  beforeEach(() => {
    // Очищаем контейнер перед каждым тестом
    container.unbindAll();
  });

  describe("registerDependency", () => {
    class TestService {}

    it("Должен корректно регистрировать класс", () => {
      registerDependency(TestService);
      expect(container.isBound("TestService")).toBe(true);
      expect(container.get("TestService")).toBeInstanceOf(TestService);
    });

    it("Должен выбрасывать исключение для не классов/функций", () => {
      const testCases = [
        { value: 123, description: "number" },
        { value: "string", description: "string" },
        { value: {}, description: "object" },
        { value: null, description: "null" },
        { value: undefined, description: "undefined" },
      ];

      testCases.forEach(({ value }) => {
        expect(() => registerDependency(value)).toThrowError(
          "Компонент должен быть функцией или экземпляром класса"
        );
      });
    });

    it("Должен использовать имя класса/функции в качестве ключа", () => {
      class NamedService {}
      registerDependency(NamedService);
      expect(container.isBound("NamedService")).toBe(true);
    });

    it("Должен позволять регистрировать несколько классов", () => {
      class ServiceA {}
      class ServiceB {}

      registerDependency(ServiceA);
      registerDependency(ServiceB);

      expect(container.isBound("ServiceA")).toBe(true);
      expect(container.isBound("ServiceB")).toBe(true);
    });
  });
});

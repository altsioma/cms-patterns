import { describe, it, expect, beforeEach, vi } from "vitest";
import { container, registerDependency, registerDependencyFactory } from "./di";
import type {DependencyFactory } from "./types";

describe("DI container registration", () => {
  beforeEach(() => {
    container.unbindAll();
  });

  class TestService {
    public foo() {
      return "bar";
    }
  }

  it("registerDependency: должен зарегистрировать и создать экземпляр класса", () => {
    registerDependency<TestService>(TestService);

    const instance = container.get<TestService>("TestService");
    expect(instance).toBeInstanceOf(TestService);
    expect(instance.foo()).toBe("bar");
  });

  it("registerDependency: должен бросить ошибку если передан не класс/функция", () => {
    expect(() => registerDependency("not a function")).toThrow(
      "Компонент должен быть функцией или экземпляром класса"
    );
  });

  it("registerDependencyFactory: должен зарегистрировать фабрику, создающую новые экземпляры", () => {
    class AnotherService {
      constructor(public val: string) {}
    }

    registerDependencyFactory<AnotherService>("AnotherService", AnotherService);

    const factory =
      container.get<DependencyFactory<AnotherService>>("AnotherService");
    const instance1 = factory("one");
    const instance2 = factory("two");

    expect(instance1).toBeInstanceOf(AnotherService);
    expect(instance2).toBeInstanceOf(AnotherService);
    expect(instance1.val).toBe("one");
    expect(instance2.val).toBe("two");
    expect(instance1).not.toBe(instance2);
  });
});

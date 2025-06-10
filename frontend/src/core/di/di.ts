import { Container } from "inversify";
import type { DependencyConstructor, DependencyFactory } from "./types";

/**
 * Контейнер зависимостей (DI)
 * @namespace
 */
export const container = new Container();

/**
 * Регистрирует зависимость в DI-контейнере
 * @template T
 * @param {any} component - Компонент для регистрации (класс или функция)
 * @throws {Error} Если компонент не является функцией или классом
 */
export function registerDependency<T>(component: any) {
  if (typeof component !== "function") {
    throw new Error("Компонент должен быть функцией или экземпляром класса");
  }

  container.bind<T>(component.name).to(component);
}

export function registerDependencyFactory<T>(
  name: string,
  Dependency: DependencyConstructor<T>
) {
  // Регистрируем фабрику зависимостей
  container.bind<DependencyFactory<T>>(name).toFactory(() => {
    return (...args: unknown[]) => {
      return new Dependency(...args);
    };
  });
}

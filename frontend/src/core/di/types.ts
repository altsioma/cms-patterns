export type DependencyConstructor<T> = new (...args: unknown[]) => T;

export type DependencyFactory<T> = (...args: unknown[]) => T;

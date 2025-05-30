export type DependencyKey = string;
export type DependencyArgs = unknown[];
export type DependencyResolve<T = unknown> = (...args: DependencyArgs) => T;
export type DependencyResolverStrategy = (key: DependencyKey, ...args: DependencyArgs) => unknown
export type DependencyResolverStrategyUpdater = (current: DependencyResolverStrategy) => DependencyResolverStrategy;
export type DependencyScope = Map<DependencyKey, DependencyResolve>;

export interface IDependencyResolver {
    resolve(dependency: DependencyKey, args: DependencyArgs): DependencyResolverStrategy
}
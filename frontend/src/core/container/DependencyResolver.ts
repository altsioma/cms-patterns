import type {
    DependencyArgs,
    DependencyKey,
    DependencyResolverStrategy,
    DependencyScope,
    IDependencyResolver
} from "./types.ts";

export class DependencyResolver implements IDependencyResolver {
    private _dependencies: DependencyScope;

    constructor(scope: DependencyScope) {
        this._dependencies = scope as DependencyScope;
    }

    resolve(dependency: DependencyKey, args: DependencyArgs): DependencyResolverStrategy {
        let dependencies = this._dependencies;

        while (true) {
            const dependencyResolverStrategy = this._dependencies.get(dependency);

            if (dependencyResolverStrategy) {
                return dependencyResolverStrategy(args) as DependencyResolverStrategy;
            } else {
                dependencies = dependencies.get("IoC.Scope.Parent")?.(args) as DependencyScope;
            }
        }
    }
}
import {UpdateIocResolveDependencyStrategyCommand} from "./UpdateIocResolveDependencyStrategyCommand.ts";
import type {
    DependencyKey,
    DependencyArgs,
    DependencyResolverStrategy,
    DependencyResolverStrategyUpdater
} from "./types.ts";

export class IoC {
    static _strategy: DependencyResolverStrategy = (dependency: DependencyKey, ...args: DependencyArgs) => {
        if (dependency === "IoC.Strategy.Update") {
            return new UpdateIocResolveDependencyStrategyCommand(args[0] as DependencyResolverStrategyUpdater)
        } else {
            throw new Error(`No resolver registered for dependency: ${dependency}`);
        }
    }

    static resolve<T = unknown>(dependency: DependencyKey, ...args: DependencyArgs): T {
        return IoC._strategy(dependency, args) as T;
    }
}

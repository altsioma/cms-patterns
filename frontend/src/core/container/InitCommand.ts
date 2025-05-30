import type {ICommand} from "../../commands/ICommand.ts";
import {RegisterDependencyCommand} from "./RegisterDependencyCommand.ts";
import type {
    DependencyArgs,
    DependencyKey,
    DependencyScope,
    DependencyResolve
} from "./types.ts";

import {SetCurrentScopeCommand} from "./SetCurrentScopeCommand.ts";
import {ClearCurrentScopeCommand} from "./ClearCurrentScopeCommand.ts";
import {IoC} from "./Ioc.ts";
import {DependencyResolver} from "./DependencyResolver.ts";


export class InitCommand implements ICommand {
    private static _alreadyExecutedSuccessfully = false;
    private static _currentScope: DependencyScope | null = new Map();
    public static rootScope: DependencyScope = new Map();

    execute(): void {
        if (InitCommand._alreadyExecutedSuccessfully) {
            return;
        }

        InitCommand.rootScope.set(
            "IoC.Scope.Current.Set",
            (...args: unknown[]) => new SetCurrentScopeCommand(args[0]) as unknown as DependencyScope);

        InitCommand.rootScope.set(
            "IoC.Scope.Current.Clear",
            () => new ClearCurrentScopeCommand()
        );

        InitCommand.rootScope.set(
            "IoC.Scope.Current",
            (): DependencyScope => InitCommand._currentScope ?? InitCommand.rootScope
        );

        InitCommand.rootScope.set(
            "IoC.Scope.Parent",
            () => {
                throw new Error("The root scope has no parent scope");
            }
        );

        InitCommand.rootScope.set(
            "IoC.Scope.Create.Empty",
            () => new Map<DependencyKey, DependencyResolve>()
        );

        InitCommand.rootScope.set(
            "IoC.Scope.Create",
            (...args: DependencyArgs) => {
                const newScope = IoC.resolve<DependencyScope>("IoC.Scope.Create.Empty");
                const parentScope = args.length > 1 ? args[0] : IoC.resolve("IoC.Scope.Current");

                newScope.set("IoC.Scope.Parent", () => parentScope);

                return newScope;
            }
        );

        InitCommand.rootScope.set(
            "IoC.Register",
            (...args: DependencyArgs) =>
                new RegisterDependencyCommand(args[0] as DependencyKey, args[1] as DependencyResolve)
        );

        IoC.resolve<ICommand>("IoC.Strategy.Update", () => (dependency: DependencyKey, ...args: DependencyArgs) => {
            const scope = InitCommand._currentScope ?? InitCommand.rootScope;
            const dependencyResolver = new DependencyResolver(scope);
            return dependencyResolver.resolve(dependency, args);
        })

        InitCommand._alreadyExecutedSuccessfully = true;
    }

    public static set currentScope(scope: DependencyScope | null) {
        InitCommand._currentScope = scope;
    }
}
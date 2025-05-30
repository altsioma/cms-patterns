import type {ICommand} from "../../commands/ICommand.ts";
import {IoC} from "./Ioc.ts";
import type {DependencyKey, DependencyResolve, DependencyScope} from "./types.ts";

export class RegisterDependencyCommand implements ICommand {
    constructor(
        private readonly _key: DependencyKey,
        private readonly _resolver: DependencyResolve
    ) {
    }

    execute(): void {
        const currentScope = IoC.resolve<DependencyScope>("IoC.Scope.Current");
        currentScope.set(this._key, this._resolver);
    }
}
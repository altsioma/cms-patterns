import type {ICommand} from "../../commands/ICommand.ts";
import {InitCommand} from "./InitCommand.ts";
import type {DependencyScope} from "./types.ts";


export class SetCurrentScopeCommand implements ICommand {
    private _scope: unknown = null;

    constructor(scope: unknown) {
        this._scope = scope;
    }

    execute(): void {
        InitCommand.currentScope = this._scope as DependencyScope;
    }
}
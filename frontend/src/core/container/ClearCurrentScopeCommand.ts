import type {ICommand} from "../../commands/ICommand.ts";
import {InitCommand} from "./InitCommand.ts";

export class ClearCurrentScopeCommand implements ICommand {
    execute(): void {
        InitCommand.currentScope = null;
    }
}

import type { ICommand } from "../../commands/ICommand.ts";
import { IoC } from "./Ioc.ts";
import type { DependencyResolverStrategyUpdater } from "./types.ts";

export class UpdateIocResolveDependencyStrategyCommand implements ICommand {
    constructor(
        private readonly _strategyUpdater: DependencyResolverStrategyUpdater
    ) {}

    execute(): void {
        IoC._strategy = this._strategyUpdater(IoC._strategy);
    }
}

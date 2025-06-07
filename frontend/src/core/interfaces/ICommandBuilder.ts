import type { ICommand } from "./ICommand";
import type { IUIComponent } from "./IUIComponent";

export interface ICommandBuilder {
  build(component: IUIComponent, params: Record<string, any>): ICommand;
}

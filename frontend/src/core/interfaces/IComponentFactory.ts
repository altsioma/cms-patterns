import type { IUIComponent } from "./IUIComponent";

export interface IComponentFactory {
  create(name: string): IUIComponent;
}

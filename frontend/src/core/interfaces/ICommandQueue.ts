import type { ICommand } from "./ICommand";

export interface ICommandQueue {
  add(command: ICommand): void;
  execute(): Promise<void>;
}

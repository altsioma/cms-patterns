// MacroCommand.test.ts
import { describe, it, expect, vi } from "vitest";
import { MacroCommand } from "./MacroCommand";
import type { ICommand } from "../interfaces/ICommand";

describe("MacroCommand", () => {
  it("Должна выполняться последовательность команд", async () => {
    const mockCommand1 = {
      execute: vi.fn().mockResolvedValue(undefined),
    };
    const mockCommand2 = {
      execute: vi.fn().mockResolvedValue(undefined),
    };

    const macro = new MacroCommand();
    macro.add(mockCommand1 as unknown as ICommand);
    macro.add(mockCommand2 as unknown as ICommand);

    await macro.execute();

    expect(mockCommand1.execute).toHaveBeenCalled();
    expect(mockCommand2.execute).toHaveBeenCalled();
    expect(mockCommand2.execute.mock.invocationCallOrder[0]).toBeGreaterThan(
      mockCommand1.execute.mock.invocationCallOrder[0]
    );
  });

  it("Должна корректно обрабатываться пустая последовательность команд", async () => {
    const macro = new MacroCommand();
    await expect(macro.execute()).resolves.not.toThrow();
  });

  it("Должная соблюдаться последовательность команд", async () => {
    const calls: number[] = [];
    const command1 = {
      execute: vi.fn().mockImplementation(async () => {
        calls.push(1);
      }),
    };
    const command2 = {
      execute: vi.fn().mockImplementation(async () => {
        calls.push(2);
      }),
    };

    const macro = new MacroCommand();
    macro.add(command1 as unknown as ICommand);
    macro.add(command2 as unknown as ICommand);

    await macro.execute();

    expect(calls).toEqual([1, 2]);
  });
});

import { describe, it, expect, vi, beforeEach } from "vitest";
import { AppInitializerCommand } from "./AppInitializerCommand";
import { container } from "../core/di/di";
import * as bootstrapModule from "../bootstrap/bootstrap";

import type { ICommand } from "../core/interfaces/ICommand";
import type { MacroCommand } from "./MacroCommand";

describe("AppInitializerCommand", () => {
  let mockMacro: MacroCommand;
  let mockPageProcess: ICommand;

  beforeEach(() => {
    container.unbindAll();

    // Мокаем bootstrap
    vi.spyOn(bootstrapModule, "bootstrap").mockResolvedValue(undefined);

    mockMacro = {
      add: vi.fn(),
      execute: vi.fn(),
    } as unknown as MacroCommand;

    mockPageProcess = {
      execute: vi.fn(),
    };

    container.bind<MacroCommand>("MacroCommand").toConstantValue(mockMacro);
    container
      .bind<ICommand>("PageProcessCommand")
      .toConstantValue(mockPageProcess);
  });

  it("Должен выполнить bootstrap и добавить PageProcessCommand в MacroCommand", async () => {
    const command = new AppInitializerCommand();

    await command.execute();

    expect(bootstrapModule.bootstrap).toHaveBeenCalled();
    expect(mockMacro.add).toHaveBeenCalledWith(mockPageProcess);
    expect(mockMacro.execute).toHaveBeenCalled();
  });
});

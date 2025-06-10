import { describe, it, expect, vi, beforeEach } from "vitest";
import { PageProcessCommand } from "./PageProcessCommand";
import { container } from "../core/di/di";

import type { IPageService } from "../services/PageService/IPageService";
import type { ISlugService } from "../services/SlugService/ISlugService";
import type { MacroCommand } from "./MacroCommand";
import type { ICommand } from "../core/interfaces/ICommand";
import type { DependencyFactory } from "../core/di/types";

describe("PageProcessCommand", () => {
  let mockSlugService: ISlugService;
  let mockPageService: IPageService;
  let mockMacroCommand: MacroCommand;
  let command: PageProcessCommand;
  let root: HTMLElement;

  beforeEach(() => {
    // Очистка контейнера
    container.unbindAll();

    // Создание DOM-контекста
    root = document.createElement("div");
    root.id = "root";
    document.body.appendChild(root);

    // Моки
    mockSlugService = {
      getSlug: vi.fn().mockReturnValue("home"),
    };

    mockPageService = {
      load: vi.fn().mockResolvedValue({
        components: ["TestComponent1", "TestComponent2"],
        params: { some: "value" },
      }),
    };

    mockMacroCommand = {
      add: vi.fn(),
      execute: vi.fn(),
    } as unknown as MacroCommand;

    // Мокаем фабрики команд
    const fakeFactory: DependencyFactory<ICommand> = vi
      .fn()
      .mockImplementation((ctx, params) => {
        return {
          execute: vi.fn(),
        };
      });

    container
      .bind<DependencyFactory<ICommand>>("TestComponent1")
      .toConstantValue(fakeFactory);
    container
      .bind<DependencyFactory<ICommand>>("TestComponent2")
      .toConstantValue(fakeFactory);

    // Создание экземпляра команды
    command = new PageProcessCommand(
      mockSlugService,
      mockPageService,
      mockMacroCommand
    );
  });

  it("Должен загрузить страницу и добавить команды в MacroCommand", async () => {
    await command.execute();

    expect(mockPageService.load).toHaveBeenCalledWith("home");
    expect(mockMacroCommand.add).toHaveBeenCalledTimes(2);

    const addedCommands = (mockMacroCommand.add as any).mock.calls;
    expect(addedCommands[0][0]).toHaveProperty("execute");
    expect(addedCommands[1][0]).toHaveProperty("execute");
  });
});

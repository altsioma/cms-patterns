import { describe, it, expect, vi, beforeEach } from "vitest";
import { App } from "./App";
// Заглушки зависимостей
const slugService = { getSlug: vi.fn() };
const pageService = { load: vi.fn() };
const commandQueue = { add: vi.fn(), execute: vi.fn() };
const componentFactory = { create: vi.fn() };
const commandBuilder = { build: vi.fn() };

const mockComponent = { render: vi.fn() };
const mockCommand = { execute: vi.fn() };

describe("App", () => {
  let app: App;

  beforeEach(() => {
    vi.clearAllMocks();

    app = new App(
      slugService,
      pageService,
      commandQueue,
      componentFactory,
      commandBuilder
    );
  });

  it("Получает slug и загружает данные страницы", async () => {
    slugService.getSlug.mockReturnValue("test-page");
    pageService.load.mockResolvedValue({
      components: [],
      params: {},
    });

    await app.execute();

    expect(slugService.getSlug).toHaveBeenCalled();
    expect(pageService.load).toHaveBeenCalledWith("test-page");
  });

  it("Создает компоненты, команды и добавляет их в очередь", async () => {
    slugService.getSlug.mockReturnValue("test");
    pageService.load.mockResolvedValue({
      components: ["Header", "Footer"],
      params: { headerTitle: "Hello", copyrightText: "2025" },
    });

    componentFactory.create.mockReturnValue(mockComponent);
    commandBuilder.build.mockReturnValue(mockCommand);

    await app.execute();

    expect(componentFactory.create).toHaveBeenCalledTimes(2);
    expect(commandBuilder.build).toHaveBeenCalledTimes(2);
    expect(commandQueue.add).toHaveBeenCalledWith(mockCommand);
  });

  it("Выполняет очередь команд", async () => {
    slugService.getSlug.mockReturnValue("page");
    pageService.load.mockResolvedValue({
      components: ["A"],
      params: {},
    });

    componentFactory.create.mockReturnValue(mockComponent);
    commandBuilder.build.mockReturnValue(mockCommand);

    await app.execute();

    expect(commandQueue.execute).toHaveBeenCalled();
  });
});

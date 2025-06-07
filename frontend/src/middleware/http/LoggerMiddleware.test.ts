import { describe, it, vi, expect, beforeEach, afterEach } from "vitest";
import { LoggerMiddleware } from "./LoggerMiddleware";
import type { HttpRequestContext } from "./HttpRequestContext";

describe("LoggerMiddleware", () => {
  const originalConsoleLog = console.log;
  let logSpy: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    logSpy = vi.fn();
    console.log = logSpy;
  });

  afterEach(() => {
    console.log = originalConsoleLog;
  });

  const createContext = (
    overrides: Partial<HttpRequestContext> = {}
  ): HttpRequestContext => ({
    request: vi.fn(),
    ...overrides,
  });

  it("Логирует начало и конец выполнения запроса", async () => {
    const middleware = new LoggerMiddleware();

    const ctx = createContext({ response: { status: 200 } as Response });

    const next = vi
      .fn()
      .mockImplementation(() => new Promise((r) => setTimeout(r, 10)));

    await middleware.handle(ctx, next);

    expect(logSpy).toHaveBeenCalledWith("Начало обработки запроса");

    const logMsg = logSpy.mock.calls[1][0];
    expect(logMsg).toMatch(/Запрос выполнен за \d+ мс\. Статус запроса: 200/);

    expect(next).toHaveBeenCalledOnce();
  });

  it("Не должен выкидывать исключение, если статус ответа не был получен", async () => {
    const middleware = new LoggerMiddleware();
    const ctx = createContext({ response: {} as Response });

    const next = vi.fn();
    await expect(() => middleware.handle(ctx, next)).not.toThrow();
    expect(logSpy.mock.calls[1][0]).toMatch(/Статус запроса: undefined/);
  });
});

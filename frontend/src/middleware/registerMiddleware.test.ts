import { describe, it, expect, vi, beforeEach } from "vitest";

import { container } from "../core/di/di";
import { registerMiddleware } from "./registerMiddleware";
import { MiddlewarePipeline } from "../core/middleware/MiddlewarePipeline";
import { LoggerMiddleware } from "./http/LoggerMiddleware";
import { FetchMiddleware } from "./http/FetchMiddleware";

describe("registerMiddleware", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("Должен создать MiddlewarePipeline с LoggerMiddleware и FetchMiddleware и зарегистрировать в контейнере", () => {
    const bindMock = {
      toConstantValue: vi.fn(),
    };

    const containerBindSpy = vi
      .spyOn(container, "bind")
      .mockReturnValue(bindMock as any);

    registerMiddleware();

    // Проверяем, что bind вызван с правильным идентификатором
    expect(containerBindSpy).toHaveBeenCalledWith("HttpMiddlewareExecutor");

    // Проверяем, что toConstantValue вызван один раз
    expect(bindMock.toConstantValue).toHaveBeenCalledTimes(1);

    // Проверяем, что в toConstantValue передан экземпляр MiddlewarePipeline
    const pipelineInstance = bindMock.toConstantValue.mock.calls[0][0];
    expect(pipelineInstance).toBeInstanceOf(MiddlewarePipeline);

    // Проверяем, что MiddlewarePipeline содержит LoggerMiddleware и FetchMiddleware
    const middlewares = (pipelineInstance as any).middlewares ?? [];

    // Проверяем, что в pipeline находятся экземпляры LoggerMiddleware и FetchMiddleware
    const hasLogger = middlewares.some(
      (m: any) => m instanceof LoggerMiddleware
    );
    const hasFetch = middlewares.some((m: any) => m instanceof FetchMiddleware);

    expect(hasLogger).toBe(true);
    expect(hasFetch).toBe(true);
  });
});

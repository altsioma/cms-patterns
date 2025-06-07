import { describe, it, expect, vi } from "vitest";
import { FetchMiddleware } from "./FetchMiddleware";
import type { HttpRequestContext } from "./HttpRequestContext";

describe("FetchMiddleware", () => {
  const createContext = (
    requestFn: () => Promise<Response>
  ): HttpRequestContext => ({
    request: requestFn,
  });

  it("Должен вызывать next c ожидаемым ответом в случае успешного выполнения запроса", async () => {
    const mockJson = vi.fn().mockResolvedValue({ success: true });
    const mockResponse = {
      ok: true,
      status: 200,
      json: mockJson,
    } as unknown as Response;

    const ctx: HttpRequestContext = createContext(() =>
      Promise.resolve(mockResponse)
    );

    const next = vi.fn();
    const middleware = new FetchMiddleware();

    await middleware.handle(ctx, next);

    expect(ctx.response).toBe(mockResponse);
    expect(ctx.data).toEqual({ success: true });
    expect(ctx.error).toBeUndefined();
    expect(next).toHaveBeenCalledOnce();
  });

  it("Должен установить ошибку, если была ошибка при обработке fetch", async () => {
    const ctx: HttpRequestContext = createContext(() =>
      Promise.reject(new Error("network error"))
    );
    const next = vi.fn();
    const middleware = new FetchMiddleware();

    await middleware.handle(ctx, next);

    expect(ctx.response).toBeUndefined();
    expect(ctx.error).toEqual(new Error("network error"));
    expect(ctx.data).toBeUndefined();
    expect(next).toHaveBeenCalledOnce();
  });
});

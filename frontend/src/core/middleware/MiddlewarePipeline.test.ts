import { describe, it, expect, vi } from "vitest";
import { MiddlewarePipeline } from "./MiddlewarePipeline";
import type { IMiddleware } from "../interfaces/IMiddleware";

type TestContext = { value: number };

const createMiddleware = (
  fn: (ctx: TestContext) => void | Promise<void>
): IMiddleware<TestContext> => ({
  handle: async (ctx, next) => {
    await fn(ctx);
    await next();
  },
});

describe("MiddlewarePipeline", () => {
  it("Должен исполнять все middleware в очереди", async () => {
    const logs: string[] = [];

    const mw1 = createMiddleware((ctx) => {
      logs.push("mw1");
      ctx.value += 1;
    });

    const mw2 = createMiddleware((ctx) => {
      logs.push("mw2");
      ctx.value *= 2;
    });

    const pipeline = new MiddlewarePipeline<TestContext>([mw1, mw2]);

    const ctx = { value: 1 };
    const result = await pipeline.execute<typeof ctx>(ctx);

    expect(result).toEqual({ value: 4 }); // (1 + 1) * 2
    expect(logs).toEqual(["mw1", "mw2"]);
  });

  it("Должен вызвать onError, если middleware выкидывает исключение", async () => {
    const mw1 = createMiddleware(() => {
      throw new Error("boom");
    });

    const mw2 = createMiddleware(() => {
      throw new Error("should not reach");
    });

    const pipeline = new MiddlewarePipeline<TestContext>([mw1, mw2]);

    const ctx = { value: 1 };
    const onError = vi.fn().mockReturnValue({ fallback: true });

    const result = await pipeline.execute<typeof ctx | { fallback: boolean }>(
      ctx,
      onError
    );

    expect(result).toEqual({ fallback: true });
    expect(onError).toHaveBeenCalledOnce();
  });

  it("Должен выкинуть исключение, если в middleware вызывает next несколько раз", async () => {
    const badMiddleware: IMiddleware<TestContext> = {
      handle: async (ctx, next) => {
        await next();
        await next();
      },
    };

    const pipeline = new MiddlewarePipeline<TestContext>([badMiddleware]);
    const ctx = { value: 0 };

    await expect(() => pipeline.execute(ctx)).rejects.toThrow(
      "next() called multiple times"
    );
  });

  it("Должен выкинуть исключение, если onError не была установлена", async () => {
    const faultyMiddleware = createMiddleware(() => {
      throw new Error("unhandled");
    });

    const pipeline = new MiddlewarePipeline<TestContext>([faultyMiddleware]);
    const ctx = { value: 42 };

    await expect(() => pipeline.execute(ctx)).rejects.toThrow("unhandled");
  });
});

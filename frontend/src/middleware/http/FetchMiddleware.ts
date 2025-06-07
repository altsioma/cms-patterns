import { injectable } from "inversify";

import type { HttpRequestContext } from "./HttpRequestContext";
import type { IMiddleware } from "../../core/interfaces/IMiddleware";

/**
 * Middleware, выполняющее HTTP-запрос и сохраняющее результат в контекст
 */
@injectable()
export class FetchMiddleware implements IMiddleware<HttpRequestContext> {
  async handle(
    ctx: HttpRequestContext,
    next: () => Promise<void>
  ): Promise<void> {
    try {
      const response = await ctx.request();
      ctx.response = response;

      if (!response.ok) {
        ctx.error = new Error(`HTTP error: ${response.status}`);
        return;
      }

      const data = await response.json();
      ctx.data = data;
    } catch (err) {
      ctx.error = err as Error;
    }

    await next();
  }
}

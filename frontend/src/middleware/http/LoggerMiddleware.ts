import { injectable } from "inversify";

import type { HttpRequestContext } from "./HttpRequestContext";
import type { IMiddleware } from "../../core/interfaces/IMiddleware";

@injectable()
export class LoggerMiddleware implements IMiddleware<HttpRequestContext> {
  async handle(
    ctx: HttpRequestContext,
    next: () => Promise<void>
  ): Promise<void> {
    console.log("Начало обработки запроса");
    const start = Date.now();

    await next();

    const duration = Date.now() - start;
    console.log(
      `Запрос выполнен за ${duration} мс. Статус запроса: ${ctx.response?.status}`
    );
  }
}

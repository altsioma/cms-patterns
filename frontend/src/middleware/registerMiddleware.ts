import { container } from "../core/di/di";

import { MiddlewarePipeline } from "../core/middleware/MiddlewarePipeline";

import { FetchMiddleware } from "./http/FetchMiddleware";
import { LoggerMiddleware } from "./http/LoggerMiddleware";

import type { IMiddlewareExecutor } from "../core/interfaces/IMiddleware";
import type { HttpRequestContext } from "./http/HttpRequestContext";

export function registerMiddleware() {
  const pipeline = new MiddlewarePipeline<HttpRequestContext>([
    new LoggerMiddleware(),
    new FetchMiddleware(),
  ]);

  container
    .bind<IMiddlewareExecutor<HttpRequestContext>>("HttpMiddlewareExecutor")
    .toConstantValue(pipeline);
}

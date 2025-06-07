import { injectable, multiInject } from "inversify";
import type {
  IMiddleware,
  IMiddlewareExecutor,
} from "../interfaces/IMiddleware";

@injectable()
export class MiddlewarePipeline<T> implements IMiddlewareExecutor<T> {
  constructor(
    @multiInject("Middleware") private readonly middlewares: IMiddleware<T>[]
  ) {}

  async execute<TypeOut>(
    ctx: T,
    onError?: (error: unknown) => TypeOut
  ): Promise<TypeOut> {
    let index = -1;

    const runner = async (i: number): Promise<void> => {
      if (i <= index) throw new Error("next() called multiple times");
      index = i;
      const mw = this.middlewares[i];
      if (mw) {
        await mw.handle(ctx, () => runner(i + 1));
      }
    };

    try {
      await runner(0);
      return ctx as unknown as TypeOut;
    } catch (err) {
      if (onError) return onError(err);
      throw err;
    }
  }
}

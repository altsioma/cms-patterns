export interface IMiddleware<T> {
  handle(ctx: T, next: () => Promise<void> | void): Promise<void> | void;
}

export interface IMiddlewareExecutor<T> {
  execute<TypeOut>(
    ctx: T,
    onError?: (error: unknown) => TypeOut
  ): Promise<TypeOut>;
}

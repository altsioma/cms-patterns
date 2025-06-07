export interface HttpRequestContext {
  request: () => Promise<Response>;
  response?: Response;
  error?: Error;
  data?: unknown;
}

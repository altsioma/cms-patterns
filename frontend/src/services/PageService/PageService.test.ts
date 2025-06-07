import { describe, it, expect, vi, beforeEach } from "vitest";
import { PageService } from "./PageService";
import type { PageConfig } from "../../shared/types";
import type { HttpRequestContext } from "../../middleware/http/HttpRequestContext";
import type { IMiddlewareExecutor } from "../../core/interfaces/IMiddleware";

const mockMiddleware: IMiddlewareExecutor<HttpRequestContext> = {
  execute: vi.fn(),
};

const MOCK_VALID_PAGE: PageConfig = {
  components: ["Header", "Content", "Footer"],
  params: {
    headerTitle: "Valid Page",
    errorCode: 0,
    errorMessage: "",
    buttonText: "Click Me",
    buttonUrl: "/click",
    copyrightText: "",
    links: [],
  },
};

describe("PageService", () => {
  let service: PageService;

  beforeEach(() => {
    vi.resetAllMocks();
    service = new PageService(mockMiddleware);
  });

  it("Должен возвращать валидную конфигурацию страницы, если FetchMiddleware получила корректный ответ", async () => {
    // @ts-expect-error mock execute
    mockMiddleware.execute.mockImplementation(async (ctx, onError) => {
      ctx.data = MOCK_VALID_PAGE;
    });

    const result = await service.load("valid-slug");
    expect(result).toEqual(MOCK_VALID_PAGE);
  });

  it("Должен возвращать fallback-конфигурацию страницы, если FetchMiddleware получила некорректный ответ", async () => {
    // @ts-expect-error mock execute
    mockMiddleware.execute.mockImplementation(async (ctx, onError) => {
      ctx.data = "not-an-object";
    });

    const result = await service.load("invalid-data");
    expect(result).toEqual(service.fallbackPage("invalid-data"));
  });

  it("Должен возвращать fallback-конфигурацию страницы, если FetchMiddleware ничего не вернула", async () => {
    // @ts-expect-error mock execute
    mockMiddleware.execute.mockImplementation(async (ctx, onError) => {
      // нет ответа
    });

    const result = await service.load("missing-data");
    expect(result).toEqual(service.fallbackPage("missing-data"));
  });

  it("Должен возвращать fallback-конфигурацию страницы, если произошла ошибка при выполнении FetchMiddleware", async () => {
    // @ts-expect-error mock execute
    mockMiddleware.execute.mockImplementation(async (ctx, onError) => {
      onError();
    });

    const result = await service.load("broken");
    expect(result).toEqual(service.fallbackPage("broken"));
  });
});

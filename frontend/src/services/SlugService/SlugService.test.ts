import { describe, it, expect, vi, beforeEach } from "vitest";
import { SlugService } from "./SlugService";

describe("SlugService", () => {
  const service = new SlugService();

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  function mockLocation(pathname: string) {
    vi.stubGlobal(
      "window",
      Object.defineProperty({}, "location", {
        value: { pathname },
        writable: true,
      })
    );
  }

  it("Должен вернуть 'home' для корневого пути", () => {
    mockLocation("/");
    expect(service.getSlug()).toBe("home");
  });

  it("Должен вернуть slug без слешей", () => {
    mockLocation("/about");
    expect(service.getSlug()).toBe("about");
  });

  it("Должен удалить завершающий слеш", () => {
    mockLocation("/contact/");
    expect(service.getSlug()).toBe("contact");
  });

  it("должен вернуть 'home' при пустом пути", () => {
    mockLocation("");
    expect(service.getSlug()).toBe("home");
  });
});

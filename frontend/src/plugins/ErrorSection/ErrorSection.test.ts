import { describe, it, expect, beforeEach } from "vitest";
import { ErrorSection } from "./ErrorSection.component";

describe("ErrorSection", () => {
  let container: HTMLElement;

  beforeEach(() => {
    container = document.createElement("div");
    container.id = "test-root";
    document.body.innerHTML = "";
    document.body.appendChild(container);
  });

  it("Должен рендерить секцию ошибки с дефолтными значениями", () => {
    const section = new ErrorSection(container, {});
    section.execute();

    const renderedSection = container.querySelector(".error-section")!;
    const code = renderedSection.querySelector(".error-code")!;
    const title = renderedSection.querySelector(".error-title")!;
    const button = renderedSection.querySelector(".error-button");

    expect(renderedSection).toBeTruthy();
    expect(code.textContent).toBe("500");
    expect(title.textContent).toBe("Что-то пошло не так");
    expect(button).toBeNull();
  });

  it("Должен рендерить секцию ошибки с кастомными значениями", () => {
    const customParams = {
      errorCode: 404,
      errorMessage: "Страница не найдена",
      title: "Ошибка 404",
      buttonText: "На главную",
      buttonUrl: "/",
    };

    const section = new ErrorSection(container, customParams);
    section.execute();

    const renderedSection = container.querySelector(".error-section")!;
    const code = renderedSection.querySelector(".error-code")!;
    const title = renderedSection.querySelector(".error-title")!;
    const button = renderedSection.querySelector(
      ".error-button"
    ) as HTMLAnchorElement;

    expect(code.textContent).toBe("404");
    expect(title.textContent).toBe("Страница не найдена");
    expect(button).toBeTruthy();
    expect(button.textContent).toBe("На главную");
    expect(button.href).toContain("/");
  });
});

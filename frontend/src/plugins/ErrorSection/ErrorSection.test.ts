import { describe, it, expect } from "vitest";
import { ErrorSection } from "./ErrorSection.component";
import type { ErrorSectionProps } from "./types";

describe("ErrorSection", () => {
  const component = new ErrorSection();

  it("Должен адаптировать параметры с default", () => {
    const raw = {};
    const adapted = component.adapter<ErrorSectionProps>(raw);

    expect(adapted).toEqual({
      errorCode: 500,
      title: "Ошибка",
      errorMessage: "Что-то пошло не так",
      buttonText: undefined,
      buttonUrl: "#",
    });
  });

  it("Должен корректно адаптировать переданные параметры", () => {
    const raw = {
      errorCode: 404,
      title: "Not Found",
      errorMessage: "Страница не найдена",
      buttonText: "На главную",
      buttonUrl: "/",
    };

    const adapted = component.adapter<ErrorSectionProps>(raw);

    expect(adapted).toEqual({
      errorCode: 404,
      title: "Not Found",
      errorMessage: "Страница не найдена",
      buttonText: "На главную",
      buttonUrl: "/",
    });
  });

  it("Должен отрендерить секцию с кнопкой", () => {
    const props: ErrorSectionProps = {
      errorCode: 403,
      title: "Access Denied",
      errorMessage: "У вас нет доступа",
      buttonText: "Войти",
      buttonUrl: "/login",
    };

    const element = component.render(props);

    expect(element.tagName).toBe("SECTION");

    const code = element.querySelector(".error-code");
    const title = element.querySelector(".error-title");
    const button = element.querySelector(".error-button") as HTMLAnchorElement;

    expect(code?.textContent).toBe("403");
    expect(title?.textContent).toBe("У вас нет доступа");

    expect(button).toBeTruthy();
    expect(button.textContent).toBe("Войти");
    expect(button.getAttribute("href")).toBe("/login");
  });

  it("Не должен отображать кнопку, если buttonText отсутствует", () => {
    const props: ErrorSectionProps = {
      errorCode: 500,
      title: "Ошибка сервера",
      errorMessage: "Произошла ошибка",
      buttonUrl: "/retry",
    };

    const element = component.render(props);
    const button = element.querySelector(".error-button");

    expect(button).toBeNull();
  });
});

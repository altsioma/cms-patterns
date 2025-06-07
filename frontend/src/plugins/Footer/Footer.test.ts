import { describe, it, expect } from "vitest";
import { FooterPlugin } from "./Footer.component";
import type { FooterProps } from "./types";

describe("FooterPlugin", () => {
  const footer = new FooterPlugin();

  it("Должен адаптировать параметры корректно", () => {
    const params = {
      copyrightText: "© 2025 My Company",
      links: [
        { url: "/about", text: "About" },
        { url: "/contact", text: "Contact" },
      ],
    };

    const adapted = footer.adapter<FooterProps>(params);

    expect(adapted).toEqual({
      copyrightText: "© 2025 My Company",
      links: [
        { url: "/about", text: "About" },
        { url: "/contact", text: "Contact" },
      ],
    });
  });

  it("Должен корректно отрендерить футер с ссылками", () => {
    const props: FooterProps = {
      copyrightText: "© 2025 Test Corp",
      links: [
        { url: "/home", text: "Home" },
        { url: "/blog", text: "Blog" },
      ],
    };

    const element = footer.render(props);

    expect(element.tagName).toBe("FOOTER");
    expect(element.querySelector("p")?.textContent).toBe("© 2025 Test Corp");

    const links = element.querySelectorAll("a");
    expect(links.length).toBe(2);
    expect(links[0].textContent).toBe("Home");
    expect(links[0].getAttribute("href")).toBe("/home");
    expect(links[1].textContent).toBe("Blog");
  });
});

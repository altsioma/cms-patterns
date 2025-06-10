import type { ICommand } from "../../core/interfaces/ICommand";
import type { FooterProps } from "./types";

export class Footer implements ICommand {
  constructor(
    private readonly _ctx: HTMLElement,
    private readonly _params: Record<string, unknown>
  ) {}

  private adapter<T>(params: Record<string, unknown>) {
    return {
      copyrightText: params["copyrightText"],
      links: params["links"],
    } as T;
  }

  execute(): void {
    const props = this.adapter<FooterProps>(this._params);

    const footer = document.createElement("footer");
    footer.style.cssText = `
      background: #1a1a1a;
      color: white;
      padding: 2rem;
      text-align: center;
    `;

    const copyright = document.createElement("p");
    copyright.textContent = props.copyrightText;
    copyright.style.marginBottom = "1rem";
    footer.appendChild(copyright);

    if (props.links?.length) {
      const linksContainer = document.createElement("div");
      linksContainer.style.display = "flex";
      linksContainer.style.justifyContent = "center";
      linksContainer.style.gap = "1rem";

      props.links.forEach((link) => {
        const a = document.createElement("a");
        a.href = link.url;
        a.textContent = link.text;
        a.style.color = "#fff";
        a.style.textDecoration = "none";
        linksContainer.appendChild(a);
      });

      footer.appendChild(linksContainer);
    }

    this._ctx.appendChild(footer);
  }
}

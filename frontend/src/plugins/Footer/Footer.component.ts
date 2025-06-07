import type { IUIComponent } from "../../core/interfaces/IUIComponent";
import type { FooterProps } from "./types";

class Footer implements IUIComponent {
  adapter<FooterProps>(params: Record<string, unknown>) {
    return {
      copyrightText: params["copyrightText"],
      links: params["links"],
    } as FooterProps;
  }

  render(props: FooterProps): HTMLElement {
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

    return footer;
  }
}

export { Footer as FooterPlugin };

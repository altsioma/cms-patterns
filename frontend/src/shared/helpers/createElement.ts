export function createRootElement(rootNode: string | undefined): HTMLElement {
  if (rootNode && typeof rootNode === "string") {
    const foundNode = document.querySelector(rootNode);

    if (!foundNode) {
      throw new Error(`Элемент с селектором '${rootNode}' не найден`);
    }

    return foundNode as HTMLElement;
  }

  const existing = document.getElementById("root");

  if (existing) {
    return existing;
  }

  const defaultRoot = document.createElement("div");
  defaultRoot.id = "root";
  document.body.append(defaultRoot);

  return defaultRoot;
}

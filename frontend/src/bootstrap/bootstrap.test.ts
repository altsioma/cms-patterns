import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { bootstrap } from "./bootstrap";
import { container } from "../core/di/di";
import { App } from "../app/App";
import { FakeComponentPlugin } from "../plugins/FakeComponent/FakeComponent.component";

describe("bootstrap (integration)", () => {
  let root: HTMLElement;

  beforeEach(() => {
    try {
      container.unbindAll();
    } catch (e) {
      // пропускаем, если не было биндингов
    }

    root = document.createElement("div");
    root.id = "test-root";
    document.body.appendChild(root);
  });

  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("должен зарегистрировать App и его зависимости", async () => {
    await bootstrap(root);

    const resolved = container.get("App");
    expect(resolved).toBeInstanceOf(App);
  });

  it("должен зарегистрировать FakeComponent плагин", async () => {
    await bootstrap(root);

    const instance = container.get("FakeComponent");
    expect(instance).toBeInstanceOf(FakeComponentPlugin);
  });
});

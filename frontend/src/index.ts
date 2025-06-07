import "reflect-metadata";
import { bootstrap } from "./bootstrap/bootstrap";
import { container } from "./core/di/di";
import { App } from "./app/App";
import { createRootElement } from "./shared/helpers/createElement";

(async function init() {
  try {
    const rootEl = createRootElement("#root");

    await bootstrap(rootEl);

    container.get<App>("App").execute();
  } catch (e) {
    console.log(e);
  }
})();

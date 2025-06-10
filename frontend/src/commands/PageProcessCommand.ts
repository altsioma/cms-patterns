import { inject, injectable } from "inversify";

import { container } from "../core/di/di";

import type { ICommand } from "../core/interfaces/ICommand";
import type { IPageService } from "../services/PageService/IPageService";
import type { ISlugService } from "../services/SlugService/ISlugService";
import type { DependencyFactory } from "../core/di/types";
import type { MacroCommand } from "./MacroCommand";

@injectable()
export class PageProcessCommand implements ICommand {
  constructor(
    @inject("SlugService") private readonly slugService: ISlugService,
    @inject("PageService") private readonly pageService: IPageService,
    @inject("MacroCommand") private readonly macro: MacroCommand
  ) {}

  async execute() {
    const { components, params } = await this.pageService.load(
      this.slugService.getSlug()
    );

    const documentCtx = document.getElementById("root");

    for (const name of components) {
      const command = container.get<DependencyFactory<ICommand>>(name);

      this.macro.add(command(documentCtx, params));
    }
  }
}

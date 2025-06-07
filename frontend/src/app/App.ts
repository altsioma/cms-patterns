import { inject, injectable } from "inversify";

import type { IPageService } from "../services/PageService/IPageService";
import type { IComponentFactory } from "../core/interfaces/IComponentFactory";
import type { ICommandBuilder } from "../core/interfaces/ICommandBuilder";
import type { ICommandQueue } from "../core/interfaces/ICommandQueue";
import type { ISlugService } from "../services/SlugService/ISlugService";

/**
 * Главный класс приложения
 * @class
 * @injectable
 */
@injectable()
export class App {
  /**
   * @constructor
   * @param {ISlugService} slugService - Сервис работы с URL
   * @param {IPageService} pageService - Сервис загрузки страниц
   * @param {ICommandQueue} commandQueue - Очередь команд
   * @param {IComponentFactory} componentFactory - Фабрика компонентов
   * @param {ICommandBuilder} commandBuilder - Builder команд
   */
  constructor(
    @inject("SlugService") private slugService: ISlugService,
    @inject("PageService") private pageService: IPageService,
    @inject("MacroCommand") private commandQueue: ICommandQueue,
    @inject("HTMLComponentFactory") private componentFactory: IComponentFactory,
    @inject("HTMLCommandBuilder") private commandBuilder: ICommandBuilder
  ) {}

  /**
   * Запускает выполнение приложения
   * @async
   * @returns {Promise<void>}
   */
  async execute() {
    const slug = this.slugService.getSlug();
    const pageData = await this.pageService.load(slug);

    const { components, params } = pageData;

    for (const name of components) {
      const component = this.componentFactory.create(name);
      const command = this.commandBuilder.build(component, params);
      this.commandQueue.add(command);
    }

    await this.commandQueue.execute();
  }
}

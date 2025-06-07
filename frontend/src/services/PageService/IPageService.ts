import type { PageConfig } from "../../shared/types";

export interface IPageService {
  load(slug: string): Promise<PageConfig>;
}

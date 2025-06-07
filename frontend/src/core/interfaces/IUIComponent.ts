export interface IUIComponent<T = unknown> {
  render(props?: T): HTMLElement;
  adapter?<Props>(params: Record<string, unknown>): Props;
}

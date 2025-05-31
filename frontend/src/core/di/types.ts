import type {JSX} from "react";

export interface IPluginComponent<T = unknown> {
    render(props: T): JSX.Element;
}

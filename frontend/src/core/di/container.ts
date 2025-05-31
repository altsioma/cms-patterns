import {container} from "tsyringe";
import type {IPluginComponent} from "./types";

const pluginRegistry = new Map<string, unknown>();

export const registerPlugin = (name: string, pluginClass: new () => IPluginComponent) => {
    container.register<IPluginComponent>(name, {useClass: pluginClass});
    pluginRegistry.set(name, pluginClass);
};

export {container, pluginRegistry};
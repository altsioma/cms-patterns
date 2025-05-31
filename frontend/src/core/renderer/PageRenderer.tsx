import { container } from "tsyringe";
import type { PageProps } from "./types.ts";
import type { IPluginComponent } from "../di/types.ts";


export const PageRenderer = ({ schema }: PageProps) => {
    return (
        <div>
            {schema.components.map((component, index) => {
                try {
                    const plugin = container.resolve<IPluginComponent>(component)
                    const renderFn = () => plugin.render(block['component'].props);
                    return <></>
                } catch (e) {
                    return <div key={index} style={{ color: "red" }}>Unknown component: {component}</div>;
                }
            })}
        </div>
    )
}

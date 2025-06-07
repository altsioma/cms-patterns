import { describe, it, expect, vi } from "vitest";
import { HTMLCommandBuilder } from "./HTMLCommandBuilder";
import { HTMLRenderCommand } from "./HTMLRenderCommand";
import type { IUIComponent } from "../core/interfaces/IUIComponent";

describe("HTMLCommandBuilder", () => {
  const mockContext = document.createElement("div");
  const builder = new HTMLCommandBuilder(mockContext);

  describe("build()", () => {
    const mockComponent: IUIComponent = {
      render: vi.fn().mockReturnValue(document.createElement("div")),
    };
    const testParams = { title: "Test" };

    it("Должен возвращать instance ICommand", () => {
      const command = builder.build(mockComponent, testParams);
      expect(command).toBeInstanceOf(HTMLRenderCommand);
      expect(typeof command.execute).toBe("function");
    });

    it("Должен создавать HTMLRenderCommand с правильными параметрами", () => {
      const command = builder.build(
        mockComponent,
        testParams
      ) as HTMLRenderCommand;

      expect(command).toHaveProperty("_element", mockContext);
      expect(command).toHaveProperty("_component", mockComponent);
      expect(command).toHaveProperty("_params", testParams);
    });

    it("Должен работать с разными типами компонентов", () => {
      const componentWithoutAdapter: IUIComponent = {
        render: vi.fn(),
      };
      const componentWithAdapter: IUIComponent = {
        render: vi.fn(),
        adapter: vi.fn(),
      };

      expect(() => builder.build(componentWithoutAdapter, {})).not.toThrow();
      expect(() => builder.build(componentWithAdapter, {})).not.toThrow();
    });

    it("Должен обрабатывать пустой объект параметров", () => {
      const command = builder.build(mockComponent, {});
      expect(() => command.execute()).not.toThrow();
    });
  });
});

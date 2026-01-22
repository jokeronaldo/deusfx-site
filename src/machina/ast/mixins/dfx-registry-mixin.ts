import { LitElement, html } from "lit";
import { property } from "lit/decorators.js";
import { registry } from "../core/registry";
import { registryRenderer } from "../core/runtime/registry-renderer";
import { DfxPropsMixin } from "./dfx-props-mixin";

export const DfxRegistryMixin = (superClass: any) => {
  class DfxRegistryMixinClass extends DfxPropsMixin(superClass) {
    // 🔥 Component ID registrado
    @property({ type: String })
    componentId?: string;

    // 🔥 Props dinâmicas
    @property({ type: Object })
    componentProps: Record<string, any> = {};

    // 🔥 Referência ao registry
    get $registry() {
      return registry;
    }

    // 🔥 Método para renderizar componente registrado
    protected renderRegisteredComponent(
      componentId?: string,
      props?: any
    ): any {
      const id = componentId || this.componentId;
      if (!id) {
        console.warn("No componentId provided");
        return html``;
      }

      const def = registry.get(id);
      if (!def) {
        console.warn(`Component ${id} not registered`);
        return html``;
      }

      // Cria AST do componente
      const finalProps = { ...this.componentProps, ...props };
      const ast = registry.createAST(id, finalProps);

      if (!ast) {
        console.warn(`Failed to create AST for ${id}`);
        return html``;
      }

      // Renderiza usando registry renderer
      const context = this._createRenderContext();
      const node = registryRenderer.render(ast, context);

      // Se renderizou, retorna como Lit template
      if (node) {
        // Converte Node para Lit template
        return html`${node}`;
      }

      return html``;
    }

    // 🔥 Método para adicionar componente ao registry
    protected registerSelf(options?: {
      id?: string;
      name?: string;
      type?: string;
      category?: string;
      tags?: string[];
    }) {
      const id = options?.id || this.tagName.toLowerCase();

      registry.register({
        id,
        name: options?.name || this.constructor.name,
        type: options?.type || "component",
        category: options?.category,
        tags: options?.tags,
        version: "1.0.0",
        blueprint: this.blueprint || this.constructor.blueprint,
        props: this.constructor.properties || {},
        metadata: {
          element: this.constructor,
        },
      });
    }

    // Lifecycle
    connectedCallback() {
      super.connectedCallback();

      // Auto-registro se tiver blueprint
      if (this.blueprint || this.constructor.blueprint) {
        this.registerSelf();
      }
    }
  }

  return DfxRegistryMixinClass;
};

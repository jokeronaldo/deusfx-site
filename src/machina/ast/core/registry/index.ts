import type { ASTNode } from "../ast/types";

export interface ComponentDefinition {
  id: string;
  name: string;
  type: "component" | "layout" | "widget" | "directive" | "plugin";
  version: string;
  category?: string;
  tags?: string[];
  icon?: string;

  // 🔥 SUA AST como template
  blueprint?: ASTNode | (() => ASTNode);

  // Ou função de renderização
  render?: (ctx: any) => ASTNode;

  // Props/atributos
  props?: Record<
    string,
    {
      type?: any;
      default?: any;
      required?: boolean;
      validator?: (value: any) => boolean;
    }
  >;

  // Estilos
  styles?: string | (() => string);

  // Dependências
  dependencies?: string[];

  // Metadata
  metadata?: Record<string, any>;

  // Factory (opcional)
  factory?: () => Promise<any> | any;
}

export class ComponentRegistry {
  private components = new Map<string, ComponentDefinition>();
  private instances = new Map<string, any>();
  private plugins = new Map<string, any>();

  // 🔥 Registrar componente com AST
  register(def: ComponentDefinition): void {
    this.components.set(def.id, def);
    console.log(`✅ Registered: ${def.name} (${def.type})`);
  }

  // 🔥 Registrar plugin
  registerPlugin(pluginId: string, plugin: any): void {
    this.plugins.set(pluginId, plugin);

    // Registrar componentes do plugin
    if (plugin.registerComponents) {
      plugin.registerComponents(this);
    }

    console.log(`✅ Plugin loaded: ${pluginId}`);
  }

  // 🔥 Obter definição
  get(id: string): ComponentDefinition | undefined {
    return this.components.get(id);
  }

  // 🔥 Listar por tipo/categoria
  list(options?: {
    type?: string;
    category?: string;
    tags?: string[];
  }): ComponentDefinition[] {
    let items = Array.from(this.components.values());

    if (options?.type) {
      items = items.filter((c) => c.type === options.type);
    }

    if (options?.category) {
      items = items.filter((c) => c.category === options.category);
    }

    if (options?.tags?.length) {
      items = items.filter((c) =>
        c.tags?.some((tag) => options.tags!.includes(tag))
      );
    }

    return items;
  }

  // 🔥 Criar instância AST do componente
  createAST(
    componentId: string,
    props: Record<string, any> = {}
  ): ASTNode | null {
    const def = this.components.get(componentId);
    if (!def) return null;

    // Se tem blueprint fixo
    if (def.blueprint) {
      const blueprint =
        typeof def.blueprint === "function" ? def.blueprint() : def.blueprint;

      // 🔥 Aplica props ao blueprint
      return this.applyPropsToAST(blueprint, props);
    }

    // Se tem função render
    if (def.render) {
      return def.render({ props, registry: this });
    }

    return null;
  }

  // 🔥 Aplica props à AST
  private applyPropsToAST(ast: ASTNode, props: Record<string, any>): ASTNode {
    // Implementação simplificada - você pode expandir
    return JSON.parse(JSON.stringify(ast));
  }

  // 🔥 Buscar por query
  search(query: string): ComponentDefinition[] {
    const q = query.toLowerCase();
    return Array.from(this.components.values()).filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.id.toLowerCase().includes(q) ||
        c.tags?.some((tag) => tag.toLowerCase().includes(q)) ||
        c.category?.toLowerCase().includes(q)
    );
  }
}

// 🔥 Singleton global
export const registry = new ComponentRegistry();

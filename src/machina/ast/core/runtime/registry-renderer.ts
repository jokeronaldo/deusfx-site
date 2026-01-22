import { registry } from "../registry";
import { renderNode, type RenderContext } from "./runtime";
import type { ASTNode } from "../ast/types";

// 🔥 Renderer que entende componentes registrados
export class RegistryRenderer {
  // Renderiza AST, resolvendo componentes registrados
  render(ast: ASTNode, ctx: RenderContext, parent?: Node): Node | null {
    // Se for elemento customizado registrado
    if (ast.type === "element" && registry.get(ast.tag)) {
      return this.renderRegisteredComponent(ast.tag, ast, ctx, parent);
    }

    // Se for slot com componente dinâmico
    if (ast.type === "slot" && ast.props?.component) {
      return this.renderDynamicComponent(ast, ctx, parent);
    }

    // Fallback para renderização normal
    return renderNode(ast, ctx);
  }

  // 🔥 Renderiza componente registrado
  private renderRegisteredComponent(
    componentId: string,
    node: ASTNode,
    ctx: RenderContext,
    parent?: Node
  ): Node | null {
    const def = registry.get(componentId);
    if (!def) {
      console.warn(`Component ${componentId} not registered`);
      return null;
    }

    // Extrai props do node
    const props = this.extractPropsFromNode(node);

    // Cria AST do componente
    const componentAST = registry.createAST(componentId, props);
    if (!componentAST) {
      console.warn(`Failed to create AST for ${componentId}`);
      return null;
    }

    // 🔥 Merge com children do node original
    if (node.type === "element" && node.children) {
      this.mergeChildren(componentAST, node.children);
    }

    // Renderiza
    return renderNode(componentAST, ctx, parent);
  }

  // 🔥 Renderiza componente dinâmico de slot
  private renderDynamicComponent(
    node: any,
    ctx: RenderContext,
    parent?: Node
  ): Node | null {
    const componentId = node.props?.component;
    if (!componentId) return null;

    const props = { ...node.props };
    delete props.component;

    return this.renderRegisteredComponent(componentId, node, ctx, parent);
  }

  // Extrai props do node AST
  private extractPropsFromNode(node: ASTNode): Record<string, any> {
    if (node.type !== "element") return {};

    const props: Record<string, any> = {};

    // De attrs
    if (node.attrs) {
      Object.assign(props, node.attrs);
    }

    // De props
    if (node.props) {
      Object.assign(props, node.props);
    }

    // De meta
    if (node.meta?.scope) {
      Object.assign(props, node.meta.scope);
    }

    return props;
  }

  // Merge children do node original no componente
  private mergeChildren(componentAST: ASTNode, children: ASTNode[]): void {
    if (componentAST.type !== "element") return;

    // Encontra slots no componente
    const findSlots = (node: ASTNode): ASTSlot[] => {
      if (node.type === "slot") return [node];
      if (node.type === "element" && node.children) {
        return node.children.flatMap(findSlots);
      }
      return [];
    };

    const slots = findSlots(componentAST);

    // Substitui slots pelos children
    if (slots.length > 0) {
      this.replaceSlotWithChildren(componentAST, slots[0], children);
    } else {
      // Adiciona children como filhos do componente
      if (!componentAST.children) componentAST.children = [];
      componentAST.children.push(...children);
    }
  }

  private replaceSlotWithChildren(
    node: ASTNode,
    slot: ASTSlot,
    children: ASTNode[]
  ): void {
    if (node.type === "element" && node.children) {
      const index = node.children.indexOf(slot);
      if (index !== -1) {
        node.children.splice(index, 1, ...children);
      } else {
        // Procura recursivamente
        node.children.forEach((child) => {
          if (child.type === "element") {
            this.replaceSlotWithChildren(child, slot, children);
          }
        });
      }
    }
  }
}

export const registryRenderer = new RegistryRenderer();

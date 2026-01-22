import type { ASTNode, ASTElement, ASTDirective } from "./ast";
import { resolveText } from "./expression";
import {
  type DirectiveInstance,
  mountDirectiveChain,
  mountDirective,
  patchDirective,
  renderAstList,
  //resolveDirective,
} from "./directives";
import { resolveSlot, type SlotMap } from "./slots";
import { evaluate } from "./expression";
import { TransitionManager, type TransitionOptions } from "./transitions";

interface BlockInstance {
  ast: ASTNode;
  node: Node;
}

export interface RenderContext {
  host: any;
  scope: any;
  slots?: SlotMap;
  blocks?: Map<string, BlockInstance>;
  directives?: Map<string, DirectiveInstance>;
}

export function renderNode(node: ASTNode, ctx: RenderContext): Node {
  // 🔥 Garante que ctx.blocks existe
  if (!ctx.blocks) {
    ctx.blocks = new Map();
  }

  if ("__scope" in node) {
    ctx = {
      ...ctx,
      scope: (node as any).__scope,
      blocks: ctx.blocks, // Mantém a referência
    };
  }

  if (node.type === "text") {
    return document.createTextNode(resolveText(node.value, ctx.scope));
  }

  if (node.type === "slot") {
    const contextSlots = ctx?.slots || {};
    const contextHostSlotTemplates = collectSlots(ctx.host) || {};
    const mergedSlots = {
      ...contextSlots,
      ...contextHostSlotTemplates,
    };

    const frag = document.createDocumentFragment();
    const content = resolveSlot(node.name ?? "default", mergedSlots);

    for (const child of content) {
      // 🔥 Começa com escopo atual (que já tem item/itemIndex se estiver no each)
      let slotScope = ctx.scope;

      // 🔥 Se o slot tem props, avalia-as
      if (node.props) {
        slotScope = { ...ctx.scope }; // Cópia do escopo

        Object.entries(node.props).forEach(([key, expr]) => {
          try {
            slotScope[key] = evaluate(expr, ctx.scope);
          } catch (e) {
            console.warn(`Slot prop error ${key}=${expr}:`, e);
            slotScope[key] = undefined;
          }
        });
      }

      // 🔥 Renderiza com escopo atualizado
      const slotCtx = {
        ...ctx,
        scope: slotScope,
      };

      frag.appendChild(renderNode({ ...child, __scope: slotScope }, slotCtx));
    }

    return frag;
  }

  if (node.type === "directive") {
    const frag = document.createDocumentFragment();
    // ULTIX
    //resolveDirective(node, ctx.scope).forEach((n) => {
    //  frag.appendChild(renderNode(n, ctx));
    //});

    return frag;
  }

  const el = document.createElement(node.tag);

  if (node.meta?.key) {
    ctx.blocks.set(node.meta.key, {
      ast: node,
      node: el,
    });
  }

  Object.entries(node.attrs ?? {}).forEach(([k, v]) =>
    el.setAttribute(k, resolveText(String(v), ctx.scope))
  );

  Object.entries(node.props ?? {}).forEach(([k, v]) => {
    (el as any)[k.replace(/^[:.]/, "")] =
      typeof v === "string" ? resolveText(v, ctx.scope) : v;
  });

  Object.entries(node.events ?? {}).forEach(([evt, cfg]) => {
    el.addEventListener(evt.replace("@", ""), (e) => {
      const fn = ctx.scope?.[cfg.handler] ?? ctx.host?.[cfg.handler];

      if (typeof fn !== "function") return;

      const params = cfg.params?.map((p) => evaluate(p, ctx.scope)) ?? [];

      fn.call(e, ctx.host, e?.target || null, ...params);
    });
  });

  //node.children?.forEach((c) => el.appendChild(renderNode(c, ctx)));
  renderChildren(node.children, ctx, el);

  return el;
}

function renderChildren(
  children: ASTNode[] | undefined,
  ctx: RenderContext,
  parent: HTMLElement | DocumentFragment
) {
  if (!children || children.length === 0) return;

  for (let i = 0; i < children.length; i++) {
    const node = children[i];

    if (node.type === "directive" && node.kind === "if") {
      const chain: ASTDirective[] = [];

      while (
        children[i] &&
        children[i].type === "directive" &&
        ["if", "else-if", "else"].includes((children[i] as ASTDirective).kind)
      ) {
        chain.push(children[i] as ASTDirective);
        i++;
      }

      i--; // compensação do loop

      mountDirectiveChain(chain, ctx, parent);
      continue;
    }

    if (node.type === "directive" && node.kind === "each") {
      mountDirective(node, ctx, parent);
      continue;
    }

    parent.appendChild(renderNode(node, ctx));
  }
}

export function resolveConditionalChain(
  nodes: ASTNode[],
  ctx: RenderContext
): ASTNode[] {
  for (const node of nodes) {
    if (node.type !== "directive") continue;

    if (node.kind === "if" || node.kind === "else-if") {
      if (evaluate(node.expression!, ctx.scope)) {
        return node.children ?? [];
      }
    }

    if (node.kind === "else") {
      return node.children ?? [];
    }
  }

  return [];
}

export function domToAst(node: Node): ASTNode {
  // Text
  if (node.nodeType === Node.TEXT_NODE) {
    return {
      type: "text",
      value: node.textContent ?? "",
    };
  }

  // No element ignores
  if (node.nodeType !== Node.ELEMENT_NODE) {
    return {
      type: "text",
      value: "",
    };
  }

  const el = node as HTMLElement;
  const tag = el.tagName.toLowerCase();

  // Slot
  if (tag === "slot") {
    return {
      type: "slot",
      name: el.getAttribute("name") ?? "default",
    };
  }

  // Directives
  if (tag === "template") {
    // Each
    if (el.hasAttribute("each")) {
      return {
        type: "directive",
        kind: "each",
        expression: el.getAttribute("each")!,
        itemAlias: el.getAttribute("item") ?? "item",
        indexAlias: el.getAttribute("index") ?? "index",
        children: collectTemplateChildren(el),
      };
    }

    // If, else and else-if
    if (el.hasAttribute("if")) {
      return {
        type: "directive",
        kind: "if",
        expression: el.getAttribute("if")!,
        children: collectTemplateChildren(el),
      };
    }

    if (el.hasAttribute("else-if")) {
      return {
        type: "directive",
        kind: "else-if",
        expression: el.getAttribute("else-if")!,
        children: collectTemplateChildren(el),
      };
    }

    if (el.hasAttribute("else")) {
      return {
        type: "directive",
        kind: "else",
        children: collectTemplateChildren(el),
      };
    }

    // wrapper
    return {
      type: "element",
      tag: "fragment",
      children: collectTemplateChildren(el),
    };
  }

  if (node.type === "element") {
    const el = document.createElement(node.tag);

    if (node.meta?.key) {
      ctx.blocks.set(node.meta.key, {
        ast: node,
        node: el,
      });
    }

    // Atributos (sempre strings)
    Object.entries(node.attrs ?? {}).forEach(([k, v]) => {
      if (typeof v === "string") {
        el.setAttribute(k, resolveText(v, ctx.scope));
      } else {
        el.setAttribute(k, String(v));
      }
    });

    // 🔥 CORREÇÃO: Props devem passar objetos como objetos
    Object.entries(node.props ?? {}).forEach(([k, v]) => {
      const propName = k.replace(/^[:.]/, "");

      let finalValue = v;

      if (typeof v === "string") {
        // Avalia a expressão
        const evaluated = evaluate(v, ctx.scope);

        // 🔥 SE for objeto, passa como objeto
        if (evaluated !== undefined) {
          if (typeof evaluated === "object" && evaluated !== null) {
            finalValue = evaluated; // OBJETO
          } else {
            finalValue = evaluated; // VALOR SIMPLES
          }
        } else if (v.includes("{{")) {
          // Fallback para interpolação
          finalValue = resolveText(v, ctx.scope);
        }
      }

      // 🔥 Define a propriedade
      (el as any)[propName] = finalValue;
    });

    // ... resto do código (events, children) ...

    return el;
  }

  // Element
  const attrs: Record<string, any> = {};
  const props: Record<string, any> = {};
  const events: Record<string, any> = {};
  const meta: any = {};

  Array.from(el.attributes).forEach((attr) => {
    const name = attr.name;
    const value = attr.value;

    // Events
    if (name.startsWith("@")) {
      events[name] = { handler: value };
      return;
    }

    // Props
    if (name.startsWith(".") || name.startsWith(":")) {
      props[name] = value;
      return;
    }

    // Block
    if (name === "block" || name === "data-block") {
      meta.key = value;
      return;
    }

    // Attrs
    attrs[name] = value;
  });

  const ast: ASTElement = {
    type: "element",
    tag,
    attrs,
    props,
    events: Object.keys(events).length ? events : undefined,
    meta: meta.key ? meta : undefined,
    children: el.childNodes.length
      ? Array.from(el.childNodes).map(domToAst)
      : undefined,
  };

  return ast;
}

export class BlueprintRuntime {
  rootAst: ASTNode;
  ctx: RenderContext;
  rootNode?: Node;
  mounted = false;

  constructor(ast: ASTNode, host: any, scopeOrContext: any) {
    this.rootAst = ast;

    // 🔥 DETECTA se é contexto ou apenas scope
    let finalHost = host;
    let finalScope = scopeOrContext;

    if (scopeOrContext && typeof scopeOrContext === "object") {
      // Se já é um RenderContext completo
      if ("host" in scopeOrContext && "scope" in scopeOrContext) {
        this.ctx = scopeOrContext as RenderContext;
        return;
      }
    }

    // 🔥 Cria contexto com escopo enriquecido
    this.ctx = {
      host: finalHost,
      scope: this.createEnrichedScope(finalHost, finalScope),
      slots: collectSlots(finalHost),
      blocks: new Map(),
    };

    //console.log(
    //  "BlueprintRuntime created with scope:",
    //  Object.keys(this.ctx.scope)
    //);
  }

  // 🔥 Método para criar escopo enriquecido
  private createEnrichedScope(host: any, baseScope?: any): any {
    const scope: any = baseScope || {};

    // 🔥 Copia propriedades do host
    Object.keys(host).forEach((key) => {
      if (!key.startsWith("_") && key !== "render" && key !== "update") {
        const value = host[key];

        // Se for getter, define como propriedade computada
        const descriptor = Object.getOwnPropertyDescriptor(host, key);
        if (descriptor?.get) {
          Object.defineProperty(scope, key, {
            get: () => host[key],
            enumerable: true,
          });
        } else {
          scope[key] = value;
        }
      }
    });

    // 🔥 Copia métodos
    for (const key in host) {
      if (typeof host[key] === "function" && !key.startsWith("_")) {
        scope[key] = (host[key] as Function).bind(host);
      }
    }

    // 🔥 Adiciona referência ao host
    scope.host = host;
    scope.$host = host;

    return scope;
  }

  mount(): Node {
    if (!this.rootNode) {
      //console.log("Mounting - Scope has:", Object.keys(this.ctx.scope));
      this.rootNode = renderNode(this.rootAst, this.ctx);
      this.mounted = true;
    }

    return this.rootNode;
  }

  invalidate() {
    this.ctx.directives?.forEach((d) => {
      patchDirective(d, this.ctx);
    });
  }
}

// Helpers
export function astReplaceBlock(
  ctx: RenderContext,
  key: string,
  newAst: ASTNode,
  transitionOptions?: TransitionOptions
): Promise<void> {
  const block = ctx.blocks?.get(key);
  if (!block) return Promise.resolve();

  const parent = block.node.parentNode;
  if (!parent) return Promise.resolve();

  const newNode = renderNode(newAst, ctx);

  if (
    transitionOptions &&
    block.node instanceof HTMLElement &&
    newNode instanceof HTMLElement
  ) {
    return TransitionManager.replace(
      block.node as HTMLElement,
      newNode as HTMLElement,
      transitionOptions
    ).then(() => {
      ctx.blocks!.set(key, {
        ast: newAst,
        node: newNode,
      });
    });
  } else {
    // Sem transição (fallback)
    parent.replaceChild(newNode, block.node);
    ctx.blocks!.set(key, {
      ast: newAst,
      node: newNode,
    });
    return Promise.resolve();
  }
}

// Patch para directives com transição
export function patchDirectiveWithTransition(
  inst: DirectiveInstance,
  ctx: RenderContext,
  transitionOptions?: TransitionOptions
): Promise<void> {
  clearBetween(inst.start, inst.end);

  const [first] = inst.ast;

  if (first.kind === "if") {
    const nodes = resolveConditionalChain(inst.ast, ctx);

    if (transitionOptions && nodes.length > 0) {
      // Encontra container para animação
      const container = document.createElement("div");
      container.style.position = "relative";
      inst.end.parentNode!.insertBefore(container, inst.end);

      return TransitionManager.toggleContent(
        container,
        true,
        () => {
          const frag = document.createDocumentFragment();
          nodes.forEach((n) => {
            frag.appendChild(renderNode(n, ctx));
          });
          container.appendChild(frag);
          return container;
        },
        transitionOptions
      ).then(() => {});
    } else {
      renderAstList(nodes, ctx, inst.end);
      return Promise.resolve();
    }
  }

  // ... similar para each
}

function collectTemplateChildren(tpl: HTMLTemplateElement): ASTNode[] {
  const nodes = tpl.content?.childNodes?.length
    ? tpl.content.childNodes
    : tpl.childNodes;

  return Array.from(nodes).map(domToAst).filter(Boolean);
}

export function collectSlots(templateNode: HTMLElement): SlotMap {
  const slots: SlotMap = {};

  const templates = templateNode.querySelectorAll("template");

  templates.forEach((tpl) => {
    const name =
      tpl.getAttribute("name") || tpl.getAttribute("slot") || "default";

    const nodes: ASTNode[] = [];

    let content = tpl.content.childNodes;

    if (!content.length) {
      content = tpl.childNodes;
    }

    Array.from(content).forEach((node) => {
      const template = domToAst(node);

      if ("type" in template) {
        nodes.push(template);
      }
    });

    slots[name] = nodes;
  });

  return slots;
}

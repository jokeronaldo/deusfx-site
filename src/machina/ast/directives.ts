import type { ASTDirective, ASTNode } from "./ast";
import { evaluate } from "./expression";
import { type RenderContext, renderNode } from "./runtime";
import { resolveConditionalChain } from "./runtime";

export interface DirectiveInstance {
  kind: "if" | "each";
  key: string;
  parent: Node;
  start: Comment;
  end: Comment;
  ast: ASTDirective | ASTDirective[];
  activeIndex?: number;
  items?: any[];
}

export function resolveDirective(dir: ASTDirective, scope: any): any[] {
  // ---------- IF ----------
  if (dir.kind === "if") {
    return evaluate(dir.expression!, scope) ? dir.children : [];
  }

  // ---------- EACH ----------
  if (dir.kind === "each") {
    const raw = evaluate(dir.expression!, scope);
    console.log(raw, 88);

    // 🔒 NORMALIZAÇÃO ABSOLUTA
    let list: any[] = [];

    if (Array.isArray(raw)) {
      list = raw;
    } else if (raw && typeof raw === "object") {
      // Vue Proxy / iterable
      try {
        list = Array.from(raw as any);
      } catch {
        list = [];
      }
    }

    if (!list.length) return [];

    const out: any[] = [];

    for (let index = 0; index < list.length; index++) {
      const item = list[index];

      for (const child of dir.children) {
        out.push({
          ...child,
          __scope: {
            ...scope,
            [dir.itemAlias ?? "item"]: item,
            [dir.indexAlias ?? "index"]: index,
          },
        });
      }
    }

    return out;
  }

  return [];
}

export function mountDirectiveChain(
  chain: ASTDirective[],
  ctx: RenderContext,
  parent: Node
) {
  if (!ctx.directives) ctx.directives = new Map();

  const key = chain[0].meta?.key ?? `if-${ctx.directives.size}`;

  const start = document.createComment(`dfx:${key}:start`);
  const end = document.createComment(`dfx:${key}:end`);

  parent.appendChild(start);
  parent.appendChild(end);

  const instance: DirectiveInstance = {
    kind: "if",
    key,
    parent,
    start,
    end,
    ast: chain, // ✅ AGORA É ARRAY
  };

  ctx.directives.set(key, instance);

  patchDirective(instance, ctx);
}

export function mountDirective(
  node: ASTDirective,
  ctx: RenderContext,
  parent: Node
) {
  if (!ctx.directives) ctx.directives = new Map();

  const key = node.meta?.key || `${node.kind}-${ctx.directives.size}`;

  const start = document.createComment(`dfx:${key}:start`);
  const end = document.createComment(`dfx:${key}:end`);

  parent.appendChild(start);
  parent.appendChild(end);

  const instance: DirectiveInstance = {
    kind: node.kind,
    key,
    parent,
    start,
    end,
    ast: [node],
  };

  ctx.directives.set(key, instance);

  patchDirective(instance, ctx);
}

// directives.ts (corrija a parte do each)

export function patchDirective(inst: DirectiveInstance, ctx: RenderContext) {
  clearBetween(inst.start, inst.end);

  const [first] = inst.ast;

  if (first.kind === "if") {
    const nodes = resolveConditionalChain(inst.ast, ctx);
    renderAstList(nodes, ctx, inst.end);
  }

  if (first.kind === "each") {
    const dir = first;
    const list = evaluate(dir.expression!, ctx.scope) || [];

    //console.log("Each list:", list, "Scope:", ctx.scope); // DEBUG

    list.forEach((item, index) => {
      // 🔥 Cria escopo do item CORRETAMENTE
      const itemScope: any = {};

      // 1. Copia TUDO do escopo pai
      Object.keys(ctx.scope).forEach((key) => {
        itemScope[key] = ctx.scope[key];
      });

      // 2. 🔥 GARANTE que host está disponível
      if (ctx.host && !itemScope.host) {
        itemScope.host = ctx.host;
      }

      // 3. Adiciona variáveis do each
      itemScope[dir.itemAlias!] = item;
      itemScope[dir.indexAlias!] = index;

      // 4. 🔥 Copia propriedades do host para fácil acesso
      if (ctx.host) {
        // Copia propriedades públicas
        Object.keys(ctx.host).forEach((key) => {
          if (!(key in itemScope) && !key.startsWith("_") && key !== "render") {
            itemScope[key] = (ctx.host as any)[key];
          }
        });

        // 🔥 Copia getters
        const proto = Object.getPrototypeOf(ctx.host);
        const descriptors = Object.getOwnPropertyDescriptors(proto);
        Object.keys(descriptors).forEach((key) => {
          if (descriptors[key].get && !key.startsWith("_")) {
            Object.defineProperty(itemScope, key, {
              get: () => (ctx.host as any)[key],
              enumerable: true,
            });
          }
        });
      }

      //console.log("Item scope for", item, ":", Object.keys(itemScope)); // DEBUG

      // 🔥 Cria contexto mantendo referências
      const itemCtx = {
        ...ctx,
        scope: itemScope,
      };

      // Renderiza cada filho
      dir.children?.forEach((child) => {
        const node = { ...child, __scope: itemScope };
        const rendered = renderNode(node, itemCtx);
        if (rendered) {
          inst.end.parentNode!.insertBefore(rendered, inst.end);
        }
      });
    });
  }
}

// Helpers
function clearBetween(start: Comment, end: Comment) {
  let n = start.nextSibling;
  while (n && n !== end) {
    const next = n.nextSibling;
    n.remove();
    n = next;
  }
}

export function renderAstList(
  nodes: ASTNode[],
  ctx: RenderContext,
  before: Node
) {
  nodes.forEach((n) => {
    before.parentNode!.insertBefore(renderNode(n, ctx), before);
  });
}

function renderAstWithScope(
  ast: ASTNode,
  scope: any,
  ctx: RenderContext,
  before: Node
) {
  // ✅ Apenas insere novo nó na posição correta
  const node = { ...ast, __scope: scope };
  const newCtx = { ...ctx, scope: scope };
  before.parentNode!.insertBefore(renderNode(node, newCtx), before);
}

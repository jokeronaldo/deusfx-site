type CacheEntry = {
  fn: Function;
};

//const cache = new Map<string, CacheEntry>();

const cache = new Map<string, Function>();

// expression.ts (atualize a função evaluate)

export function evaluate(expr: string, scope: any): any {
  const source = expr.trim();

  if (!scope) {
    //console.warn("evaluate: scope is undefined for", expr);
    return undefined;
  }

  // DEBUG
  //console.log("Evaluating:", expr, "Scope keys:", Object.keys(scope));

  // ✅ Identificador simples - busca hierárquica
  if (isSimpleIdentifier(source)) {
    // 1. Busca direta no escopo
    if (source in scope) {
      return scope[source];
    }

    // 2. Busca no host (se disponível no escopo)
    if (scope.host && source in scope.host) {
      return scope.host[source];
    }

    // 3. Busca como getter do host
    if (scope.host) {
      const descriptor = Object.getOwnPropertyDescriptor(scope.host, source);
      if (descriptor?.get) {
        return descriptor.get.call(scope.host);
      }
    }

    return undefined;
  }

  // ✅ Expressão JavaScript
  const cacheKey = `expr:${source}`;
  if (!cache.has(cacheKey)) {
    try {
      const fn = new Function(
        "scope",
        `
        try {
          // 🔥 Inclui host no contexto
          const host = scope.host || scope;
          const context = { ...scope, ...host };
          
          with(context) { 
            return (${source}); 
          }
        } catch(e) {
          console.warn('Expression error:', e.message, 'expr:', '${source}');
          return undefined;
        }
      `
      );
      cache.set(cacheKey, fn);
    } catch (e) {
      console.error("Failed to compile expression:", source, e);
      cache.set(cacheKey, () => undefined);
    }
  }

  try {
    return cache.get(cacheKey)!(scope);
  } catch (e) {
    console.error("Error evaluating expression:", source, e);
    return undefined;
  }
}

// expression.ts (adicione esta função)

export function resolveText(text: string, scope: any): string {
  if (!text.includes("{{")) return text;

  return text.replace(/\{\{(.+?)\}\}/g, (_, expr) => {
    const result = evaluate(expr, scope);

    // 🔥 Se for objeto, converte para JSON
    if (result && typeof result === "object") {
      try {
        return JSON.stringify(result);
      } catch {
        return "[Object]";
      }
    }

    return result != null ? String(result) : "";
  });
}

export function resolveValue(scope: any, key: string) {
  if (key in scope) return scope[key];

  if (scope?.host) {
    if (key in scope.host) return scope.host[key];

    if (scope.host.getAttribute) {
      if (scope.host.hasAttribute(key)) {
        return scope.host.getAttribute(key);
      }

      const kebab = key.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase());

      if (scope.host.hasAttribute(kebab)) {
        return scope.host.getAttribute(kebab);
      }
    }
  }

  return undefined;
}

export function resolveScopeValue(scope: any, key: string) {
  if (key in scope) return scope[key];
  if (scope?.host && key in scope.host) return scope.host[key];

  if (scope?.host?.getAttribute) {
    if (scope.host.hasAttribute(key)) {
      return scope.host.getAttribute(key);
    }

    const kebab = key.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase());

    if (scope.host.hasAttribute(kebab)) {
      return scope.host.getAttribute(kebab);
    }
  }

  return undefined;
}

export function isSimpleIdentifier(expr: string) {
  return /^[a-zA-Z_$][\w$]*$/.test(expr);
}

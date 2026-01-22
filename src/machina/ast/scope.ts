// Helpers
export function createComponentScope(component: any, parentScope?: any): any {
  const scope: any = parentScope ? { ...parentScope } : {};

  // 🔥 Copia propriedades do componente
  Object.keys(component).forEach((key) => {
    if (!key.startsWith("_") && key !== "render" && key !== "update") {
      const descriptor = Object.getOwnPropertyDescriptor(component, key);

      if (descriptor?.get) {
        // É um getter/computed
        Object.defineProperty(scope, key, {
          get: () => component[key],
          enumerable: true,
        });
      } else {
        scope[key] = component[key];
      }
    }
  });

  // 🔥 Copia métodos
  for (const key in component) {
    if (typeof component[key] === "function" && !key.startsWith("_")) {
      scope[key] = component[key].bind(component);
    }
  }

  // 🔥 Referências importantes
  scope.host = component;
  scope.$host = component;
  scope.$self = component;
  scope.$component = component;

  // 🔥 Helper para eval
  scope.$eval = (expr: string) => {
    const { evaluate } = require("../expression");
    return evaluate(expr, scope);
  };

  return scope;
}

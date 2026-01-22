// /core/store/index.ts
import { defineStore } from "pinia";
import { ref, reactive, computed } from "vue";
import { registry } from "../registry";
import type { ASTNode } from "../ast/types";

// 🔥 Store para Layout/Grid
export const useLayoutStore = defineStore("layout", () => {
  // Layout principal
  const rootLayout = ref<ASTNode>({
    type: "element",
    tag: "div",
    attrs: { class: "layout-root" },
    children: [],
  });

  // Grid state
  const grid = reactive({
    columns: 12,
    rows: "auto",
    gap: 16,
    breakpoints: {
      xs: 0,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
    },
  });

  // Componentes no layout
  const layoutComponents = reactive<
    Array<{
      id: string;
      componentId: string;
      ast: ASTNode;
      position: {
        x: number;
        y: number;
        width: number;
        height: number;
      };
      props: Record<string, any>;
      metadata: Record<string, any>;
    }>
  >([]);

  // Componente selecionado
  const selectedComponentId = ref<string | null>(null);

  // Computed
  const selectedComponent = computed(() =>
    selectedComponentId.value
      ? layoutComponents.find((c) => c.id === selectedComponentId.value)
      : null
  );

  const gridTemplateColumns = computed(() => `repeat(${grid.columns}, 1fr)`);

  // Actions
  function addComponent(
    componentId: string,
    position?: { x: number; y: number }
  ) {
    const def = registry.get(componentId);
    if (!def) return null;

    const id = `comp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Criar AST do componente
    const ast = registry.createAST(componentId);
    if (!ast) return null;

    const component = {
      id,
      componentId,
      ast,
      position: position || { x: 0, y: 0, width: 1, height: 1 },
      props: {},
      metadata: {
        name: def.name,
        type: def.type,
        icon: def.icon,
        addedAt: new Date(),
      },
    };

    layoutComponents.push(component);
    selectComponent(id);

    return id;
  }

  function removeComponent(componentId: string) {
    const index = layoutComponents.findIndex((c) => c.id === componentId);
    if (index !== -1) {
      layoutComponents.splice(index, 1);
      if (selectedComponentId.value === componentId) {
        selectedComponentId.value = null;
      }
    }
  }

  function selectComponent(componentId: string | null) {
    selectedComponentId.value = componentId;
  }

  function updateComponentPosition(
    componentId: string,
    updates: Partial<{ x: number; y: number; width: number; height: number }>
  ) {
    const component = layoutComponents.find((c) => c.id === componentId);
    if (component) {
      Object.assign(component.position, updates);
    }
  }

  function updateComponentProps(
    componentId: string,
    props: Record<string, any>
  ) {
    const component = layoutComponents.find((c) => c.id === componentId);
    if (component) {
      component.props = { ...component.props, ...props };

      // 🔥 Atualiza AST com novas props
      const def = registry.get(component.componentId);
      if (def) {
        const newAST = registry.createAST(
          component.componentId,
          component.props
        );
        if (newAST) {
          component.ast = newAST;
        }
      }
    }
  }

  function serializeLayout() {
    return {
      grid: { ...grid },
      components: layoutComponents.map((c) => ({
        id: c.id,
        componentId: c.componentId,
        position: { ...c.position },
        props: { ...c.props },
        metadata: { ...c.metadata },
      })),
    };
  }

  function loadLayout(data: any) {
    if (data.grid) {
      Object.assign(grid, data.grid);
    }

    if (data.components) {
      layoutComponents.length = 0;
      data.components.forEach((comp: any) => {
        const ast = registry.createAST(comp.componentId, comp.props);
        if (ast) {
          layoutComponents.push({
            ...comp,
            ast,
          });
        }
      });
    }
  }

  // 🔥 Snap to grid
  function snapToGrid(value: number): number {
    return Math.round(value / grid.gap) * grid.gap;
  }

  return {
    // State
    rootLayout,
    grid,
    layoutComponents,
    selectedComponentId,

    // Computed
    selectedComponent,
    gridTemplateColumns,

    // Actions
    addComponent,
    removeComponent,
    selectComponent,
    updateComponentPosition,
    updateComponentProps,
    serializeLayout,
    loadLayout,
    snapToGrid,
  };
});

// 🔥 Store para Editor
export const useEditorStore = defineStore("editor", () => {
  const mode = ref<"design" | "code" | "preview">("design");
  const zoom = ref(1);
  const showGrid = ref(true);
  const showRulers = ref(true);
  const activeTool = ref<"select" | "move" | "resize" | "text" | "component">(
    "select"
  );

  // History/Undo
  const history = reactive<
    Array<{ action: string; data: any; timestamp: Date }>
  >([]);
  const historyIndex = ref(-1);

  const canUndo = computed(() => historyIndex.value > 0);
  const canRedo = computed(() => historyIndex.value < history.length - 1);

  function setMode(newMode: "design" | "code" | "preview") {
    mode.value = newMode;
  }

  function setZoom(newZoom: number) {
    zoom.value = Math.max(0.1, Math.min(5, newZoom));
  }

  function recordHistory(action: string, data: any) {
    // Remove redo history if we're not at the end
    if (historyIndex.value < history.length - 1) {
      history.splice(historyIndex.value + 1);
    }

    history.push({
      action,
      data,
      timestamp: new Date(),
    });

    historyIndex.value = history.length - 1;
  }

  function undo() {
    if (canUndo.value) {
      historyIndex.value--;
      // Aqui você aplicaria o undo
      console.log("Undo:", history[historyIndex.value]);
    }
  }

  function redo() {
    if (canRedo.value) {
      historyIndex.value++;
      // Aqui você aplicaria o redo
      console.log("Redo:", history[historyIndex.value]);
    }
  }

  return {
    mode,
    zoom,
    showGrid,
    showRulers,
    activeTool,
    history,
    historyIndex,
    canUndo,
    canRedo,

    setMode,
    setZoom,
    recordHistory,
    undo,
    redo,
  };
});

// 🔥 Exporta todas as stores
export const useUIStore = defineStore("ui", () => {
  const windows = reactive<Record<string, any>>({});
  const overlays = reactive<Record<string, any>>({});

  return {
    windows,
    overlays,
  };
});

// 🔥 Store para Registry
export const useRegistryStore = defineStore("registry", () => {
  const loadedPlugins = ref<string[]>([]);

  return {
    loadedPlugins,
  };
});

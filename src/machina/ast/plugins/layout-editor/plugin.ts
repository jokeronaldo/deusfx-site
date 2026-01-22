import { registry } from "../../core/registry";
import { useLayoutStore } from "../../core/store";
import { $ } from "../../core/ast/types";

export default {
  name: "layout-editor",
  version: "1.0.0",

  registerComponents(reg: typeof registry) {
    // 🔥 Grid Editor
    reg.register({
      id: "layout-grid-editor",
      name: "Grid Editor",
      type: "layout",
      category: "layout",
      tags: ["grid", "editor", "drag-drop"],
      icon: "📐",
      blueprint: $.el(
        "div",
        $.attr("class", "layout-editor"),

        // Toolbar
        $.el(
          "div",
          $.attr("class", "editor-toolbar"),
          $.el("button", $.on("click", "addColumn()"), $.text("Add Column")),
          $.el("button", $.on("click", "addRow()"), $.text("Add Row")),
          $.el(
            "select",
            $.on("change", "changeGridSize($event.target.value)"),
            $.el("option", $.attr("value", "12"), $.text("12 Columns")),
            $.el("option", $.attr("value", "16"), $.text("16 Columns")),
            $.el("option", $.attr("value", "24"), $.text("24 Columns"))
          )
        ),

        // Área do grid
        $.el(
          "div",
          $.attr("class", "grid-area"),
          $.each(
            "gridCells",
            { item: "cell", index: "i" },
            $.el(
              "div",
              $.attr(
                "class",
                'grid-cell {{ cell.selected ? "selected" : "" }}'
              ),
              $.attr("data-col", "{{ cell.col }}"),
              $.attr("data-row", "{{ cell.row }}"),
              $.on("click", "selectCell(cell)"),
              $.on("dragstart", "startDrag(cell, $event)"),
              $.on("drop", "handleDrop(cell, $event)"),

              // Conteúdo da célula
              $.if(
                "cell.component",
                $.el(
                  "dfx-component",
                  $.attr("component-id", "{{ cell.component }}")
                ),
                $.el(
                  "div",
                  $.attr("class", "cell-placeholder"),
                  $.text("Drop component here")
                )
              )
            )
          )
        ),

        // Property panel
        $.if(
          "selectedCell",
          $.el(
            "div",
            $.attr("class", "property-panel"),
            $.el("h3", $.text("Cell Properties")),
            $.el("label", $.text("Width:")),
            $.el(
              "input",
              $.attr("type", "range"),
              $.attr("min", "1"),
              $.attr("max", "12"),
              $.attr("value", "{{ selectedCell.colspan || 1 }}"),
              $.on(
                "input",
                'updateCellProperty("colspan", $event.target.value)'
              )
            )
            // Mais propriedades...
          )
        )
      ),
    });

    // 🔥 Component Library
    reg.register({
      id: "component-library",
      name: "Component Library",
      type: "widget",
      category: "tools",
      tags: ["components", "library"],
      icon: "📚",
      render: () => {
        const components = registry.list({ type: "component" });

        return $.el(
          "div",
          $.attr("class", "component-library"),
          $.each(
            "components",
            { item: "comp" },
            $.el(
              "div",
              $.attr("class", "library-item"),
              $.attr("draggable", "true"),
              $.attr("data-component-id", "{{ comp.id }}"),
              $.on("dragstart", "dragComponent(comp, $event)"),

              $.el(
                "div",
                $.attr("class", "library-item-icon"),
                $.text('{{ comp.icon || "📦" }}')
              ),
              $.el(
                "div",
                $.attr("class", "library-item-name"),
                $.text("{{ comp.name }}")
              )
            )
          )
        );
      },
    });
  },

  initialize() {
    console.log("Layout Editor plugin initialized");

    // Inicializa store
    const layoutStore = useLayoutStore();

    // Adiciona exemplos
    layoutStore.addComponent("dfx-button", { x: 1, y: 1 });
    layoutStore.addComponent("dfx-input", { x: 3, y: 1 });
  },

  // API do plugin
  getLayoutJSON() {
    const layoutStore = useLayoutStore();
    return layoutStore.serializeLayout();
  },

  exportAsHTML() {
    const layoutStore = useLayoutStore();
    const layout = layoutStore.serializeLayout();

    // Converte layout para HTML
    return this.convertLayoutToHTML(layout);
  },
};

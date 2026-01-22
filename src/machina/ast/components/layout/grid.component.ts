import { DfxRegistryMixin } from "../../mixins/dfx-registry-mixin";
import { LitElement, html, css } from "lit";
import { property } from "lit/decorators.js";
import { $ } from "../../core/ast/types";

// Componente de Grid Layout
export class DfxGrid extends DfxRegistryMixin(LitElement) {
  static blueprint = $.el(
    "div",
    $.attr("class", "dfx-grid"),
    $.attr("data-columns", "{{ columns }}"),
    $.attr("data-gap", "{{ gap }}px"),

    // Slot para células
    $.each(
      "cells",
      { item: "cell", index: "i" },
      $.el(
        "div",
        $.attr("class", "grid-cell"),
        $.attr("data-col", "{{ cell.col }}"),
        $.attr("data-row", "{{ cell.row }}"),
        $.attr("data-colspan", "{{ cell.colspan || 1 }}"),
        $.attr("data-rowspan", "{{ cell.rowspan || 1 }}"),

        // Conteúdo da célula
        $.if(
          "cell.component",
          // Componente registrado
          $.el(
            "dfx-component",
            $.attr("component-id", "{{ cell.component }}"),
            $.prop("componentProps", "{{ cell.props || {} }}")
          ),
          // Slot padrão
          $.slot("default")
        )
      )
    )
  );

  @property({ type: Number })
  columns = 12;

  @property({ type: Number })
  gap = 16;

  @property({ type: Array })
  cells: Array<{
    col: number;
    row: number;
    colspan?: number;
    rowspan?: number;
    component?: string;
    props?: Record<string, any>;
  }> = [];

  static styles = css`
    .dfx-grid {
      display: grid;
      position: relative;
      width: 100%;
      height: 100%;
    }

    .grid-cell {
      position: relative;
      min-height: 50px;
      border: 1px dashed #ccc;
      background: rgba(255, 255, 255, 0.05);
    }

    .grid-cell:hover {
      background: rgba(255, 255, 255, 0.1);
      border-color: #667eea;
    }
  `;

  render() {
    // Usa o blueprint registrado
    return this.renderRegisteredComponent("dfx-grid", {
      columns: this.columns,
      gap: this.gap,
      cells: this.cells,
    });
  }

  // Métodos de API
  addCell(cell: any) {
    this.cells = [...this.cells, cell];
  }

  removeCell(index: number) {
    this.cells = this.cells.filter((_, i) => i !== index);
  }

  updateCell(index: number, updates: any) {
    this.cells = this.cells.map((cell, i) =>
      i === index ? { ...cell, ...updates } : cell
    );
  }

  // Snap to grid
  snapToGrid(value: number): number {
    return Math.round(value / this.gap) * this.gap;
  }
}

customElements.define("dfx-grid", DfxGrid);

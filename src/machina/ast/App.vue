<template>
  <div class="dfx-studio">
    <!-- Topbar -->
    <div class="studio-topbar">
      <button @click="toggleMode('design')">🎨 Design</button>
      <button @click="toggleMode('code')">💻 Code</button>
      <button @click="toggleMode('preview')">👁️ Preview</button>

      <select v-model="zoomLevel" @change="setZoom">
        <option value="0.5">50%</option>
        <option value="0.75">75%</option>
        <option value="1">100%</option>
        <option value="1.5">150%</option>
        <option value="2">200%</option>
      </select>
    </div>

    <div class="studio-container">
      <!-- Sidebar - Component Library -->
      <div class="studio-sidebar">
        <h3>📚 Components</h3>
        <div class="component-list">
          <div
            v-for="comp in availableComponents"
            :key="comp.id"
            class="component-item"
            draggable="true"
            @dragstart="dragStart(comp, $event)"
          >
            <div class="component-icon">{{ comp.icon || '📦' }}</div>
            <div class="component-name">{{ comp.name }}</div>
          </div>
        </div>
      </div>

      <!-- Main Canvas -->
      <div
        class="studio-canvas"
        :style="{ transform: `scale(${editor.zoom})` }"
        @dragover.prevent
        @drop="handleDrop"
      >
        <!-- Grid Lines -->
        <div v-if="editor.showGrid" class="canvas-grid" :style="gridStyle"></div>

        <!-- Layout Root -->
        <div class="layout-container" :style="layoutStyle">
          <!-- Componentes renderizados dinamicamente -->
          <div
            v-for="comp in layoutComponents"
            :key="comp.id"
            class="component-wrapper"
            :class="{ selected: layout.selectedComponentId === comp.id }"
            :style="getComponentStyle(comp)"
            @click="selectComponent(comp.id)"
          >
            <div class="component-placeholder">
              {{ comp.metadata?.name || comp.componentId }}
            </div>
          </div>
        </div>
      </div>

      <!-- Property Panel -->
      <div class="studio-properties" v-if="selectedComponent">
        <h3>⚙️ Properties</h3>
        <div class="property-group">
          <label>Position</label>
          <input
            type="number"
            v-model.number="selectedComponent.position.x"
            @change="updateComponentPosition"
          />
          <input
            type="number"
            v-model.number="selectedComponent.position.y"
            @change="updateComponentPosition"
          />
        </div>

        <div class="property-group">
          <label>Size</label>
          <input
            type="number"
            v-model.number="selectedComponent.position.width"
            @change="updateComponentPosition"
          />
          <input
            type="number"
            v-model.number="selectedComponent.position.height"
            @change="updateComponentPosition"
          />
        </div>
      </div>
    </div>

    <!-- Status Bar -->
    <div class="studio-statusbar">
      <span>Mode: {{ editor.mode }}</span>
      <span>Components: {{ layoutComponents.length }}</span>
      <span>Zoom: {{ editor.zoom * 100 }}%</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'; import { storeToRefs } from 'pinia'; import {
useLayoutStore, useEditorStore } from './core/store'; import { registry } from './core/registry'; //
import { useComponentStore } from '../../stores/component';
Stores const layoutStore = useLayoutStore(); const editorStore = useEditorStore(); // Destructure
stores usando storeToRefs para manter reatividade const { grid, selectedComponentId } =
storeToRefs(layoutStore); const { mode, zoom, showGrid } = storeToRefs(editorStore); // 🔥 Use
computed para layoutComponents const layoutComponents = computed(() =>
layoutStore.layoutComponents); // 🔥 Use computed para selectedComponent const selectedComponent =
computed(() => { if (!selectedComponentId.value) return null; return
layoutStore.layoutComponents.find(c => c.id === selectedComponentId.value); }); // Local refs const
zoomLevel = ref('1'); // Computed const availableComponents = computed(() => registry.list({ type:
'component' }) ); const gridStyle = computed(() => ({ backgroundSize: `${grid.value.gap}px
${grid.value.gap}px`, backgroundImage: ` linear-gradient(to right, #eee 1px, transparent 1px),
linear-gradient(to bottom, #eee 1px, transparent 1px) ` })); const layoutStyle = computed(() => ({
display: 'grid', gridTemplateColumns: `repeat(${grid.value.columns}, 1fr)`, gap:
`${grid.value.gap}px`, width: '100%', height: '100%', position: 'relative' })); // Methods function
toggleMode(newMode) { editorStore.setMode(newMode); } function setZoom() {
editorStore.setZoom(parseFloat(zoomLevel.value)); } function dragStart(comp, event) {
event.dataTransfer?.setData('component/id', comp.id); event.dataTransfer?.setData('component/name',
comp.name); } function handleDrop(event) { const componentId =
event.dataTransfer?.getData('component/id'); if (!componentId) return; const rect =
event.currentTarget.getBoundingClientRect(); const x = Math.floor((event.clientX - rect.left) /
grid.value.gap); const y = Math.floor((event.clientY - rect.top) / grid.value.gap);
layoutStore.addComponent(componentId, { x: x || 0, y: y || 0, width: 2, height: 1 }); } // 🔥
CORREÇÃO: Verifica se position existe function getComponentStyle(comp) { // Se não tiver position,
usa valores padrão const pos = comp.position || { x: 0, y: 0, width: 1, height: 1 }; return {
gridColumn: `${pos.x || 0} / span ${pos.width || 1}`, gridRow: `${pos.y || 0} / span ${pos.height ||
1}`, border: '2px solid #ccc', padding: '8px', backgroundColor: 'rgba(255, 255, 255, 0.1)' }; }
function selectComponent(id) { layoutStore.selectComponent(id); } function updateComponentPosition()
{ if (selectedComponent.value) { layoutStore.updateComponentPosition( selectedComponent.value.id,
selectedComponent.value.position || { x: 0, y: 0, width: 1, height: 1 } ); } } // Load exemplo
components on mount onMounted(() => { // Registrar alguns componentes exemplo registry.register({
id: 'dfx-button', name: 'Button', type: 'component', category: 'basic', icon: '🔘', version: '1.0.0'
}); registry.register({ id: 'dfx-input', name: 'Input', type: 'component', category: 'basic', icon:
'📝', version: '1.0.0' }); registry.register({ id: 'dfx-card', name: 'Card', type: 'component',
category: 'layout', icon: '📄', version: '1.0.0' }); // 🔥 Adicionar alguns componentes exemplo ao
layout layoutStore.addComponent('dfx-button', { x: 1, y: 1, width: 2, height: 1 });
layoutStore.addComponent('dfx-input', { x: 4, y: 1, width: 3, height: 1 });
layoutStore.addComponent('dfx-card', { x: 1, y: 3, width: 4, height: 2 }); });
</script>

<style>
/* Mantenha os estilos anteriores... */
.dfx-studio {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: #1a1a1a;
  color: white;
  font-family:
    system-ui,
    -apple-system,
    sans-serif;
}

.studio-topbar {
  display: flex;
  gap: 10px;
  padding: 10px;
  background: #2a2a2a;
  border-bottom: 1px solid #444;
}

.studio-topbar button {
  background: #3a3a3a;
  color: white;
  border: 1px solid #555;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}

.studio-topbar button:hover {
  background: #4a4a4a;
}

.studio-topbar select {
  background: #3a3a3a;
  color: white;
  border: 1px solid #555;
  padding: 8px;
  border-radius: 4px;
}

.studio-container {
  flex: 1;
  display: flex;
  overflow: hidden;
}

.studio-sidebar {
  width: 250px;
  background: #2a2a2a;
  border-right: 1px solid #444;
  padding: 16px;
  overflow-y: auto;
}

.component-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.component-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: #3a3a3a;
  border-radius: 6px;
  cursor: grab;
  border: 1px solid transparent;
}

.component-item:hover {
  background: #4a4a4a;
  border-color: #667eea;
}

.component-icon {
  font-size: 20px;
}

.component-name {
  font-size: 14px;
}

.studio-canvas {
  flex: 1;
  position: relative;
  overflow: auto;
  padding: 20px;
  transform-origin: top left;
}

.canvas-grid {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  opacity: 0.3;
}

.layout-container {
  min-height: 800px;
  min-width: 1200px;
}

.component-wrapper {
  border: 2px solid transparent;
  border-radius: 4px;
  transition: border-color 0.2s;
}

.component-wrapper:hover {
  border-color: #888;
}

.component-wrapper.selected {
  border-color: #667eea;
  background: rgba(102, 126, 234, 0.1);
}

.component-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #aaa;
  font-size: 14px;
}

.studio-properties {
  width: 300px;
  background: #2a2a2a;
  border-left: 1px solid #444;
  padding: 16px;
  overflow-y: auto;
}

.property-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
}

.property-group label {
  font-size: 12px;
  color: #aaa;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.property-group input {
  background: #3a3a3a;
  color: white;
  border: 1px solid #555;
  padding: 8px;
  border-radius: 4px;
}

.studio-statusbar {
  display: flex;
  justify-content: space-between;
  padding: 8px 16px;
  background: #2a2a2a;
  border-top: 1px solid #444;
  font-size: 12px;
  color: #aaa;
}
</style>

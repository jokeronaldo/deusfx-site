<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useLayoutStore } from '@/stores/layout'

layoutStore.bodyStyle = {
  backgroundBlendMode: 'normal',
  backgroundColor: 'white', //'#0d1a36', 6E0808
  //backgroundImage: `radial-gradient(195% 195% at 90% 10%, black 20%, transparent 100%)`,
}

const fezi = ref()
console.log(fezi)

onMounted(() => {
  // Prose blocks are defined at @/views/blocks/proses.ts
  layoutStore.proseBlock = 'ProseEMachinaBlock'

  fezi.value.setIcons(icons)
  // initial equal weights
  fezi.value.setWeights([0.5, 0.3, 0.2])

  // animate to a new weight over 1000ms
  setTimeout(() => fezi.value.blendTo([0.0, 1.0, 0.0], 1000), 500)
})

const icons = [
  // Icon 1 (6 shapes)
  {
    shapes: [
      { shape: 'square', x: 5, y: 5, width: 20, height: 20, stroke: '#ff4d4f', strokeWidth: '2' },
      { shape: 'square', x: 30, y: 5, width: 20, height: 20, stroke: '#ff7a45', strokeWidth: '2' },
      { shape: 'square', x: 55, y: 5, width: 20, height: 20, stroke: '#ffd666', strokeWidth: '2' },
      { shape: 'square', x: 5, y: 30, width: 20, height: 20, stroke: '#73d13d', strokeWidth: '2' },
      { shape: 'square', x: 30, y: 30, width: 20, height: 20, stroke: '#40a9ff', strokeWidth: '2' },
      { shape: 'square', x: 55, y: 30, width: 20, height: 20, stroke: '#9254de', strokeWidth: '2' },
    ],
  },

  // Icon 2 (9 shapes)
  {
    shapes: [
      { shape: 'square', x: 5, y: 5, width: 12, height: 12, stroke: '#ff4d4f', strokeWidth: '1.5' },
      {
        shape: 'square',
        x: 20,
        y: 5,
        width: 12,
        height: 12,
        stroke: '#ff7a45',
        strokeWidth: '1.5',
      },
      {
        shape: 'square',
        x: 35,
        y: 5,
        width: 12,
        height: 12,
        stroke: '#ffd666',
        strokeWidth: '1.5',
      },

      {
        shape: 'square',
        x: 5,
        y: 20,
        width: 12,
        height: 12,
        stroke: '#73d13d',
        strokeWidth: '1.5',
      },
      {
        shape: 'square',
        x: 20,
        y: 20,
        width: 12,
        height: 12,
        stroke: '#40a9ff',
        strokeWidth: '1.5',
      },
      {
        shape: 'square',
        x: 35,
        y: 20,
        width: 12,
        height: 12,
        stroke: '#9254de',
        strokeWidth: '1.5',
      },

      {
        shape: 'square',
        x: 5,
        y: 35,
        width: 12,
        height: 12,
        stroke: '#ff85c0',
        strokeWidth: '1.5',
      },
      {
        shape: 'square',
        x: 20,
        y: 35,
        width: 12,
        height: 12,
        stroke: '#bfbfbf',
        strokeWidth: '1.5',
      },
      {
        shape: 'square',
        x: 35,
        y: 35,
        width: 12,
        height: 12,
        stroke: '#69c0ff',
        strokeWidth: '1.5',
      },
    ],
  },

  // Icon 3 - another variant
  {
    shapes: [
      { shape: 'triangle', x: 10, y: 10, width: 30, height: 30, stroke: '#fff', strokeWidth: '2' },
      { shape: 'circle', x: 50, y: 50, width: 30, height: 30, stroke: '#0ff', strokeWidth: '2' },
    ],
  },
]
</script>

<template>
  <div class="machina-page">aaa <dfx-icon-blend ref="fezi" class="fezes"></dfx-icon-blend></div>
  <br />
  <br />
  <br />
  <div>
    <dfx-alert />
    <!--
    <dfx-accordion />
    <dfx-alert />
    <dfx-badge />
    <dfx-banner />
    <dfx-blockquote />
    <dfx-bottom-navigation />
    <dfx-breadcrumb />
    <dfx-buttons />
    <dfx-button-group />
    <dfx-carousel />
    <dfx-chat-bubble />
    <dfx-checkbox />
    <dfx-clipboard />
    <dfx-datepicker />
    <dfx-dropdown />
    <dfx-fileinput />
    <dfx-floatinglabel />
    <dfx-footer />
    <dfx-forms />
    <dfx-gallery />
    <dfx-headings />
    <dfx-hr />
    <dfx-image />
    <dfx-indicators />
    <dfx-inputfield />
    <dfx-jumbotron />
    <dfx-links />
    <dfx-listgroup />
    <dfx-lists />
    <dfx-megamenu />
    <dfx-modal />
    <dfx-navbar />
    <dfx-numberinput />
    <dfx-pagination />
    <dfx-paragraphs />
    <dfx-phoneinput />
    <dfx-progress />
    <dfx-radio />
    <dfx-rating />
    <dfx-searchinput />
    <dfx-select />
    <dfx-sidebar />
    <dfx-skeleton />
    <dfx-speeddial />
    <dfx-spinner />
    <dfx-stepper />
    <dfx-tables />
    <dfx-tabs />
    <dfx-text />
    <dfx-textarea />
    <dfx-timeline />
    <dfx-tables />
    <dfx-timepicker />
    <dfx-toast />
    -->
  </div>
</template>

<style>
@layer layour-content {
  .machina-page {
    color: white;
  }
}
</style>

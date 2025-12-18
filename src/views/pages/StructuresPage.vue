<script setup lang="ts">
import { onMounted } from 'vue'
import { useLayoutStore } from '@/stores/layout'

const layoutStore = useLayoutStore()

layoutStore.bodyStyle = {
  backgroundBlendMode: 'normal',
  backgroundColor: 'white', //'#0d1a36', 6E0808
  //backgroundImage: `radial-gradient(195% 195% at 90% 10%, black 20%, transparent 100%)`,
}

//black

onMounted(() => {
  // Prose blocks are defined at @/views/blocks/proses.ts
  //layoutStore.proseBlock = 'ProseStructuresBlock'
})
</script>

<template>
  <div class="structures-page">
    <div>
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
    </div>
  </div>
</template>

<style>
@layer layour-content {
  .structures-page {
    color: white;
  }
}
</style>

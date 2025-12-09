<script setup lang="ts">
import { useLayoutStore } from '@/stores/layout'

const layoutStore = useLayoutStore()

layoutStore.bodyStyle = {
  backgroundBlendMode: 'multiply',
  backgroundColor: '#0d1a36', //'#0d1a36',
  backgroundImage: `radial-gradient(125% 125% at 50% 10%, black 40%, transparent 100%)`,
}

//'#0d1a36'

layoutStore.proseBlock = 'ProseGuideBlock'
</script>

<template>
  <div class="guide-page" v-page-body-style>
    <dfx-container> Intro </dfx-container>
  </div>
</template>

<style>
@layer layour-content {
  .guide-page {
    color: white;
  }
}
</style>

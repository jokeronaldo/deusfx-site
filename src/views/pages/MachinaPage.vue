<script setup lang="ts">
import { onMounted } from 'vue'
import { useLayoutStore } from '@/stores/layout'

const layoutStore = useLayoutStore()

onMounted(() => {
  // Prose blocks are defined at @/views/blocks/proses.ts
  layoutStore.proseBlock = 'ProseEMachinaBlock'
})
</script>

<template>
  <div class="machina-page">aaa</div>
</template>

<style>
@layer layour-content {
  .machina-page {
    color: white;
  }
}
</style>

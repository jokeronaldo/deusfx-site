<script setup lang="ts">
import { onMounted } from 'vue'
import { useLayoutStore } from '@/stores/layout'

const layoutStore = useLayoutStore()

layoutStore.proseBlock = 'ProseStructuresBlock'

//black

onMounted(() => {
  // Prose blocks are defined at @/views/blocks/proses.ts
  //layoutStore.proseBlock = 'ProseStructuresBlock'
})
</script>

<template>
  <div class="structures-page">aaa</div>
</template>

<style>
@layer layour-content {
  .structures-page {
    color: white;
  }
}
</style>

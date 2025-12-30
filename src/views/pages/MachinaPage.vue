<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useLayoutStore } from '@/stores/layout'

const layoutStore = useLayoutStore()

layoutStore.proseBlock = 'ProseMaterialsBlock'

layoutStore.bodyStyle = {
  backgroundBlendMode: 'color-dodge, overlay',
  backgroundColor: 'purple', //'#0d1a36'
  backgroundImage: `url('../../../public/bg-lines-01.svg'), radial-gradient(100% 125% at 50% 110%, rgba(0, 0, 255, 0.0) 40%, transparent 100%)`,
}

const mat = ref('glassmorphism')

const materialsx = [
  'aqua',
  'bash',
  'glassmorphism',
  'mosaic',
  'neumorphism',
  'paper',
  'plastic',
  'pocket',
  'visor',
  'tangerine',
]

onMounted(() => {
  // Prose blocks are defined at @/views/blocks/proses.ts
  //layoutStore.proseBlock = 'ProseMaterialsBlock'
})
</script>

<template>
  <div class="material-page p-4" v-page-body-style>
    <dfx-card :material="mat" class="p-4">
      <div class="p-8">
        <dfx-button :material="mat" size="lg">Heelo</dfx-button>
      </div>
      <div class="flex flex-row w-full p-4">
        <dfx-card :material="mat" height="300px" class="w-[40%]"> large </dfx-card>
        <dfx-card :material="mat" height="300px" class="w-[20%]">
          <dfx-card :material="mat" height="300px" class=""> large </dfx-card>
        </dfx-card>
        <dfx-card :material="mat" height="300px" class="w-[10%]"> large </dfx-card>
        <dfx-card material="glassmorphism" height="100px" class="">
          <div class="p-8">
            <dfx-avatar material="glassmorphism">{{ mat }}</dfx-avatar>
          </div>
        </dfx-card>
        <dfx-avatar :material="mat">{{ mat }}</dfx-avatar>
      </div>
      <div class="flex flex-wrap w-full">
        <dfx-avatar v-for="mt in materialsx" :material="mt" @click="mat = mt">{{ mt }}</dfx-avatar>
        <dfx-avatar v-for="mt in materialsx" :material="mt" @click="mat = mt">{{ mt }}</dfx-avatar>
      </div>
    </dfx-card>
  </div>
</template>

<style>
@layer layour-content {
  .material-page {
    color: #333;
  }
}
</style>

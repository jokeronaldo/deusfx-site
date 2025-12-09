<script setup lang="ts">
import { animate } from 'motion'
import { onMounted } from 'vue'
import 'deusfx/src/components/dfx-card.ts'
import { ref } from 'vue'

onMounted(() => {
  console.log(3243)
})

const cheiroDeFezes = (val) => {
  console.log(val)
}
</script>

<template>
  <div
    class="layout-block flex w-full"
    :animate="{
      scale: v,
      transition: { duration: 2 },
    }"
  >
    <motion.div
      class="layout-block talking-content"
      :transition="{ type: 'spring', stiffness: 100 }"
      style="transition: width width 0.3s ease-in-out"
    >
      <slot name="talking-content" />
    </motion.div>
    <main class="layout-block">
      <RouterView>
        <slot name="content" />
      </RouterView>
    </main>
    <div class="layout-block w-[100px]">
      <dfx-card
        class="flex h-full w-[100px] items-center"
        color-scheme="dark"
        height="100%"
        material="glassmorphism"
      >
        <dfx-button
          class="size-[width: 64px; height: 64px]"
          icon
          material="none"
          size="xl"
          @click="cheiroDeFezes(9999)"
        >
          <img class="w-[64px]" src="../../../public/icon-cone.svg" />
        </dfx-button>
        <dfx-button
          class="size-[width: 64px; height: 64px]"
          icon
          material="none"
          size="xl"
          @click="cheiroDeFezes(9999)"
        >
          <img class="w-[64px]" src="../../../public/icon-cube.svg" />
        </dfx-button>
        <dfx-button
          class="size-[width: 64px; height: 64px]"
          icon
          material="none"
          size="xl"
          @click="cheiroDeFezes(9999)"
        >
          <img class="w-[64px]" src="../../../public/icon-cylinder.svg" />
        </dfx-button>
        <dfx-button
          class="size-[width: 64px; height: 64px]"
          icon
          material="none"
          size="xl"
          @click="cheiroDeFezes(9999)"
        >
          <img class="w-[64px]" src="../../../public/icon-blunted.svg" />
        </dfx-button>
      </dfx-card>
    </div>
  </div>
</template>

<style>
.talking-content {
  background-color: green;
  min-width: var(--layout-talking-content-width);
  transition: all 1s ease-in-out;
}
</style>

<script setup lang="ts">
import { onMounted, shallowRef } from 'vue'
import { RouterView, useRoute, useRouter } from 'vue-router'
import layouts from '@/views/layouts/layouts'
import { useLayoutStore } from '@/stores/layout'

const layout = shallowRef('div')

// Composables
const layoutStore = useLayoutStore()
const route = useRoute()
const router = useRouter()

// Route
router.afterEach((to) => {
  if (to.name === route.name) {
    //layout.value = layouts[to?.meta?.layout]
  }
  layout.value = layouts[to?.meta?.layout]
})

// Hooks
onMounted(() => {
  if (!layoutStore.template) {
    layoutStore.template = 'LayoutDefault'
  }
})
</script>

<template>
  <component :is="layout || 'div'">
    <router-view v-slot="{ Component }">
      <keep-alive :exclude="['MaterialsPage']">
        <component :is="Component || 'div'"></component>
      </keep-alive>
    </router-view>
  </component>
</template>

<style>
html,
body,
#app {
  display: grid;
  grid-template-columns: 12fr;
  grid-template-rows: auto;
  grid-auto-rows: auto;
}

body {
  background-size: cover;
  -background-image: url('../public/bg-02.jpg');
  -background-image: url('../public/bg-a02.jpg');
}
</style>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useComponentStore } from '@/stores/component'

const router = useRouter()
const componentStore = useComponentStore()

const categories = computed(() => {
  return componentStore.components.map((category) => {
    return {
      ...category,
      icons: { prepend: category.icon },
    }
  })
})

const fezes = () => {
  componentStore.categories.push({
    icon: 'dfx-fmw-vue',
    id: 'dynamo',
    title: 'BOLAS',
  })
}
</script>

<template>
  <div class="flex justify-evenly about">
    <!--<dfx-dashboard />-->
    <dfx-list2
      @dfx-list-item-click="
        (event) => {
          router.push({ name: event.detail.routeName })
        }
      "
      colorize
      dividers
      :items="categories"
    >
      <template id="icon-prepend" .ctx="componentStore.categories">
        <dfx-icon
          :grid="{
            rows: 3,
            columns: 3,
            slotHeight: '8px',
            slotWidth: '8px',
          }"
          icon="item.icon"
          :shapesOverride="{
            strokeColor: 'white',
          }"
        ></dfx-icon>
      </template>
    </dfx-list2>
    <button @click="fezes">fezes</button>
    <machina-app> </machina-app>
  </div>
</template>

<style>
body {
  background-color: gray !important;
}
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>

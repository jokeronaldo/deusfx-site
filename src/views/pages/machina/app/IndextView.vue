<script setup lang="ts">
import { computed, ref } from 'vue'
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

const addItem = () => {
  componentStore.components.push({
    category: 'whatever',
    icon: 'dfx-fmw-vue',
    id: 'dynamo',
    title: 'BOLAS',
  })

  console.log(categories)
}

const listSwitch = () => {
  orientation.value = orientation.value !== 'horizontal' ? 'horizontal' : 'vertical'
}

const orientation = ref()
const open = ref(false)
const listd = ref()
console.log(JSON.stringify(this))

//setTimeout(() => {
//  componentStore.components[2].icon = 'dfx-cmp-navigation'
//  console.log('mudar')
//}, 5000)
const switchx = ref(false)
</script>

<template>
  <div class="flex justify-evenly about">
    <!-- Para Vue 3 com Custom Elements -->
    {{ switchx }}
    <dfx-overlay :is-active="switchx"> fezes humanas</dfx-overlay>
    <div class="p-2">
      <dfx-radio size="md" />
    </div>
    <div class="p-2">
      <dfx-switch size="md" :is-active="switchx"></dfx-switch>
    </div>
    <div class="p-2">
      <dfx-checkbox />
    </div>
    <dfx-button variant="duo-tone" @click="listSwitch()">switch {{ orientation }}</dfx-button>
    <dfx-list
      selectable
      :orientation="orientation"
      .items="[
        {
          title: 'ola',
          id: 'ola',
        },
        {
          title: 'genebra',
          id: 'cas',
        },
        {
          title: 'tesla',
          id: 'tucs',
        },
        {
          title: 'quas',
          id: 'ola',
        },
      ]"
    ></dfx-list>
    <dfx-list .items="categories" selectable ref="listd"></dfx-list>

    <dfx-button variant="deus" @click="addItem">NOVO</dfx-button>
    <dfx-button variant="deus" @click="componentStore.removeItem(listd)">REMOVE</dfx-button>
    <dfx-button variant="deus" @click="listd?.reset()">RESET</dfx-button>
  </div>
</template>

<style>
body {
  background-color: black !important;
}
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>

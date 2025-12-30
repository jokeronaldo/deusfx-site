<template>
  <div class="layout-prose-components">
    <dfx-card
      border-radius="0"
      color-scheme="light"
      height="100%"
      material="glassmorphism"
      style="
        --dfx-mode: 'down';
        --dfx-intensity: 0.01;
        --dfx-blur: 0;
        --dfx-distance: 2;
        --dfx-glassmorphism-blur: 0px;
        --dfx-glassmorphism-depth: 0px;
        --dfx-glassmorphism-background: rgba(255, 255, 255, 0);
      "
    >
      <div class="flex flex-col h-screen --r--items-center xxx">
        <div class="sticky top-0 left w-full z-10">
          <div class="pb-2 pt-4 px-3" style="box-shadow: 0px 5px 20px 0px rgba(0, 0, 0, 0.1)">
            <router-link :to="{ name: 'Home' }">
              <DeusFxLogo color="blue" colorDeus="white" invertedColor="white" width="100px" />
            </router-link>
          </div>
          <div class="mt-5">
            <h3
              class="mb-1 text-3xl text-white/90 text-center font-[Inter] font-thin special-title"
            >
              web <strong class="font-semibold">components</strong>
            </h3>
            <div class="flex justify-center w-full">
              <dfx-shape-line-printer
                v-for="(shape, index) in 8"
                :key="index"
                opacity="0.2"
                :blend-mode="['color-dodge', 'overlay', 'plus-lighter', 'lighten']"
                stroke-width="5px"
                width="32px"
              />
            </div>
          </div>
        </div>
        <div class="grow option-items items-center justify-center my-8 px-4">
          <div
            v-for="(category, index) in componentStore.components"
            :key="index"
            class="flex flex-col justify-center items-center option-item"
          >
            <dfx-button
              color="black"
              colorize="true"
              secondaryColor="blue"
              size="lg"
              variant="link"
              icona
              :ref="`button${category.id}ref`"
              :_id="category.id"
              @item-click="(event) => selectCategory(event, category)"
              @_id-assigned="initialCategory"
            >
              <dfx-geometric-icon
                :icon="category.icon"
                :shapesOverride="{
                  strokeColor: 'white',
                  strokeWidth: '1px',
                  opacity: [0.7, 0.8, 0.9, 1],
                  fillColor: ['rgba(255, 255, 255, 0.05)', 'rgba(255, 255, 255, 0.1)'],
                }"
              />
            </dfx-button>
            <div class="font-thin text-sm text-white" v-html="category.title" />
          </div>
        </div>
        <div class="flex justify-center mb-4 pb-8">
          <dfx-shapeshifter v-for="(shape, index) in 5" :key="index" width="32px" />
        </div>
      </div>
    </dfx-card>
  </div>
</template>

<style>
@layer layout-prose {
  .layout-default:has(.layout-prose-components) {
    --layout-default-prose-width: 4fr;
  }
}

.xxx {
  background-image:
    repeating-linear-gradient(
      0deg,
      rgba(255, 255, 255, 0.05) 0px,
      rgba(255, 255, 255, 0.05) 1px,
      transparent 1px,
      transparent 20px
    ),
    repeating-linear-gradient(
      90deg,
      rgba(255, 255, 255, 0.05) 0px,
      rgba(255, 255, 255, 0.05) 1px,
      transparent 1px,
      transparent 20px
    );
}

.option-items {
  align-content: center;
  justify-content: center;
  display: grid;
  -gap: 20px;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto;
  grid-auto-rows: auto;
  row-gap: 30px;
}

.xxx {
  position: relative;
  background-position: center;
  background-size: 60%;
  todo-background-blend-mode: overlay;
  z-index: 1;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: 60%;
    background-image: url('../../../public/abg-arch.svg');
    z-index: -1;
    opacity: 0.5;
    -mask-image: linear-gradient(to right, black 80%, rgba(0, 0, 0, 0.1) 100%);
  }
}
</style>

<script setup lang="ts">
import { onMounted } from 'vue'
import DeusFxLogo from '@/components/DeusFxLogo.vue'
import { useComponentStore } from '@/stores/component'

const selectCategory = (event, category) => {
  componentStore.active.category.value = category.title
  componentStore.active.category.icon = category.icon
  const buttons = document.querySelectorAll('dfx-button')

  buttons.forEach((button) => {
    if (button.id !== event.target.id) {
      button.inactivate()
    }
  })
}

const componentStore = useComponentStore()

const initialCategory = (event) => {
  if (event.target.id === 'Layout') {
    event.target.click()
  }
}
</script>

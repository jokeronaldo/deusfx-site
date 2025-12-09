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
        <div class="pb-2 pt-4 px-3" style="box-shadow: 0px 5px 20px 0px rgba(0, 0, 0, 0.1)">
          <router-link to="./">
            <DeusFxLogo color="blue" colorDeus="white" invertedColor="white" width="100px" />
          </router-link>
        </div>
        <div class="mt-5">
          <h3 class="mb-1 text-3xl text-white/90 text-center font-thin">
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
        <div class="grow option-items items-center justify-center px-4">
          <div
            v-for="(option, index) in opt"
            :key="index"
            class="flex flex-col justify-center items-center option-item"
          >
            <dfx-button color="black" secondaryColor="blue" size="lg" icon phantom>
              <dfx-geometric-icon
                :icon="option.icon"
                :grid="{
                  slotWidth: '5px',
                  slotHeight: '5px',
                }"
                :shapesOverride="{
                  strokeColor: 'white',
                  strokeWidth: '1px',
                  opacity: ['0.7', 0.9],
                  fillColor: ['rgba(255, 255, 255, 0.05)', 'rgba(255, 255, 255, 0.2)'],
                }"
              />
              <!--
              <dfx-shape-line-icon :icon="option.icon" :color="['lightblue']">
                <dfx-geometric-grid-svg />
              </dfx-shape-line-icon>
              -->
            </dfx-button>
            <div class="font-thin text-lg text-white" v-html="option.title" />
          </div>
        </div>
        <div class="flex justify-center mb-4">
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
      rgba(255, 255, 255, 0.04) 0px,
      rgba(255, 255, 255, 0.04) 1px,
      transparent 1px,
      transparent 20px
    ),
    repeating-linear-gradient(
      90deg,
      rgba(255, 255, 255, 0.04) 0px,
      rgba(255, 255, 255, 0.04) 1px,
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
import DeusFxLogo from '@/components/DeusFxLogo.vue'
import DeusFxAlpha from '@/components/DeusFxAlpha.vue'
import OptionItem from '@/components/OptionItem.vue'
import { injectMaterial } from 'deusfx/src/utils/dfx-util-css'

injectMaterial('bash')

const opt = [
  {
    title: 'basics',
    icon: 'dfx-cmp-basics',
  },
  {
    title: 'feedback',
    icon: 'dfx-cmp-feedback',
  },
  {
    title: 'data',
    icon: 'dfx-cmp-data',
  },
  {
    title: 'contents',
    icon: 'dfx-cmp-contents',
  },
  {
    title: 'Layout',
    icon: 'dfx-cmp-layout',
  },
  {
    title: 'forms',
    icon: 'dfx-cmp-forms',
  },
  {
    title: 'editors',
    icon: 'dfx-cmp-editors',
  },
  {
    title: 'overlay',
    icon: 'dfx-cmp-overlay',
  },
  {
    title: 'navigation',
    icon: 'dfx-cmp-navigation',
  },
]
</script>

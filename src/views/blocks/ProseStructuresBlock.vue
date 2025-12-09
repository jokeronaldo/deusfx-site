<script setup lang="ts">
import DeusFxLogo from '@/components/DeusFxLogo.vue'
</script>

<template>
  <div class="h-full layout-prose-materials w-full">
    <dfx-card
      border-radius="0"
      color-scheme="light"
      height="100%"
      material="glassmorphism"
      style="--dfx-glassmorphism-blur: 2px"
    >
      <div class="flex flex-col grow h-full justify-between">
        <div class="pl-2 pt-4">
          <router-link to="./">
            <DeusFxLogo color-deus="blue" width="100px" />
          </router-link>
        </div>
        <div class="flex flex-col grow h-full">
          <div class="flex flex-col items-center p-10">
            <div>
              <h3
                class="mb-1 text-3xl text-blue-700 text-center font-light opacity-90"
                style="acolor: lime"
              >
                structur<strong class="font-semibold">es</strong>
              </h3>
              <div class="flex justify-center w-full">
                <dfx-shape-line-printer
                  v-for="(shape, index) in 8"
                  :key="index"
                  :shapeColors="['red', 'blue']"
                  color="#1447e6"
                  width="32px"
                />
              </div>
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </dfx-card>
  </div>
</template>

<style>
@layer layout-prose {
  .layout-default:has(.layout-prose-structures) {
    --layout-default-prose-width: 3fr;
  }
}
</style>

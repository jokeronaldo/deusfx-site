<script setup lang="ts">
interface Props {
  description?: string
  icon?: string
  label?: string
  url?: string
  width?: string
}

const { description = '', icon = '', label = '', url = '', width = '64px' } = defineProps<Props>()
</script>

<template>
  <dfx-card material="bash" style="--dfx-material-bash-text-color: oklch(80.9% 0.105 251.813)">
    <div class="p-2 font-light">
      <div><img :src="icon" width="32" /></div>
      <div>{{ label }}</div>
    </div>
  </dfx-card>
</template>

<style scoped></style>

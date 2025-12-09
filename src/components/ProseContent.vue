<script setup lang="ts">
interface Props {
  contentWidth?: string
  colorDeus?: string
  title?: string
  width?: string
}

const { color = '', colorDeus = '', title = '', width = '64px' } = defineProps<Props>()

let titleFirstPiece = title
let titleSecondPiece = ''

if (title && title.length > 2) {
  titleFirstPiece = title.substr(0, title.length - 2)
  titleSecondPiece = title.substr(-2)
}
</script>

<template>
  <div class="items-center prose-content p-10">
    <div>
      <h3 class="mb-1 text-3xl text-white/90 text-center font-thin">
        ${titleFirstPiece}<strong class="font-semibold">${titleSecondPiece}</strong>
      </h3>
    </div>
    <div class="w-[200px]">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.prose-content {
  todo-background-blend-mode: overlay;
  background-position: center;
  background-size: 60%;
  position: relative;
  z-index: 1;

  &::before {
    background-size: 60%;
    background-image: url('../../../public/bg-arch.svg');
    content: '';
    height: 100%;
    left: 0;
    todo-mask-image: radial-gradient(125% 125% at 50% 40%, white, transparent 40%);
    todo-mix-blend-mode: color-dodge;
    opacity: 1;
    position: absolute;
    top: 0;
    width: 100%;
    z-index: -1;
  }
}
</style>

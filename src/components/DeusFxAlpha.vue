<script setup lang="ts">
interface Props {
  color?: string
  colorDeus?: string
  width?: string
}

const { color = '', colorDeus = '', width = '64px' } = defineProps<Props>()
</script>

<template>
  <div
    class="deusfx-alpha"
    :class="{ 'deusfx-logo-color-deus': colorDeus !== '', 'deusfx-logo-colored': color !== '' }"
    :style="{ width: width }"
  >
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 400" xmlns:bx="https://boxy-svg.com">
      <path
        d="M 788.731 104.886 C 788.731 203.496 788.731 283.434 788.731 283.434 C 690.121 283.434 610.18 203.496 610.18 104.886 C 610.18 6.274 690.121 -73.664 788.731 -73.664 C 788.731 -73.664 788.731 6.274 788.731 104.886 Z"
        style="stroke-width: 1; fill: rgb(255, 255, 255); transform-origin: 699.456px 104.885px"
        transform="matrix(0.410121, 0.912031, -0.912031, 0.410121, 0.000003, -0.000036)"
      >
        <title>S top - white</title>
      </path>
      <path
        d="M 796.823 297.023 C 796.823 198.411 796.823 118.471 796.823 118.471 C 698.207 118.471 618.27 198.411 618.27 297.023 C 618.27 395.635 698.207 475.576 796.823 475.576 C 796.823 475.576 796.823 395.635 796.823 297.023 Z"
        style="stroke-width: 1; fill: rgb(119, 119, 119); transform-origin: 707.549px 297.023px"
        transform="matrix(-0.410121, -0.912031, 0.912031, -0.410121, 0.000026, -0.000002)"
      >
        <title>S bottom - gray</title>
      </path>
      <rect
        width="396.517"
        height="200"
        style="
          stroke: rgb(0, 0, 0);
          stroke-width: 1;
          fill: rgb(119, 119, 119);
          transform-box: fill-box;
          transform-origin: 50% 50%;
        "
        x="-196.52"
        y="659.656"
        transform="matrix(0, 1, -1, 0, 198.2612, -557.91452)"
      >
        <title>T - bottom gray</title>
      </rect>
      <path
        d="M -282.83 0 L 0.013 282.843 L -282.83 282.843 L -282.83 0 Z"
        bx:shape="triangle -282.83 0 282.843 282.843 0 0 1@6bea1428"
        style="
          stroke: rgb(0, 0, 0);
          transform-box: fill-box;
          transform-origin: 50% 50%;
          fill: rgb(255, 255, 255);
        "
        transform="matrix(-0.707107, -0.707107, -0.707107, 0.707107, 341.40492, -141.424905)"
      >
        <title>T top white</title>
      </path>
    </svg>
  </div>
</template>

<style scoped>
.deusfx-alpha {
  display: inline-flex;

  &.deusfx-logo-color-deus {
    fill: v-bind(colorDeus) !important;
  }

  &.deusfx-logo-colored {
    path {
      fill: v-bind(color) !important;

      &.deusfx-logo-inner-inverted {
        filter: invert(1);
      }
    }
  }
}
</style>

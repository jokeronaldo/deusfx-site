<script setup lang="ts">
import DeusFxLogo from '@/components/DeusFxLogo.vue'
</script>

<template>
  <div class="layout-prose-deusfx">
    <div class="flex flex-col justify-between h-full">
      <div class="pl-2 pt-4">
        <DeusFxLogo width="100px" />
      </div>
      <div class="flex flex-col items-center justify-center mt-28">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            width="370"
            height="370"
            xmlns:bx="https://boxy-svg.com"
            class="dfx-logo"
          >
            <ellipse
              style="
                stroke: rgb(138, 43, 226);
                fill: none;
                stroke-miterlimit: 1.4;
                vector-effect: non-scaling-stroke;
              "
              cx="50.405"
              cy="50.207"
              rx="47.745"
              ry="47.943"
            />
            <rect
              width="48.043"
              height="95.858"
              style="
                stroke: rgb(138, 43, 226);
                fill: none;
                stroke-miterlimit: 1.4;
                vector-effect: non-scaling-stroke;
              "
              x="2.542"
              y="2.265"
            />
            <path
              d="M 62.627 30.228 L 81.612 49.213 L 62.627 49.213 L 62.627 30.228 Z"
              bx:shape="triangle 62.627 30.228 18.985 18.985 0 0 1@30818f37"
              style="
                stroke: rgb(138, 43, 226);
                fill: none;
                stroke-miterlimit: 1.4;
                vector-effect: non-scaling-stroke;
                transform-origin: 72.12px 39.721px;
              "
              transform="matrix(0.707107, -0.707107, 0.707107, 0.707107, -0.936619, -3.646382)"
            />
            <path
              d="M -62.626 -30.228 L -43.641 -11.243 L -62.626 -11.243 L -62.626 -30.228 Z"
              bx:shape="triangle -62.626 -30.228 18.985 18.985 0 0 1@ed4e42fb"
              style="
                stroke: rgb(138, 43, 226);
                fill: none;
                stroke-miterlimit: 1.4;
                vector-effect: non-scaling-stroke;
                transform-origin: -53.135px -20.737px;
              "
              transform="matrix(0.707107, 0.707107, 0.707107, -0.707107, 124.331275, 83.659233)"
            />
            <path
              d="M 15.629 -62.903 L 42.461 -36.071 L 15.629 -36.071 L 15.629 -62.903 Z"
              bx:shape="triangle 15.629 -62.903 26.832 26.832 0 0 1@2fdc79f2"
              style="
                stroke: rgb(138, 43, 226);
                fill: none;
                stroke-miterlimit: 1.4;
                vector-effect: non-scaling-stroke;
              "
              transform="matrix(1, 0, 0, -1, 0, 0)"
            />
            <path
              d="M -38.24 45.443 L -24.793 58.89 L -38.24 58.89 L -38.24 45.443 Z"
              bx:shape="triangle -38.24 45.443 13.447 13.447 0 0 1@06fafb0a"
              style="
                stroke: rgb(138, 43, 226);
                fill: none;
                stroke-miterlimit: 1.4;
                vector-effect: non-scaling-stroke;
                transform-origin: -31.517px 52.167px;
              "
              transform="matrix(-1, 0, 0, 1, 63.033939, 0)"
            />
          </svg>
          <div class="flex">
            <div class="ml-2 mr-1 self-start font-light text-a4xl">Firmame<strong>nt</strong></div>
            <div class="bg-black/20 px-2 py-1 rounded text-xs">0.8.3</div>
          </div>
        </div>
      </div>
      <div style="max-height: 1px"></div>
      <div class="flex justify-center mb-4" v-if="false">
        <div class="flex justify-center mr-1 text-blue-700">auth<strong>or</strong></div>
        |
        <div class="flex justify-center ml-1 text-blue-700">te<strong>am</strong></div>
      </div>
    </div>
  </div>
</template>

<style>
@layer layout-prose {
  .layout-default {
    --layout-default-prose-width: 4fr;
  }
}
</style>

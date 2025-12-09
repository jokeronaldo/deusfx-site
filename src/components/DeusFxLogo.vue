<script setup lang="ts">
interface Props {
  color?: string
  colorDeus?: string
  fullColor?: boolean
  invertedColor?: string
  outlineDeusColor?: string
  width?: string
}

const {
  color = '',
  colorDeus = '',
  fullColor = false,
  invertedColor = 'purple',
  outlineDeusColor = '',
  width = '200px',
} = defineProps<Props>()
</script>

<template>
  <div
    v-if="!fullColor"
    class="deusfx-logo"
    :class="{ 'deusfx-logo-colored': color !== '', 'deusfx-logo-color-deus': colorDeus !== '' }"
    :style="{ width: width }"
  >
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 90" xmlns:bx="https://boxy-svg.com">
      <g
        transform="matrix(0.924908, 0, 0, 0.924908, 108.60524, -1.443771)"
        style="paint-order: fill"
      >
        <path
          d="M -70.701 -34.125 L -49.267 -12.691 L -70.701 -12.691 L -70.701 -34.125 Z"
          bx:shape="triangle -70.701 -34.125 21.434 21.434 0 0 1@02a01b73"
          style="
            stroke-miterlimit: 1.4;
            vector-effect: non-scaling-stroke;
            fill: url('#gradient-4');
            transform-origin: -59.986px -23.411px;
          "
          transform="matrix(0.707107, 0.707107, 0.707107, -0.707107, 121.468539, 80.664369)"
        />
        <path
          d="M 1.508 -98.868 L 98.815 -1.561 L 1.508 -1.561 L 1.508 -98.868 Z"
          bx:shape="triangle 1.508 -98.868 97.307 97.307 0 0 1@76040b17"
          style="
            stroke-miterlimit: 1.4;
            vector-effect: non-scaling-stroke;
            stroke-width: 1;
            fill: url('#gradient-2');
          "
          transform="matrix(1, 0, 0, -1, 0, 0)"
        />
        <path
          d="M 12.44 -57.23 L 42.73 -26.94 L 12.44 -26.94 L 12.44 -57.23 Z"
          bx:shape="triangle 12.44 -57.23 30.29 30.29 0 0 1@b7292fa6"
          :class="`deusfx-logo-inner-inverted${invertedColor ? '-custom' : ''}`"
          style="
            stroke-miterlimit: 1.4;
            vector-effect: non-scaling-stroke;
            stroke-width: 1;
            fill: url('#gradient-0');
            paint-order: fill;
          "
          transform="matrix(1, 0, 0, -1, 0, 0)"
        />
        <path
          d="M -37.969 37.519 L -22.786 52.702 L -37.969 52.702 L -37.969 37.519 Z"
          bx:shape="triangle -37.969 37.519 15.183 15.183 0 0 1@d743e195"
          :class="`deusfx-logo-inner-inverted${invertedColor ? '-custom' : ''}`"
          style="
            stroke-miterlimit: 1.4;
            vector-effect: non-scaling-stroke;
            stroke-width: 1;
            fill: url('#gradient-1');
            transform-origin: -30.378px 45.111px;
          "
          transform="matrix(-1, 0, 0, 1, 60.755924, 0)"
        />
        <path
          d="M 70.701 34.125 L 92.135 55.559 L 70.701 55.559 L 70.701 34.125 Z"
          bx:shape="triangle 70.701 34.125 21.434 21.434 0 0 1@09ccc38d"
          :class="`deusfx-logo-inner-inverted${invertedColor ? '-custom' : ''}`"
          style="
            stroke-miterlimit: 1.4;
            vector-effect: non-scaling-stroke;
            fill: url('#gradient-3');
            transform-origin: 81.418px 44.842px;
          "
          transform="matrix(0.707107, -0.707107, 0.707107, 0.707107, -23.19409, -17.898834)"
        />
      </g>
      <path
        d="M 11.516 51.791 Q 8.766 51.791 6.542 50.362 Q 4.318 48.934 3.029 46.173 Q 1.74 43.412 1.74 39.416 Q 1.74 35.313 3.072 32.563 Q 4.404 29.813 6.617 28.438 Q 8.83 27.063 11.494 27.063 Q 13.535 27.063 14.889 27.75 Q 16.242 28.438 17.08 29.447 Q 17.918 30.457 18.326 31.403 L 18.541 31.403 L 18.541 19.371 L 24.986 19.371 L 24.986 51.383 L 18.648 51.383 L 18.648 47.537 L 18.326 47.537 Q 17.896 48.504 17.048 49.482 Q 16.199 50.459 14.846 51.125 Q 13.492 51.791 11.516 51.791 Z M 13.514 46.613 Q 15.146 46.613 16.307 45.711 Q 17.467 44.809 18.068 43.187 Q 18.67 41.565 18.67 39.395 Q 18.67 37.203 18.079 35.603 Q 17.488 34.002 16.328 33.111 Q 15.168 32.219 13.514 32.219 Q 11.816 32.219 10.667 33.143 Q 9.518 34.067 8.938 35.678 Q 8.357 37.289 8.357 39.395 Q 8.357 41.5 8.948 43.133 Q 9.539 44.766 10.688 45.69 Q 11.838 46.613 13.514 46.613 Z M 41.333 51.856 Q 37.659 51.856 34.995 50.352 Q 32.331 48.848 30.902 46.076 Q 29.474 43.305 29.474 39.502 Q 29.474 35.785 30.892 32.992 Q 32.31 30.199 34.909 28.631 Q 37.509 27.063 41.011 27.063 Q 43.374 27.063 45.415 27.815 Q 47.456 28.567 49.003 30.081 Q 50.55 31.596 51.42 33.873 Q 52.29 36.151 52.29 39.244 L 52.29 41.049 L 32.116 41.049 L 32.116 37.01 L 49.132 37.01 L 46.124 38.084 Q 46.124 36.215 45.555 34.829 Q 44.985 33.444 43.858 32.681 Q 42.73 31.918 41.075 31.918 Q 39.4 31.918 38.229 32.692 Q 37.058 33.465 36.456 34.786 Q 35.855 36.108 35.855 37.805 L 35.855 40.662 Q 35.855 42.746 36.553 44.164 Q 37.251 45.582 38.508 46.291 Q 39.765 47 41.441 47 Q 42.579 47 43.503 46.678 Q 44.427 46.356 45.082 45.722 Q 45.737 45.088 46.081 44.164 L 51.925 45.26 Q 51.345 47.237 49.905 48.73 Q 48.466 50.223 46.307 51.039 Q 44.148 51.856 41.333 51.856 Z M 64.958 51.684 Q 62.466 51.684 60.596 50.599 Q 58.727 49.514 57.707 47.484 Q 56.686 45.453 56.686 42.639 L 56.686 27.363 L 63.132 27.363 L 63.132 41.522 Q 63.132 43.756 64.292 45.024 Q 65.452 46.291 67.471 46.291 Q 68.846 46.291 69.899 45.7 Q 70.952 45.11 71.543 43.982 Q 72.134 42.854 72.134 41.264 L 72.134 27.363 L 78.6 27.363 L 78.6 51.383 L 72.499 51.383 L 72.413 45.389 L 72.778 45.389 Q 71.833 48.418 69.888 50.051 Q 67.944 51.684 64.958 51.684 Z M 93.62 51.856 Q 90.719 51.856 88.485 51.029 Q 86.25 50.201 84.832 48.622 Q 83.415 47.043 83.006 44.809 L 89 43.778 Q 89.473 45.453 90.655 46.291 Q 91.836 47.129 93.813 47.129 Q 95.661 47.129 96.724 46.431 Q 97.788 45.733 97.788 44.658 Q 97.788 43.713 97.025 43.112 Q 96.262 42.51 94.694 42.188 L 90.547 41.328 Q 87.067 40.619 85.348 38.911 Q 83.629 37.203 83.629 34.518 Q 83.629 32.197 84.897 30.532 Q 86.165 28.867 88.42 27.965 Q 90.676 27.063 93.727 27.063 Q 96.563 27.063 98.647 27.847 Q 100.731 28.631 102.02 30.07 Q 103.309 31.51 103.739 33.465 L 98.024 34.475 Q 97.659 33.25 96.617 32.466 Q 95.575 31.682 93.813 31.682 Q 92.223 31.682 91.149 32.348 Q 90.075 33.014 90.075 34.131 Q 90.075 35.033 90.773 35.656 Q 91.471 36.279 93.168 36.623 L 97.487 37.483 Q 100.967 38.192 102.665 39.792 Q 104.362 41.393 104.362 43.971 Q 104.362 46.334 102.987 48.107 Q 101.612 49.879 99.195 50.867 Q 96.778 51.856 93.62 51.856 Z"
        :class="{
          'deusfx-logo-color-deus': colorDeus ? true : false,
          'deusfx-logo-inner-inverted': !invertedColor,
        }"
        paint-order="fill"
        stroke-opacity="1"
        style="text-wrap-mode: nowrap"
      />

      <defs>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          x1="59.045"
          y1="-62.903"
          x2="59.045"
          y2="-36.071"
          id="gradient-0"
          spreadMethod="pad"
          gradientTransform="matrix(0.897849, 0.684355, -0.463253, 0.607769, -56.120083, -45.812523)"
        >
          <stop offset="0" style="stop-color: rgb(4, 18, 255)" />
          <stop offset="1" style="stop-color: rgb(0, 9, 126)" />
        </linearGradient>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          x1="72.119"
          y1="30.228"
          x2="72.119"
          y2="49.213"
          id="gradient-3"
          gradientTransform="matrix(-1.124482, 0.100087, -0.095179, -1.069366, 162.691579, 79.528276)"
        >
          <stop offset="0" style="stop-color: rgb(104, 101, 255)" />
          <stop offset="1" style="stop-color: rgb(0, 23, 166)" />
        </linearGradient>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          x1="-53.133"
          y1="-30.228"
          x2="-53.133"
          y2="-11.243"
          id="gradient-4"
          gradientTransform="matrix(-0.367854, 1.067315, -1.004848, -0.346324, -101.112121, 32.062334)"
        >
          <stop offset="0" style="stop-color: rgb(0, 8, 107)" />
          <stop offset="1" style="stop-color: rgb(66, 66, 255)" />
        </linearGradient>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          x1="-46.517"
          y1="45.443"
          x2="-46.517"
          y2="58.89"
          id="gradient-1"
          gradientTransform="matrix(-0.817921, -0.778128, 0.480626, -0.505208, -97.762962, 39.017189)"
        >
          <stop offset="0" style="stop-color: rgb(96, 105, 255)" />
          <stop offset="1" style="stop-color: rgb(25, 17, 143)" />
        </linearGradient>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          x1="55.531"
          y1="-110.469"
          x2="55.531"
          y2="-13.162"
          id="gradient-2"
          gradientTransform="matrix(-0.651516, 0.758635, -1.133657, -0.973578, 33.55909, -122.572113)"
        >
          <stop offset="0" style="stop-color: rgb(42, 48, 255)" />
          <stop offset="1" style="stop-color: rgb(2, 0, 31)" />
        </linearGradient>
      </defs>
    </svg>
  </div>
  <div v-else :style="{ width: width }">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 490 157" xmlns:bx="https://boxy-svg.com">
      <g transform="matrix(1, 0, 0, 1, -6.012, -6.011833)">
        <ellipse style="fill: rgb(2, 0, 216)" cx="84.271" cy="84.129" rx="78.117" ry="78.117" />
        <rect
          x="6.012"
          y="6.012"
          width="78.285"
          height="156.115"
          style="fill: rgba(218, 0, 255, 0.62)"
        />
        <path
          d="M 71.393 78.676 L 226.545 233.828 L 71.393 233.828 L 71.393 78.676 Z"
          bx:shape="triangle 71.393 78.676 155.152 155.152 0 0 1@c2b031e6"
          style="fill: rgb(194, 216, 6); transform-box: fill-box; transform-origin: 50% 50%"
          transform="matrix(0, 1, -1, 0, 104.111656, -72.664169)"
        />
        <path
          d="M -212.72 -352.5 L -139.724 -279.504 L -212.72 -279.504 L -212.72 -352.5 Z"
          bx:shape="triangle -212.72 -352.5 72.996 72.996 0 0 1@fd8e2537"
          style="
            stroke: rgb(0, 0, 0);
            stroke-width: 1;
            fill: rgb(216, 0, 1);
            transform-origin: -176.228px -316.003px;
          "
          transform="matrix(0, -1, 1, 0, 443.012482, 404.135162)"
        />
        <path
          d="M 418.148 -84.923 Q 418.222 -84.997 418.295 -84.923 L 491.179 -10.85 Q 491.252 -10.776 491.106 -10.776 L 345.337 -10.776 Q 345.191 -10.776 345.264 -10.85 Z"
          bx:shape="triangle 345.191 -84.997 146.061 74.221 0.5 0.001 1@952bac9d"
          style="
            stroke: white;
            fill: black;
            stroke-width: 2px;
            vector-effect: non-scaling-stroke;
            stroke-miterlimit: 4.42;
          "
          transform="matrix(1, 0, 0, -1, 0, 0)"
        />
        <path
          d="M 418.093 84.992 Q 418.17 84.914 418.247 84.992 L 494.963 162.959 Q 495.04 163.037 494.886 163.037 L 341.454 163.037 Q 341.3 163.037 341.377 162.959 Z"
          bx:shape="triangle 341.3 84.914 153.74 78.123 0.5 0.001 1@c20c2432"
          style="fill: white; stroke: rgb(0, 0, 0); stroke-width: 1"
        />
      </g>
    </svg>
  </div>
</template>

<style scoped>
.deusfx-logo {
  display: inline-flex;

  &.deusfx-logo-color-deus {
    fill: v-bind(colorDeus) !important;
  }

  &.deusfx-logo-colored {
    path {
      fill: v-bind(color) !important;

      &.deusfx-logo-color-deus {
        fill: v-bind(colorDeus) !important;
      }

      &.deusfx-logo-inner-inverted {
        filter: invert(1);
      }

      &.deusfx-logo-inner-inverted-custom {
        fill: v-bind(invertedColor) !important;
      }
    }
  }
}
</style>

<script setup lang="ts">
import { useLayoutStore } from '@/stores/layout'

const layoutStore = useLayoutStore()
/*backgroundImage: `url('../../../public/bg-lines-01.svg'), radial-gradient(125% 125% at 40% 80%, rgba(0, 0, 0, 0.95) 50%, rgba(0, 0, 255, 10.5) 100%)`,*/
/*backgroundImage: `radial-gradient(125% 125% at 50% 10%, black 20%, transparent 100%)`,*/

layoutStore.bodyStyle = {
  backgroundBlendMode: 'normal',
  backgroundColor: 'blue', //'#0d1a36', 6E0808
  backgroundImage: `radial-gradient(195% 195% at 90% 10%, black 20%, transparent 100%)`,
}

//rgba(0, 0, 255, 0.3)

layoutStore.proseBlock = 'ProseComponentsBlock'

const opt = {
  basics: {
    title: 'Basics',
    grid: {
      columns: 3,
      height: '12px',
      rows: 3,
      width: '12px',
    },
    shapes: [
      {
        form: 'square',
        x: 1,
        y: 1,
        xFr: 1,
        yFr: 3,
      },
      {
        form: 'moon',
        x: 1,
        y: 2,
        xFr: 2,
        yFr: 2,
        transform: 'rotate(180deg)',
      },
    ],
  },
  feedback: {
    title: 'Feedback',
    grid: {
      columns: 3,
      height: '12px',
      rows: 3,
      width: '12px',
    },
    shapes: [
      {
        form: 'triangle',
        x: 1,
        y: 1,
        xFr: 3,
        yFr: 3,
        opacity: [0.3],
        transform: 'rotate(90deg)',
      },
      {
        form: 'square',
        x: 2,
        y: 2,
        xFr: 2,
        yFr: 1,
        opacity: [0.9],
        fitMode: 'cover',
      },
    ],
  },
  data: {
    title: 'Data',
    grid: {
      columns: 3,
      height: '12px',
      rows: 3,
      width: '12px',
    },
    shapes: [
      {
        form: 'pacman',
        x: 1,
        y: 1,
        xFr: 3,
        yFr: 3,
        transform: 'rotate(-45deg)',
      },
      {
        form: 'square',
        x: 1,
        y: 2,
        xFr: 1,
        yFr: 2,
        opacity: [0.4],
        transform: 'scale(0.5, 1)',
        strokeWidth: ['5px'],
      },
      {
        form: 'pizza',
        x: 3,
        y: 0,
        xFr: 2,
        yFr: 2,
        transform: 'scale(-0.8, 0.8)',
      },
    ],
  },
  content: {
    title: 'Contents',
    grid: {
      columns: 3,
      height: '12px',
      rows: 3,
      width: '12px',
    },
    shapes: [
      {
        form: 'pacman',
        x: 1,
        y: 1,
        xFr: 3,
        yFr: 3,
      },
      {
        form: 'circle',
        x: 2,
        y: 1,
        xFr: 1,
        yFr: 1,
        opacity: [0.3],
        transform: 'scale(0.8)',
      },
    ],
  },
  layout: {
    title: 'Layout',
    grid: {
      columns: 3,
      height: '12px',
      rows: 2,
      width: '12px',
    },
    shapes: [
      {
        form: 'square',
        x: 1,
        y: 1,
        xFr: 3,
        yFr: 3,
      },
      {
        form: 'square',
        x: 1,
        y: 1,
        xFr: 1,
        yFr: 3,
      },
      {
        form: 'square',
        x: 2,
        y: 3,
        xFr: 2,
        yFr: 1,
        opacity: [0.7],
      },
    ],
  },
  forms: {
    title: 'forms',
    grid: {
      columns: 3,
      height: '16px',
      rows: 2,
      width: '16px',
    },
    shapes: [
      {
        form: 'square',
        x: 1,
        y: 1,
        xFr: 1,
        yFr: 3,
      },
      {
        form: 'square',
        x: 1,
        y: 1,
        xFr: 3,
        yFr: 1,
      },
      {
        form: 'square',
        x: 1,
        y: 2,
        xFr: 2,
        yFr: 1,
      },
    ],
  },
  editors: {
    title: 'editors',
    grid: {
      columns: 3,
      height: '16px',
      rows: 2,
      width: '16px',
    },
    shapes: [
      {
        form: 'pizza',
        x: 1,
        y: 1,
        xFr: 1,
        yFr: 1,
        opacity: [0.9],
        transform: 'scale(0.5)',
      },
      {
        form: 'triangle',
        x: 2,
        y: 1,
        xFr: 1,
        yFr: 1,
        opacity: [0.8],
        transform: 'scale(0.5)',
      },
      {
        form: 'pacman',
        x: 3,
        y: 1,
        xFr: 1,
        yFr: 1,
        opacity: [0.8],
        transform: 'scale(0.5)',
      },
      {
        form: 'square',
        x: 1,
        y: 2,
        xFr: 1,
        yFr: 2,
        opacity: [0.5],
      },
      {
        form: 'square',
        x: 1,
        y: 1,
        xFr: 3,
        yFr: 1,
        opacity: [0.9],
      },
      {
        form: 'square',
        x: 1,
        y: 3,
        xFr: 3,
        yFr: 1,
        opacity: [0.7],
      },
      {
        form: 'square',
        x: 2,
        y: 2,
        xFr: 2,
        yFr: 1,
        opacity: [1],
        transform: 'scale(0.5)',
      },
    ],
  },
  overlay: {
    title: 'overlay',
    grid: {
      columns: 3,
      height: '16px',
      rows: 2,
      width: '16px',
    },
    shapes: [
      {
        form: 'square',
        x: 1,
        y: 1,
        xFr: 3,
        yFr: 3,
        opacity: [0.4],
      },
      {
        form: 'square',
        x: 2,
        y: 2,
        xFr: 1,
        yFr: 1,
        opacity: [1],
        transform: 'scale(1.5, 1)',
      },
    ],
  },
  navigation: {
    title: 'navigation',
    grid: {
      columns: 3,
      height: '16px',
      rows: 3,
      width: '16px',
    },
    shapes: [
      {
        form: 'triangle',
        x: 1,
        y: 1,
        xFr: 3,
        yFr: 3,
      },
      {
        form: 'triangle',
        x: 3,
        y: 3,
        xFr: 1,
        yFr: 1,
        transform: 'rotate(180deg)',
      },
      {
        form: 'square',
        x: 3,
        y: 2,
        xFr: 1,
        yFr: 1,
      },
      {
        form: 'square',
        x: 3,
        y: 1,
        xFr: 1,
        yFr: 1,
      },
    ],
  },
}
</script>

<template>
  <div class="components-page" v-page-body-style>
    <dfx-card
      width="100%"
      height="100%"
      material="none"
      style="--dfx-mode: 'convex'; --dfx-blur: 4; --dfx-intensity: 2; --dfx-distance: 10"
    >
      <div class="flex h-full">
        <div
          class="content-menu w-[300px] h-full p-0 components-menu"
          style="background-color: rgba(0, 0, 0, 0.3)"
        >
          <dfx-card
            material="glassmorphism"
            height="100%"
            style="
              --dfx-mode: 'concave';
              --dfx-distance: 0.5;
              --dfx-blur: 0;
              --dfx-intensity: 0.05;
              --dfx-border-radius: 6px;
              --dfx-glassmorphism-depth: 2px;
              --dfx-glassmorphism-background: rgba(255, 255, 255, 0.03);
            "
          >
            <div class="flex flex-col h-full option-item w-full">
              <div class="flex justify-between p-4">
                <div class="flex flex-row items-start justify-end">
                  <dfx-shape-line-grid
                    :grid="opt.layout.grid"
                    :item="{
                      width: '10px',
                      height: '10px',
                    }"
                    :shapes="opt.layout.shapes"
                    class="text-blue-500"
                  />
                  <div v-if="false" class="font-thin text-lg text-white" v-html="opt.data.title" />
                </div>
                <div class="flex font-thin text-white/90 prose prose-2xl">Layout</div>
              </div>
              <div class="grow text-white w-full">
                <div>
                  <div
                    class="w-48 text-sm font-medium text-heading bg-neutral-primary-soft border border-default rounded-base"
                  >
                    <a
                      href="#"
                      aria-current="true"
                      class="flex items-center w-full px-4 py-2 text-fg-brand bg-neutral-secondary-medium border-b border-default rounded-t-base cursor-pointer"
                    >
                      <svg
                        class="w-4 h-4 me-1.5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a8.949 8.949 0 0 0 4.951-1.488A3.987 3.987 0 0 0 13 16h-2a3.987 3.987 0 0 0-3.951 3.512A8.948 8.948 0 0 0 12 21Zm3-11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        ></path>
                      </svg>
                      Button
                    </a>
                    <a
                      href="#"
                      class="flex items-center w-full px-4 py-2 border-b border-default cursor-pointer hover:bg-neutral-secondary-medium hover:text-fg-brand focus:outline-none focus:ring-2 focus:ring-brand focus:text-fg-brand"
                    >
                      <svg
                        class="w-4 h-4 me-1.5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-width="2"
                          d="M20 6H10m0 0a2 2 0 1 0-4 0m4 0a2 2 0 1 1-4 0m0 0H4m16 6h-2m0 0a2 2 0 1 0-4 0m4 0a2 2 0 1 1-4 0m0 0H4m16 6H10m0 0a2 2 0 1 0-4 0m4 0a2 2 0 1 1-4 0m0 0H4"
                        ></path>
                      </svg>
                      Divider
                    </a>
                    <a
                      href="#"
                      class="flex items-center w-full px-4 py-2 border-b border-default cursor-pointer hover:bg-neutral-secondary-medium hover:text-fg-brand focus:outline-none focus:ring-2 focus:ring-brand focus:text-fg-brand"
                    >
                      <svg
                        class="w-4 h-4 me-1.5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M4 13h3.439a.991.991 0 0 1 .908.6 3.978 3.978 0 0 0 7.306 0 .99.99 0 0 1 .908-.6H20M4 13v6a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-6M4 13l2-9h12l2 9M9 7h6m-7 3h8"
                        ></path>
                      </svg>
                      List
                    </a>
                    <a
                      href="#"
                      class="flex items-center w-full px-4 py-2 rounded-b-base cursor-pointer hover:bg-neutral-secondary-medium hover:text-fg-brand focus:outline-none focus:ring-2 focus:ring-brand focus:text-fg-brand"
                    >
                      <svg
                        class="w-4 h-4 me-1.5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M12 13V4M7 14H5a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-2m-1-5-4 5-4-5m9 8h.01"
                        ></path>
                      </svg>
                      Chip
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </dfx-card>
        </div>
        <div class="grow p-0">
          <dfx-card material="bash" height="100%">
            <div class="flex justify-between p-4">
              <div class="flex flex-row items-start justify-end">
                <div v-if="false" class="font-thin text-lg text-white" v-html="opt.data.title" />
              </div>
              <div class="flex font-thin text-white/90 prose prose-h1 prose-xl">Button</div>
            </div>
            <div class="p-4">
              <dfx-button variant="link">link</dfx-button>
              <dfx-button variant="deus">deus</dfx-button>
              <dfx-button variant="duo-tone">duo-tone</dfx-button>
              <dfx-button variant="flat">flat</dfx-button>
              <dfx-button variant="ghost">ghost</dfx-button>
              <dfx-button material="plastic" variant="material">material</dfx-button>
              <dfx-button variant="outline">outline</dfx-button>
              <br />
              <br />
              <dfx-button variant="pill">pill</dfx-button>
              <br />
              <br />
              <br />

              <button
                data-popover-target="popover-top"
                data-popover-placement="top"
                type="button"
                class="text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
              >
                Top popover
              </button>

              <div
                data-popover
                id="popover-top"
                role="tooltip"
                class="absolute z-10 invisible inline-block w-64 text-sm text-body transition-opacity duration-300 bg-neutral-primary-soft border border-default rounded-base shadow-xs opacity-0"
              >
                <div class="px-3 py-2 bg-neutral-tertiary border-b border-default rounded-t-base">
                  <h3 class="font-medium text-heading">Popover top</h3>
                </div>
                <div class="px-3 py-2">
                  <p>And here's some amazing content. It's very engaging. Right?</p>
                </div>
                <div data-popper-arrow></div>
              </div>
              <button
                data-popover-target="popover-right"
                data-popover-placement="right"
                type="button"
                class="text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
              >
                Right popover
              </button>
              <div
                data-popover
                id="popover-right"
                role="tooltip"
                class="absolute z-10 invisible inline-block w-64 text-sm text-body transition-opacity duration-300 bg-neutral-primary-soft border border-default rounded-base shadow-xs opacity-0"
              >
                <div class="px-3 py-2 bg-neutral-tertiary border-b border-default rounded-t-base">
                  <h3 class="font-medium text-heading">Popover right</h3>
                </div>
                <div class="px-3 py-2">
                  <p>And here's some amazing content. It's very engaging. Right?</p>
                </div>
                <div data-popper-arrow></div>
              </div>
              <button
                data-popover-target="popover-bottom"
                data-popover-placement="bottom"
                type="button"
                class="text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
              >
                Bottom popover
              </button>
              <div
                data-popover
                id="popover-bottom"
                role="tooltip"
                class="absolute z-10 invisible inline-block w-64 text-sm text-body transition-opacity duration-300 bg-neutral-primary-soft border border-default rounded-base shadow-xs opacity-0"
              >
                <div class="px-3 py-2 bg-neutral-tertiary border-b border-default rounded-t-base">
                  <h3 class="font-medium text-heading">Popover bottom</h3>
                </div>
                <div class="px-3 py-2">
                  <p>And here's some amazing content. It's very engaging. Right?</p>
                </div>
                <div data-popper-arrow></div>
              </div>
              <button
                data-popover-target="popover-left"
                data-popover-placement="left"
                type="button"
                class="text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
              >
                Left popover
              </button>
              <div
                data-popover
                id="popover-left"
                role="tooltip"
                class="absolute z-10 invisible inline-block w-64 text-sm text-body transition-opacity duration-300 bg-neutral-primary-soft border border-default rounded-base shadow-xs opacity-0"
              >
                <div class="px-3 py-2 bg-neutral-tertiary border-b border-default rounded-t-base">
                  <h3 class="font-medium text-heading">Popover left</h3>
                </div>
                <div class="px-3 py-2">
                  <p>And here's some amazing content. It's very engaging. Right?</p>
                </div>
                <div data-popper-arrow></div>
              </div>
            </div>
          </dfx-card>
        </div>
      </div>
    </dfx-card>
  </div>
</template>

<style>
@layer layout-content {
  .components-page {
    position: relative;

    .components-menu {
      position:;
      border-left: rgba(255, 255, 255, 0.2) solid 1px;
      box-shadow: -100px -100px 10px 50px black;
    }
  }
}
</style>

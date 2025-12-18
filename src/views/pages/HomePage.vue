<script setup lang="ts">
import { useLayoutStore } from '@/stores/layout'
import { materials } from 'deusfx/src/materials'
import { layouts } from 'deusfx/src/layouts'
import { ref } from 'vue'
//import { injectCss } from 'deusfx/src/utils/dfx-util-css'
//injectCss(materials, ['glassmorphism'])
//injectCss(layouts, ['container'])

import { applyMaterial, injectMaterial } from 'deusfx/src/utils/dfx-util-css'

//injectMaterial('paper')

const layoutStore = useLayoutStore()

layoutStore.bodyStyle = {
  backgroundBlendMode: 'normal',
  backgroundColor: 'white',
  backgroundImage: 'none',
}

layoutStore.proseBlock = 'ProseDeusFxBlock'

console.log(document.getElementById('get-started-home-button'), 888)
</script>

<template>
  <div class="home-page" v-page-body-style>
    <div class="flex h-full items-center-safe justify-evenly">
      <div class="prose prose-2xl">
        <div>
          <h1 class="mb-0">Web components first</h1>
          <h1 class="mb-0">
            micro to Macro <span style="color: blue">UI toolk<strong>it</strong>.</span>
          </h1>
          <h4 class="font-light mt-0">
            Easy <strong>m2M</strong> tools to create your own component package, webapp or site.
          </h4>
        </div>
        <br />
        <div class="highlights">
          <div class="ml-1">
            <div>
              <div
                class="mb-2 p-4 outline-1 outline-blue-700 flex flex-col items-center rounded text-blue-700"
              >
                <div class="mb-2 w-full flex justify-evenly">
                  <i class="icon-dfx-effects" />
                  <i class="icon-dfx-materials" />
                  <i class="icon-dfx-structures" />
                </div>
                <div class="flex">
                  <dfx-shape-line-printer
                    v-for="(shape, index) in 7"
                    :key="index"
                    opacity="1"
                    color="rgba(0, 0, 255, 0.3)"
                    :shape-colors="['black', 'blue']"
                    :blend-mode="['normal']"
                    :stroke-width="6"
                    width="20px"
                  />
                </div>
                <div class="text-sm">
                  introducing <strong class="text-blue-700">concepts</strong>
                </div>
              </div>
              <div class="text-xs text-blue-700">
                <strong class="text-blue-700">Effects</strong>. <strong>Materials</strong>.
                <strong>Blueprints</strong>.
                <br />
                A new approach to creative compose web componennts.
              </div>
            </div>
          </div>
          <div>
            <div
              class="mb-2 p-4 outline-1 outline-blue-700 flex flex-col items-center rounded text-blue-700"
            >
              <div class="mb-2 w-full items-center flex justify-center">
                <i class="icon-webpack" />
                <i class="icon-swap" />
                <i class="icon-cloudflare" />
              </div>
              <div class="flex">
                <dfx-shape-line-printer
                  v-for="(shape, index) in 8"
                  :key="index"
                  opacity="1"
                  color="rgba(0, 0, 255, 0.3)"
                  :shape-colors="['black', 'blue']"
                  :blend-mode="['normal']"
                  :stroke-width="6"
                  width="20px"
                />
              </div>
              <div class="text-sm">
                ready to use, <strong class="text-blue-700">no bundle</strong>
              </div>
            </div>
            <div class="text-xs text-blue-700">
              No need of compile or package procecss. Include via CDN or download (package available
              too).
            </div>
          </div>
          <div>
            <div
              class="mb-2 p-4 outline-1 outline-blue-700 flex flex-col items-center rounded text-blue-700"
            >
              <div class="mb-2 w-full flex justify-evenly">
                <i class="icon-vue" />
                <i class="icon-react" />
                <i class="icon-angular" />
                <i v-if="false" class="icon-svelte" />
                <i class="icon-tailwind" />
              </div>
              <div class="flex">
                <dfx-shape-line-printer
                  v-for="(shape, index) in 4"
                  :key="index"
                  opacity="1"
                  color="rgba(0, 0, 255, 0.3)"
                  :shape-colors="['black', 'blue']"
                  :blend-mode="['normal']"
                  :stroke-width="6"
                  width="20px"
                />
              </div>
              <div class="text-sm">frameworks</div>
            </div>
            <div class="text-xs text-blue-700">
              It's agnostic cross-frameworks, also, runs in vanilla javascript with ze<strong
                class="text-blue-700"
                >ro</strong
              >
              configuration.
            </div>
          </div>
          <div>
            <div class="h-[113px] mb-2 p-4 flex flex-col items-center rounded border">
              <div class="flex flex-row mb-1">
                <div class="mr-1">
                  <i class="icon-machina" />
                </div>
                <div class="flex flex-col h-full">
                  <div class="mb-1 leading-[0.8] text-sm">
                    <span class="mr-1"><strong class="text-black">MACHINA</strong></span>
                  </div>
                  <div class="flex justify-evenly">
                    <dfx-shape-line-printer
                      v-for="(shape, index) in 8"
                      :key="index"
                      opacity="0.2"
                      stroke-width="7"
                      color="rgba(0, 0, 0, 1)"
                      :shape-colors="['black', 'blue']"
                      :blend-mode="['normal']"
                      :stroke-width="6"
                      width="16px"
                    />
                  </div>
                </div>
              </div>
              <div class="text-xs text-center">
                <strong>Demiurge architect board.</strong>
                <br />

                Official deus<strong class="text-black">fx</strong> editor studio.
              </div>
            </div>
            <div class="w-full" style="line-height: 0">
              <dfx-button color="black" colorScheme="light" block variant="deus"
                ><strong class="font-black text-white">go</strong>&nbsp;machina</dfx-button
              >
            </div>
          </div>
        </div>
        <br />
        <div style="display: flex; flex-direction: row; justify-content: center">
          <router-link to="./guide">
            <dfx-button
              colorScheme="light"
              color="blue"
              size="lg"
              style="--dfx-color-text: white; stroke-width: 5px"
            >
              get started
              <div class="ml-4">
                <dfx-geometric-icon
                  icon="dfx-tkt-start"
                  :shapesOverride="{
                    strokeColor: 'white',
                    strokeWidth: '1px',
                    fillColor: ['rgba(255, 255, 255, 0.05)', 'rgba(255, 255, 255, 0.2)'],
                  }"
                />
              </div>
            </dfx-button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
@layer layout-content {
  .home-page {
    position: relative;

    .highlights {
      display: grid;
      column-gap: 10px;
      grid-template-columns: 1fr 1fr 1fr 1fr 0.1fr;
      grid-auto-rows: auto;
    }
  }
}

.icon-frameworks {
  display: inline-block;
  width: 64px;
  height: 64px;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='none' stroke='%23fff' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M13 2h-2a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1m0 16h-2a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1m1-14h2c1.414 0 2.121 0 2.56.44C19 4.878 19 5.585 19 7m-9-3H8c-1.414 0-2.121 0-2.56.44C5 4.878 5 5.585 5 7m5 13H8c-1.414 0-2.121 0-2.56-.44C5 19.122 5 18.415 5 17m9 3h2c1.414 0 2.121 0 2.56-.44c.44-.439.44-1.146.44-2.56m-9-5h4m7 1v-2a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1M7 13v-2a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1'/%3E%3C/svg%3E");
}

.icon-no-bundler {
  display: inline-block;
  width: 32px;
  height: 32px;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 256 256'%3E%3Cpath fill='blue' d='m221.76 69.66l-88-48.18a12 12 0 0 0-11.52 0l-88 48.18A12 12 0 0 0 28 80.18v95.64a12 12 0 0 0 6.24 10.52l88 48.18a11.95 11.95 0 0 0 11.52 0l88-48.18a12 12 0 0 0 6.24-10.52V80.18a12 12 0 0 0-6.24-10.52M126.08 28.5a3.94 3.94 0 0 1 3.84 0L216.67 76L178.5 96.89a4 4 0 0 0-.58-.4l-88-48.18Zm1.92 96L39.33 76l42.23-23.13l88.67 48.54Zm-89.92 54.8a4 4 0 0 1-2.08-3.5V83.29l88 48.16v94.91Zm179.84 0l-85.92 47v-94.85l40-21.89V152a4 4 0 0 0 8 0v-46.82l40-21.89v92.53a4 4 0 0 1-2.08 3.5Z'/%3E%3C/svg%3E");
}

.icon-start {
  display: inline-block;
  width: 32px;
  height: 32px;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='blue' d='M9.19 6.35c-2.04 2.29-3.44 5.58-3.57 5.89l-2.26-.97c-.65-.28-.81-1.13-.31-1.63l3.01-3.01c.47-.47 1.15-.68 1.81-.55zm1.49 10.16c.3.3.74.38 1.12.2c1.16-.54 3.65-1.81 5.26-3.42c4.59-4.59 4.63-8.33 4.36-9.93a.98.98 0 0 0-.79-.79c-1.6-.27-5.34-.23-9.93 4.36c-1.61 1.61-2.87 4.1-3.42 5.26c-.18.38-.09.83.2 1.12zm6.97-1.7c-2.29 2.04-5.58 3.44-5.89 3.57l.97 2.26c.28.65 1.13.81 1.63.31l3.01-3.01c.47-.47.68-1.15.55-1.81zm-8.71 2.6a3 3 0 0 1-.82 2.71c-.77.77-3.16 1.34-4.71 1.64c-.69.13-1.3-.48-1.17-1.17c.3-1.55.86-3.94 1.64-4.71a3 3 0 0 1 2.71-.82c1.17.22 2.13 1.18 2.35 2.35M13 9c0-1.1.9-2 2-2s2 .9 2 2s-.9 2-2 2s-2-.9-2-2'/%3E%3C/svg%3E");
}

.icon-vue {
  display: inline-block;
  width: 32px;
  height: 32px;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Cpath fill='blue' d='M24.9 3.9L16 19.4L7.1 3.9H2l14 24.3L30 3.9z'/%3E%3Cpath fill='blue' d='m16 9.5l-3.2-5.6H8.1L16 17.5l7.9-13.6h-4.6z'/%3E%3C/svg%3E");
}

.icon-react {
  display: inline-block;
  width: 32px;
  height: 32px;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cg fill='none'%3E%3Cg fill='blue' clip-path='url(%23SVGXv8lpc2Y)'%3E%3Cpath d='M24 11.689c0-1.59-1.991-3.097-5.044-4.031c.705-3.111.392-5.587-.988-6.38a2.15 2.15 0 0 0-1.096-.273v1.09c.225 0 .406.045.558.128c.665.382.954 1.834.729 3.703c-.054.46-.142.944-.25 1.438a24 24 0 0 0-3.106-.533a24 24 0 0 0-2.035-2.446c1.595-1.482 3.092-2.294 4.11-2.294V1c-1.346 0-3.107.959-4.888 2.622C10.21 1.97 8.448 1.02 7.103 1.02v1.09c1.013 0 2.515.808 4.11 2.28c-.685.72-1.37 1.536-2.021 2.441a23 23 0 0 0-3.111.538q-.168-.734-.255-1.418c-.23-1.87.054-3.322.715-3.708c.146-.088.337-.128.562-.128v-1.09c-.41 0-.783.088-1.105.273c-1.375.793-1.683 3.263-.974 6.365C1.981 8.603 0 10.104 0 11.689c0 1.59 1.991 3.097 5.044 4.03c-.705 3.112-.392 5.588.988 6.38c.318.186.69.274 1.1.274c1.346 0 3.107-.959 4.888-2.622c1.78 1.653 3.541 2.602 4.887 2.602a2.2 2.2 0 0 0 1.105-.274c1.375-.792 1.683-3.262.974-6.364C22.019 14.781 24 13.274 24 11.689m-6.37-3.263a22 22 0 0 1-.66 1.932a26 26 0 0 0-1.345-2.319q1.044.153 2.006.387m-2.24 5.21a26 26 0 0 1-1.179 1.869a25.5 25.5 0 0 1-4.412.005a25.5 25.5 0 0 1-2.201-3.806a26 26 0 0 1 2.192-3.82a25.5 25.5 0 0 1 4.411-.006q.61.875 1.184 1.86q.557.961 1.018 1.946a27 27 0 0 1-1.013 1.952M16.97 13c.264.656.49 1.311.675 1.947c-.64.157-1.316.289-2.015.391A27 27 0 0 0 16.97 13m-4.96 5.22q-.684-.706-1.36-1.566c.44.02.89.035 1.345.035q.691.001 1.36-.035c-.44.573-.895 1.096-1.345 1.566m-3.64-2.882a22 22 0 0 1-2.006-.386c.181-.631.406-1.282.66-1.932c.201.39.412.782.642 1.174q.345.587.704 1.144m3.615-10.18q.684.706 1.36 1.566c-.44-.02-.89-.035-1.345-.035q-.691-.001-1.36.035c.44-.573.895-1.096 1.345-1.566M8.365 8.04a27 27 0 0 0-1.34 2.333a21 21 0 0 1-.675-1.947c.64-.152 1.316-.284 2.015-.386m-4.427 6.124c-1.732-.738-2.852-1.707-2.852-2.475s1.12-1.742 2.852-2.475c.42-.181.88-.343 1.355-.494c.279.958.646 1.956 1.1 2.979a23 23 0 0 0-1.085 2.964a15 15 0 0 1-1.37-.499m2.632 6.99c-.665-.38-.954-1.834-.729-3.702c.054-.46.142-.945.25-1.439c.958.235 2.005.416 3.106.534a24 24 0 0 0 2.035 2.446c-1.595 1.482-3.092 2.294-4.11 2.294a1.2 1.2 0 0 1-.552-.132m11.604-3.727c.23 1.869-.054 3.322-.715 3.708c-.146.088-.337.127-.562.127c-1.013 0-2.515-.807-4.11-2.28a23 23 0 0 0 2.021-2.44a23 23 0 0 0 3.111-.538q.171.74.255 1.423m1.883-3.263c-.42.181-.88.343-1.355.494a23.5 23.5 0 0 0-1.1-2.979c.45-1.017.811-2.01 1.085-2.964q.728.227 1.375.499c1.732.738 2.852 1.707 2.852 2.475c-.005.768-1.125 1.742-2.857 2.475'/%3E%3Cpath d='M11.995 13.925a2.236 2.236 0 1 0 0-4.472a2.236 2.236 0 0 0 0 4.472'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='SVGXv8lpc2Y'%3E%3Cpath fill='%23fff' d='M0 0h24v24H0z'/%3E%3C/clipPath%3E%3C/defs%3E%3C/g%3E%3C/svg%3E");
}

.icon-angular {
  display: inline-block;
  width: 32px;
  height: 32px;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Cpath fill='blue' d='M13.24 16.859h5.51l-2.755-6.542zM15.995.01L.917 5.317l2.297 19.677l12.781 6.995l12.786-6.984l2.297-19.688L15.995.015zm9.411 24.396H21.89l-1.896-4.667h-8l-1.896 4.667H6.582l9.411-20.865z'/%3E%3C/svg%3E");
}

.icon-svelte {
  display: inline-block;
  width: 32px;
  height: 32px;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 15 15'%3E%3Cpath fill='none' stroke='blue' d='m9.625 8.357l-5.088 3.18m2.968-1.855a3.5 3.5 0 0 1-3.71-5.937l4.241-2.65A3.5 3.5 0 0 1 12.405 6.5M7.536 5.296a3.5 3.5 0 0 1 3.71 5.936l-4.24 2.65A3.5 3.5 0 0 1 2.614 8.5m2.8-1.88l5.09-3.179' stroke-width='1'/%3E%3C/svg%3E");
}

.icon-cloudflare {
  display: inline-block;
  width: 32px;
  height: 32px;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 256 256'%3E%3Cg fill='none'%3E%3Crect width='256' height='256' fill='blue' rx='60'/%3E%3Cg clip-path='url(%23SVGrk1fDdNV)'%3E%3Cpath fill='purple' d='M79 171.75h132.356v-36.625l-25.144-14.419l-4.337-1.875L79 119.537z'/%3E%3Cpath fill='white' d='M165.575 166.887c1.231-4.218.763-8.087-1.287-10.962c-1.875-2.638-5.044-4.163-8.85-4.338l-72.157-.937c-.469 0-.875-.238-1.112-.588s-.294-.812-.175-1.287c.237-.706.937-1.231 1.7-1.288l72.8-.937c8.625-.413 18-7.388 21.275-15.938l4.162-10.843a2.37 2.37 0 0 0 .125-1.407c-4.687-21.218-23.625-37.043-46.25-37.043c-20.875 0-38.562 13.481-44.9 32.187a21.63 21.63 0 0 0-14.95-4.162c-10.025 1-18.125 9.025-19.05 19.05a22.4 22.4 0 0 0 .525 7.443A30.25 30.25 0 0 0 28 166.125c0 1.462.125 2.937.294 4.394c.125.706.706 1.231 1.406 1.231h133.175a1.81 1.81 0 0 0 1.7-1.288z'/%3E%3Cpath fill='white' d='m188.55 120.519l-2 .062c-.469 0-.875.35-1.063.813l-2.812 9.787c-1.231 4.219-.763 8.088 1.287 10.963c1.875 2.637 5.044 4.162 8.85 4.337l15.357.938c.468 0 .875.237 1.112.587s.294.875.175 1.288c-.237.706-.937 1.231-1.7 1.287l-16 .938c-8.675.412-18 7.387-21.275 15.937l-1.175 2.988c-.237.587.175 1.175.813 1.175H225.1a1.44 1.44 0 0 0 1.406-1.057a40 40 0 0 0 1.494-10.65a39.5 39.5 0 0 0-39.45-39.387'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='SVGrk1fDdNV'%3E%3Cpath fill='purple' d='M28 28h200v200H28z'/%3E%3C/clipPath%3E%3C/defs%3E%3C/g%3E%3C/svg%3E");
}

.icon-download {
  display: inline-block;
  width: 32px;
  height: 32px;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Cpath fill='blue' d='M16 6c-2.648 0-4.95 1.238-6.594 3.063C9.27 9.046 9.148 9 9 9c-2.2 0-4 1.8-4 4c-1.73 1.055-3 2.836-3 5c0 3.3 2.7 6 6 6h5v-2H8c-2.219 0-4-1.781-4-4a4.01 4.01 0 0 1 2.438-3.688l.687-.28l-.094-.75A6 6 0 0 1 7 13a1.984 1.984 0 0 1 2.469-1.938l.625.157l.375-.5A7 7 0 0 1 16 8c3.277 0 6.012 2.254 6.781 5.281l.188.781l.843-.03c.211-.012.258-.032.188-.032c2.219 0 4 1.781 4 4s-1.781 4-4 4h-5v2h5c3.3 0 6-2.7 6-6c0-3.156-2.488-5.684-5.594-5.906C23.184 8.574 19.926 6 16 6m-1 12v8h-3l4 4l4-4h-3v-8z'/%3E%3C/svg%3E");
}

.icon-tailwind {
  display: inline-block;
  width: 32px;
  height: 32px;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 256 154'%3E%3Cdefs%3E%3ClinearGradient id='SVG80JqDb2a' x1='-2.778%25' x2='100%25' y1='32%25' y2='67.556%25'%3E%3Cstop offset='0%25' stop-color='blue'/%3E%3Cstop offset='100%25' stop-color='%230ed7b5'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cpath fill='url(%23SVG80JqDb2a)' d='M128 0Q76.8 0 64 51.2Q83.2 25.6 108.8 32c9.737 2.434 16.697 9.499 24.401 17.318C145.751 62.057 160.275 76.8 192 76.8q51.2 0 64-51.2q-19.2 25.6-44.8 19.2c-9.737-2.434-16.697-9.499-24.401-17.318C174.249 14.743 159.725 0 128 0M64 76.8q-51.2 0-64 51.2q19.2-25.6 44.8-19.2c9.737 2.434 16.697 9.499 24.401 17.318C81.751 138.857 96.275 153.6 128 153.6q51.2 0 64-51.2q-19.2 25.6-44.8 19.2c-9.737-2.434-16.697-9.499-24.401-17.318C110.249 91.543 95.725 76.8 64 76.8'/%3E%3C/svg%3E");
}

.icon-webpack {
  display: inline-block;
  width: 32px;
  height: 32px;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 22 24'%3E%3Cpath fill='rgba(0, 0, 0, 0.2)' d='M20.952 18.5L11.238 24v-4.286l6.048-3.334zm.666-.595V6.385L18.07 8.456v7.381l3.548 2.048zM.666 18.5L10.38 24v-4.286L4.332 16.38zM0 17.905V6.385l3.548 2.071v7.381zM.405 5.643L10.381 0v4.143L3.952 7.691zm20.809 0L11.238 0v4.143l6.428 3.548zM10.381 18.738l-5.972-3.287V8.927l5.976 3.452zm.857 0l5.976-3.286V8.928l-5.976 3.452zM4.809 8.19l6-3.31l6 3.31l-6 3.453z'/%3E%3C/svg%3E");
}

.icon-swap {
  display: inline-block;
  width: 18px;
  height: 18px;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-image: url("data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath d='M 6.99 11 L 3 15 L 6.99 19 L 6.99 16 L 14 16 L 14 14 L 6.99 14 L 6.99 11 Z' style='fill: rgb(166, 166, 166);'/%3E%3Cpath fill='blue' d='M 21 9 L 17.009999999999998 5 L 17.009999999999998 8 L 10 8 L 10 10 L 17.009999999999998 10 L 17.009999999999998 13 L 21 9 Z'/%3E%3C/svg%3E");
}

.icon-dfx-materials {
  display: inline-block;
  width: 32px;
  height: 32px;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-image: url("data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 320' width='320px' height='320px' xmlns:bx='https://boxy-svg.com'%3E%3Cdefs%3E%3Cbx:grid x='0' y='0' width='82.381' height='82.381'/%3E%3C/defs%3E%3Cpath d='M 0 -320 L 320 0 L 0 0 L 0 -320 Z' bx:shape='triangle 0 -320 320 320 0 0 1@94fa6d03' style='stroke: rgb(0, 0, 0); fill: rgb(35, 0, 255);' transform='matrix(1, 0, 0, -1, 0, 0)'/%3E%3Cpath d='M 319.975 319.957 L 170 169.975 L 319.975 20 L 319.975 319.957 Z' style='stroke-linecap: square; paint-order: fill; stroke-width: 36.042; stroke-miterlimit: 1; fill: rgb(35, 0, 255);'/%3E%3C/svg%3E");
}

.icon-dfx-effects {
  display: inline-block;
  width: 32px;
  height: 32px;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-image: url("data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 320' width='320px' height='320px' xmlns:bx='https://boxy-svg.com'%3E%3Cpath d='M -319.19 -320 L 0.796 0 L -319.19 0 L -319.19 -320 Z' bx:shape='triangle -319.19 -320 319.986 320 0 0 1@cc21722d' style='stroke-linecap: square; paint-order: fill; stroke-miterlimit: 1; fill: none; stroke-width: 5;' transform='matrix(-1, 0, 0, -1, 0, 0)'/%3E%3Cpath d='M -0.782 -320 L 319.218 0 L -0.782 0 L -0.782 -320 Z' bx:shape='triangle -0.782 -320 320 320 0 0 1@2684d8ba' style='fill: none; stroke-width: 5;' transform='matrix(1, 0, 0, -1, 0, 0)'/%3E%3Cpath d='M -525.41 -264.07 L -386.085 -124.745 L -525.41 -124.745 L -525.41 -264.07 Z' style='stroke-width: 5; transform-origin: -455.765px -194.414px; fill: rgb(35, 0, 255);' transform='matrix(0.707107, -0.707107, -0.707107, -0.707107, 734.326788, 350.550984)'/%3E%3Cpath d='M 0 320 L 320 0 L 0 0 L 0 320 Z M 50.521 254.641 L 50.521 57.606 L 149.039 156.123 L 50.521 254.641 Z' style='fill: rgb(35, 0, 255);'/%3E%3C/svg%3E");
}

.icon-dfx-structures {
  display: inline-block;
  width: 32px;
  height: 32px;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-image: url("data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 320' width='320px' height='320px' style='mix-blend-mode: hard-light;'%3E%3Crect width='155.152' height='320' style='fill: none; stroke-width: 5px;' x='-0.076'/%3E%3Crect x='427.579' width='160' height='80' style='stroke-width: 5px; fill: none;' y='52.003'/%3E%3Crect x='-66.271' y='174.483' width='320' height='320' style='fill: none; stroke-width: 5px;'/%3E%3Crect width='160' height='320' style='fill: rgb(33, 33, 255);'/%3E%3Crect x='170' width='150' height='120' style='fill: rgb(18, 18, 255);'/%3E%3Crect x='170' y='130' width='150' height='190' style='fill: rgb(18, 18, 255);'/%3E%3C/svg%3E");
}

.icon-machina {
  display: inline-block;
  width: 32px;
  height: 32px;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-image: url("data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 320' width='320px' height='320px' xmlns:bx='https://boxy-svg.com'%3E%3Cdefs%3E%3Cbx:grid x='0' y='0' width='82.381' height='82.381'/%3E%3C/defs%3E%3Cpath d='M 0 -320 L 320 0 L 0 0 L 0 -320 Z' bx:shape='triangle 0 -320 320 320 0 0 1@94fa6d03' style='stroke: rgb(0, 0, 0); fill: rgb(0, 0, 0);' transform='matrix(1, 0, 0, -1, 0, 0)'/%3E%3Cpath d='M 319.975 319.957 L 170 169.975 L 319.975 20 L 319.975 319.957 Z' style='stroke-linecap: square; paint-order: fill; stroke-width: 36.042; stroke-miterlimit: 1; fill: rgb(35, 0, 0);'/%3E%3C/svg%3E");
}

.gradient-text {
  background-image: linear-gradient(to left, black, blue);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
}
</style>

<script setup lang="ts">
import DeusFxLogo from '@/components/DeusFxLogo.vue'
</script>

<template>
  <div class="h-full layout-prose-materials w-full">
    <dfx-effect
      :effects="[
        {
          name: 'dfx-effect-shadow',
          variables: {
            darkness: '0.5',
            direction: 'right',
          },
        },
      ]"
    >
      <dfx-card
        border-radius="0"
        color-scheme="light"
        height="100%"
        material="bash"
        style="
          --dfx-material-bash-border-radius: 0;
          --dfx-material-bash-font-size: 14px;
          border-top: 0;
          position: relative;
        "
      >
        <div class="force-render sticky top-0 left w-full z-10 -mt-[75px]">
          <dfx-card
            colorScheme="light"
            material="glassmorphism"
            style="--dfx-glassmorphism-blur: 6px; --dfx-glassmorphism-depth: 1px; width: 200px"
            width="100%"
          >
            <div
              class="force-render border-b border-b-white/20 pb-2 pt-4 px-3"
              style="box-shadow: 0px 30px 20px -10px rgba(0, 0, 0, 0.7)"
            >
              <router-link to="./">
                <DeusFxLogo color="white" width="100px" />
              </router-link>
            </div>
          </dfx-card>
        </div>
        <div class="flex flex-col grow h-full justify-between axxx pt-[75px]">
          <div class="flex flex-col grow h-full">
            <div class="flex flex-col p-5">
              <h3
                class="mb-1 text-3xl text-center font-thin opacity-90 special-title"
                style="color: white"
              >
                getting <strong class="font-semibold">started</strong>
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
              <br />
              <div class="flex flex-col text-white">
                <div class="font-black">Introduction</div>
                <div>
                  <router-link to="./guide/introduction">
                    What is deus<strong>fx</strong>?</router-link
                  >
                </div>
                <br />
                <div class="font-black">Concepts</div>
                <div>Web components M2M</div>
                <div>Materials</div>
                <div>Structures</div>
                <br />
                <div class="font-black">Quick start</div>
                <div>Install</div>
                <br />
                <div class="font-black">Usage</div>
                <div>I'm not a programmer</div>
                <div>Basic</div>
                <div>Working with materials</div>
                <div>Compouding structures</div>
                <div>Reactivity</div>
                <div>Events</div>
                <br />
                <div class="font-black">Integration</div>
                <div>Vanilla</div>
                <div>Frameworks</div>
                <div>Limitations</div>
              </div>
            </div>
          </div>
          <div></div>
        </div>
      </dfx-card>
    </dfx-effect>
  </div>
</template>

<style scoped>
@layer layout-prose {
  .layout-default:has(.layout-prose-materials) {
    --layout-default-prose-width: 3fr;
  }

  .axxx {
    position: relative;
    mix-blend-mode: plus-lighter;
    z-index: 1;
    backdrop-filter: blur(20px);

    &::before {
      background-image: url('../../../public/bg-arch.svg');
      background-position: center;
      background-size: 60%;
      content: '';
      height: 100%;
      left: 0;
      opacity: 0.5;
      position: absolute;
      top: 0;
      width: 100%;
      z-index: -1;
      mask-repeat: repeat-y;
      mask-position: right;
      mask-size: 100%;
      mask-image: linear-gradient(to right, black 90%, transparent);
    }
  }
}
</style>

<script setup lang="ts">
import { computed, onMounted, shallowRef, watch } from 'vue'
import { useLayoutStore } from '@/stores/layout'
import blocks from '@/views/blocks/proses'
import NavbarBlock from '@/views/blocks/NavbarBlock.vue'

//import { injectCss } from 'deusfx/src/materials/materials.ts'

//injectCss()

const proseBlock = shallowRef('div')

const layoutStore = useLayoutStore()

proseBlock.value = blocks[layoutStore.proseBlock]
watch(
  () => layoutStore.proseBlock,
  () => (proseBlock.value = blocks[layoutStore.proseBlock]),
)
</script>

<template>
  <div class="layout-default">
    <div class="background-transition-on"></div>
    <div class="background-transition-off"></div>
    <div class="layout-default-prose">
      <transition name="prose-transition">
        <component :is="proseBlock" v-show="proseBlock" />
      </transition>
    </div>
    <main class="layout-default-content">
      <router-view v-slot="{ Component }">
        <transition name="content-transition">
          <component :is="Component || 'div'"></component>
        </transition>
      </router-view>
      <NavbarBlock class="layout-default-navbar" />
    </main>
  </div>
</template>

<style>
/* Layout structure */
@layer layout {
  .layout-default {
    --layout-default-prose-width: 3fr;
    --layout-default-content-width: 9fr;
    --layout-default-navbar-width: 64px;
    --layout-default-transition-time: 0.3s;

    box-sizing: border-box !important;
    display: grid;
    grid-template-columns: var(--layout-default-prose-width) var(--layout-default-content-width);
    grid-template-rows: auto, auto, 1fr;
    grid-auto-rows: auto;
    grid-template-areas: 'prose content';
    height: 100vh;
    min-height: 100vh;
    overflow-y: hidden;
    position: relative;
    transition:
      grid-template-columns var(--layout-default-transition-time) ease-in-out,
      grid-template-rows var(--layout-default-transition-time) ease-in-out;
  }

  .layout-default-prose {
    grid-area: prose;
    overflow-y: scroll;

    > div {
      height: 100%;
    }
  }

  .layout-default-content {
    grid-area: content;
    display: grid;
    grid-template-columns:
      var(--layout-default-content-width)
      var(--layout-default-navbar-width);
    grid-auto-rows: auto;
    grid-template-areas: 'content-space navbar';

    overflow-y: scroll;
    position: relative;
    z-index: 901;

    div::first-child {
      height: 100%;
    }
  }

  .layout-default-content-space {
    position: relative;

    > div {
      height: 100vh;
    }
  }

  .layout-default-navbar {
    grid-area: navbar;
    position: sticky;
    top: 0;
  }
}

/* Layout transitions */
.background-transition-on,
.background-transition-off {
  background-position: center;
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  transition: opacity var(--layout-default-transition-time) ease-in-out;
  width: 100%;
}

.background-transition-on {
  opacity: 1;
  z-index: -100;
  overflow: initial;
}

.background-transition-off {
  opacity: 0;
  z-index: -100;
  overflow: hidden;
}

.prose-transition-enter-active,
.prose-transition-leave-active {
  opacity: 1;
  transition:
    transform var(--layout-default-transition-time) ease-in-out,
    filter var(--layout-default-transition-time) ease-in-out,
    opacity var(--layout-default-transition-time) ease-in-out,
    background-color var(--layout-default-transition-time) ease-in-out;
  overflow: initial;
}

.prose-transition-enter-from,
.prose-transition-leave-to {
  opacity: 0;
  overflow: hidden;
}

.content-transition-enter-active,
.content-transition-leave-active {
  width: calc(100% - var(--layout-default-navbar-width));
  height: 100%;
  top: 0;
  left: 0;
  overflow: hidden;
  position: absolute;
  transition:
    transform var(--layout-default-transition-time) ease-in-out,
    filter var(--layout-default-transition-time) ease-in-out,
    background-color var(--layout-default-transition-time) ease-in-out,
    opacity var(--layout-default-transition-time) ease-in-out,
    width var(--layout-default-transition-time) ease-in-out;
}

.content-transition-enter-from,
.content-transition-leave-to {
  position: absolute;
  opacity: 0;

  .content-menu {
    width: 1px;
  }
}
</style>

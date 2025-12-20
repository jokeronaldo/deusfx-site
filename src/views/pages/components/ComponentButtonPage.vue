<script setup lang="ts">
import { computed, reactive } from 'vue'
import { html } from 'hybrids'
import { useComponentStore } from '@/stores/component'
import { useLayoutStore } from '@/stores/layout'

const componentStore = useComponentStore()
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

const categoryActive = 'basics'

const components = computed(() =>
  componentStore.components.filter((item) => item.category === categoryActive),
)

const data = reactive({
  componentTab: [],
  componentCategories: [],
})
</script>

<template>
  <div class="component-page w-full" v-page-body-style>
    <div class="p-4 text-right">Variants</div>
    <dfx-base
      padding="10px"
      style="--dfx-background-color-base-component: rgba(255, 255, 255, 0.03)"
    >
      <dfx-button variant="deus">deus</dfx-button>
      <dfx-button variant="ghost">ghost</dfx-button>
      <dfx-button variant="pill">pill</dfx-button>
      <dfx-button variant="duo-tone">duo tone</dfx-button>
      <dfx-button variant="material" material="mosaic">material</dfx-button>
      <dfx-button variant="link">link</dfx-button>
      <dfx-button variant="flat" color="purple">flat</dfx-button>
      <dfx-button variant="outline">outline</dfx-button>
    </dfx-base>
    <!--
    <dfx-list-blueprint />
     -->
    <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
    <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
    <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
    <div>08252717977</div>
  </div>
</template>

<style>
@layer layout-content {
  .component-page {
    position: relative;

    .components-menu {
      position:;
      border-left: rgba(255, 255, 255, 0.2) solid 1px;
      box-shadow: -100px -100px 10px 50px black;
    }
  }

  .component-tab ::part(dfx-tab) {
    -background-color: red;
  }
}
</style>

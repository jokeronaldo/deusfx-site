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
    <dfx-card material="bash" radius="none" width="100%">
      <div class="flex justify-between p-4">
        <div class="flex flex-row items-start justify-end">
          <div v-if="false" class="font-thin text-lg text-white" v-html="opt.data.title" />
        </div>
        <div class="flex font-thin text-white/90 prose prose-h1 prose-xl">
          <dfx-geometric-icon icon="dfx-cmp-base" is-prepend="true" />
          Base
        </div>
      </div>
    </dfx-card>
    <div>alow</div>
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
}
</style>

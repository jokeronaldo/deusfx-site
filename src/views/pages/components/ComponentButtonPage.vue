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
    <div class="sticky top-0">
      <dfx-card
        material="glassmorphism"
        radius="none"
        style="--dfx-glassmorphism-blur: 3px"
        width="100%"
      >
        <div class="border-white/10 border-b flex justify-between p-0">
          <div class="flex font-thin text-white/90 prose prose-h1 prose-xl p-4">
            <dfx-geometric-icon icon="dfx-cmp-button" isPrepend />
            Button
          </div>
          <div class="component-tab bg-blue-300/5 force-render">
            <dfx-tab
              part="dfx-tab"
              height="100%"
              width="100%"
              :items="[
                {
                  id: 'button-spec',
                  title: 'spec',
                },
                {
                  id: 'button-api',
                  title: 'api',
                },
                {
                  id: 'button-blueprints',
                  title: 'blueprints',
                },
              ]"
            />
          </div>
        </div>
        <div v-if="false" class="prose pb-4 px-4">
          <dfx-tab
            height="50px"
            width="100%"
            :items="[
              {
                id: 'button-spec',
                title: 'spec',
              },
              {
                id: 'button-api',
                title: 'api',
              },
              {
                id: 'button-blueprints',
                title: 'blueprints',
              },
            ]"
          />
        </div>
      </dfx-card>
    </div>
    <div class="p-4">
      <h1 class="p-0 m-0">Spec</h1>
      <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
      <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
      <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
      <div>08252717977</div>
    </div>
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

<script setup lang="ts">
import { computed, reactive } from 'vue'
import { html } from 'hybrids'
import { useComponentStore } from '@/stores/component'
import { useLayoutStore } from '@/stores/layout'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

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

const categoryComponents = computed(() =>
  componentStore.components.filter(
    (item) => item.category === componentStore.active.category.value,
  ),
)

const xx = (url) => {
  router.push(url)
}
</script>

<template>
  <div class="components-page h-full" v-page-body-style>
    <dfx-card
      width="100%"
      height="100%"
      material="none"
      style="--dfx-mode: 'convex'; --dfx-blur: 4; --dfx-intensity: 2; --dfx-distance: 10"
    >
      <div class="flex h-full">
        <div
          class="content-menu w-[300px] h-full p-0 components-menu sticky top-0"
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
              <div class="flex justify-between p-4 sticky top-0">
                <div class="flex font-thin text-white/90 prose prose-2xl">
                  <dfx-geometric-icon
                    :icon="componentStore.active.category.icon"
                    :shapesOverride="{
                      strokeColor: 'white',
                      strokeWidth: '1px',
                      opacity: [0.7, 0.8, 0.9, 1],
                      fillColor: ['rgba(255, 255, 255, 0.05)', 'rgba(255, 255, 255, 0.1)'],
                    }"
                  />
                  {{ componentStore.active.category.value }}
                </div>
                <div class="flex flex-row items-start justify-end"></div>
              </div>
              <div class="grow px-4 text-white w-full">
                <div class="sticky top-[80px]">
                  <dfx-list
                    @dfx-list-item-click="
                      (event) => {
                        router.push({ name: event.detail.routeName })
                      }
                    "
                    colorize
                    dividers
                    :items="categoryComponents"
                    :slotFunctions="{
                      itemasasda: (components) => {
                        return components.map((component) => {
                          return html`
                            <div
                              class=&quot;dfx-list-item${component.active
                                ? ' dfx-list-item-active'
                                : ''}&quot;
                              data-route-name=&quot;${JSON.stringify(component)}&quot;
                              onclick=&quot;this.getRootNode().host.itemUrlCallback(this)&quot;
                              style=&quot;cursor: pointer;&quot;
                            >
                              <div
                                style=&quot;margin-right: var(--dfx-spacing-md)&quot;
                                onmouseenter=&quot;this?._grid?.colorize()&quot;
                              >
                                <dfx-geometric-icon
                                  grid=&quot;${{
                                    rows: 3,
                                    columns: 3,
                                    slotHeight: '8px',
                                    slotWidth: '8px',
                                  }}&quot;
                                  icon=&quot;${component.icon}&quot;
                                  onmouseover=&quot;this?._grid?.colorize()&quot;
                                  shapesOverride=&quot;${{
                                    strokeColor: 'white',
                                  }}&quot;
                                />
                              </div>
                              <div>${component.title} ${component.url}</div>
                            </div>
                          `
                        })
                      },
                    }"
                    :blueprint="{
                      presentation: '{{#each items}}<div>{{this.title}}</div>{{/each}}',
                      composition: {
                        items: () => components,
                      },
                      definition: '',
                    }"
                  >
                  </dfx-list>
                </div>
              </div>
            </div>
          </dfx-card>
        </div>
        <div class="grow p-0 h-full">
          <dfx-card material="bash" height="100%" style="--dfx-material-bash-border-top: 0">
            <div class="sticky top-0 z-50">
              <dfx-card
                material="glassmorphism"
                radius="none"
                style="--dfx-glassmorphism-blur: 20px"
                width="100%"
              >
                <div class="border-white/10 border-b flex justify-between p-0">
                  <div class="flex font-thin text-white/90 prose prose-h1 prose-xl p-4">
                    <dfx-geometric-icon icon="dfx-cmp-button" isPrepend />
                    Button
                  </div>
                  <div class="component-tab force-render">
                    <dfx-tab
                      part="dfx-tab"
                      height="100%"
                      style="--dfx-background-color-tab-component: rgba(142, 197, 255, 0.05)"
                      width="100%"
                      :items="[
                        {
                          id: 'button-spec',
                          title: 'options',
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
            <router-view name="componentsView" v-slot="{ Component }">
              <transition name="component-page-transition" mode="out-in" :key="$route.path">
                <component :is="Component" />
              </transition>
            </router-view>
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
      background-color: red;
      border-left: rgba(255, 255, 255, 0.2) solid 1px;
      box-shadow: -100px -100px 10px 50px black;
    }
  }
}

.component-page-transition-enter-active,
.component-page-transition-leave-active {
  height: 100%;
  -top: 0;
  -left: 0;
  -overflow: hidden;
  -position: absolute;
  opacity: 1;
  transition: all 1s ease-in-out;
}

.component-page-transition-enter-from,
.component-page-transition-leave-to {
  -position: absolute;
  opacity: 0;

  .content-menu {
    width: 1px;
  }
}
</style>

<script setup lang="ts">
import { computed, ref, onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useComponentStore } from '@/stores/component'
import { $notify } from '../../../../../../deusfx/src/deusfx/components/singleton/index'
import { randomNumber } from '../../../../../../deusfx/src/deusfx/core/deusfx.helpers'
import { cssColorscheme } from '../../../../../../deusfx/src/deusfx/css/colorscheme'

const router = useRouter()
const componentStore = useComponentStore()

const categories = computed(() => {
  return componentStore.components.map((category) => {
    return {
      ...category,
      icons: { prepend: category.icon },
    }
  })
})

const addItem = () => {
  componentStore.components.push({
    category: 'whatever',
    icon: 'dfx-fmw-vue',
    id: 'dynamo',
    title: 'BOLAS',
  })

  console.log(categories)
}

const listSwitch = () => {
  orientation.value = orientation.value !== 'horizontal' ? 'horizontal' : 'vertical'
}

const orientation = ref()
const open = ref(false)
const listd = ref()
console.log(JSON.stringify(this))

//setTimeout(() => {
//  componentStore.components[2].icon = 'dfx-cmp-navigation'
//  console.log('mudar')
//}, 5000)
const swtref = ref()
const overref = ref()
const lesser = ref([
  {
    title: 'dropdown',
    id: 'ddalt',
    description: 'adh dasd iashDASHDASUHDHASHud',
  },
  {
    title: 'data table',
    id: 'data table',
  },
])
const ddOptions = ref([
  {
    title: 'dropdown',
    id: 'dropdown',
  },
  {
    title: 'data table',
    id: 'data table',
  },
  {
    title: 'table',
    id: 'table',
  },
  {
    title: 'grid',
    id: 'grid',
  },
  {
    title: 'panel',
    id: 'panel',
  },
  {
    title: 'popover',
    id: 'popover',
  },
  {
    title: 'navigation menu',
    id: 'navigation menu',
  },
  {
    title: 'context menu',
    id: 'context menu',
  },
  {
    title: 'pallete swatch',
    id: 'pallete swatch',
  },
  {
    title: 'droppable container',
    id: 'droppable container',
  },
  {
    title: 'chip',
    id: 'chip',
  },
  {
    title: 'divider',
    id: 'divider',
  },
  {
    title: 'badge',
    id: 'badge',
  },
  {
    title: 'padgination',
    id: 'padgination',
  },
])

const data = reactive({
  zumba: 'off',
  messages: [
    `nova not ouaHDUhash hdiah ihdaishidhias
        oiaSHDasHIUDH uiashiu hiudsahiuhdiu hasidhiashi dha
        asuisuiHDUIashIUHDihsaIHDiSAHIDhis nova not ouaHDUhash hdiah ihdaishidhias
        oiaSHDasHIUDH uiashiu hiudsahiuhdiu hasidhiashi dha
        asuisuiHDUIashIUHDihsaIHDiSAHIDhis
        `,
    'curta uma linha',
    `asuihd ihasH IdasuiHDihuasHUDIhiasu
        AIDOho HIDhuiasHUIDhasuid
        aSOIDhaosHDIuhashduiashuiHDIHAI`,
  ],
})
const zica = ref(false)
const drawerActive = ref('on')
//const colorScheme = ref('dark')

//setTimeout(() => (data.zumba = 'on'), 1000)

onMounted(() => {
  const style = document.createElement('style')
  style.textContent = cssColorscheme.cssText
  document.head.appendChild(style)
  //$notify.send({
  //  message: 'Teste',
  //})
})
</script>

<template>
  <div class="flex justify-evenly about">
    <dfx-drawer :is-active="drawerActive" @update="drawerActive = $event.detail.value">
      TESTE
      <br />
      <br />
      <br />
      <dfx-light-bulb></dfx-light-bulb>
    </dfx-drawer>
    <!-- Para Vue 3 com Custom Elements -->
    <div style="width: 400px; height: 50px">
      <div>
        <dfx-button variant="deus">asd</dfx-button>
        <dfx-button variant="link">asd</dfx-button>
        <dfx-button variant="pill">asd</dfx-button>
        <dfx-button variant="ghost">asd</dfx-button>
        <dfx-button variant="outline">asd</dfx-button>
        <dfx-button variant="flat">asd</dfx-button>
        <dfx-button variant="duo-tone">asd</dfx-button>
        <dfx-button variant="material" material="mosaic">asd</dfx-button>
        <!--
        -->
      </div>
      <div class="p-2">
        <dfx-input value="" />
      </div>
      <dfx-alert material="none">asdasasd</dfx-alert>
      <div class="p-2">
        <dfx-accordion .items="lesser" />
        <dfx-dropdown :options="ddOptions" />
      </div>
      <dfx-range />
      <dfx-tooltip text="teste 123"
        ><div>ola<br /><br />AAAAAA<br />BBb</div></dfx-tooltip
      >
      <div class="p-2">
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
      <div class="p-2">
        <dfx-button
          @click="
            $notify.send({
              title: 'teste ok de titulos para testes maiores do que o normal e ainda maior ainda',
              message: data.messages[randomNumber('0', '2')],
            })
          "
          >Nova notify</dfx-button
        >
        <dfx-button @click="drawerActive = drawerActive === 'off' ? 'on' : 'off'"
          >drawer {{ drawerActive }}</dfx-button
        >
      </div>
    </div>
    <dfx-overlay
      :is-active="data?.zumba"
      @on-close="data.zumba = 'off'"
      ref="overref"
      persistent="off"
    >
      <dfx-template slot="default">
        <dfx-window style="color: white" no-styles="off">
          <dfx-template slot="title">eu sou title</dfx-template>
          <dfx-template slot="default">
            <div style="padding: 8px; margin-bottom: 8px">
              <dfx-input value="" />
            </div>
            <div style="padding: 8px; margin-bottom: 8px">
              <dfx-input value="" />
            </div>
            <div style="padding: 8px; margin-bottom: 8px">
              <dfx-textarea value="" />
            </div>
            <div style="padding: 8px; margin-bottom: 8px">
              <dfx-input value="" />
            </div>
          </dfx-template>
        </dfx-window>
      </dfx-template>
    </dfx-overlay>
    <div class="p-2">
      <dfx-radio size="md" />
    </div>
    <div class="p-2">
      <dfx-switch
        size="md"
        ref="swtref"
        :is-active="data?.zumba"
        @update="
          ($event) => {
            console.log($event, 'doenca')
            data.zumba = $event.detail.value
          }
        "
      ></dfx-switch>
    </div>
    <div class="p-2">
      <dfx-checkbox />
    </div>
    <dfx-button variant="pill" @click="listSwitch()">switch {{ orientation }}</dfx-button>
    <dfx-list selectable :orientation="orientation" :items="ddOptions"></dfx-list>
    <dfx-list .items="categories" selectable ref="listd"></dfx-list>

    <dfx-button variant="deus" @click="data.zumba = 'on'">RESET</dfx-button>
    <dfx-button variant="deus" @click="addItem">NOVO</dfx-button>
    <dfx-button variant="deus" @click="componentStore.removeItem(listd)">REMOVE</dfx-button>
  </div>
</template>

<style>
body {
  background-color: var(--colorscheme-hex) !important;
}
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>

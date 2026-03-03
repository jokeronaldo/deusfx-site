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
    text: 'BOLAS',
  })
}

const listSwitch = () => {
  orientation.value = orientation.value !== 'horizontal' ? 'horizontal' : 'vertical'
}

const orientation = ref()
const open = ref(false)
const listd = ref()

//setTimeout(() => {
//  componentStore.components[2].icon = 'dfx-cmp-navigation'
//  console.log('mudar')
//}, 5000)
const swtref = ref()
const overref = ref()
const lesser = ref([
  {
    text: 'dropdown',
    value: 'ddalt',
    id: 'ddalt',
    description: 'adh dasd iashDASHDASUHDHASHud',
  },
  {
    text: 'data table',
    value: 'datatable',
    id: 'datatable',
  },
])
const ddOptions = ref([
  {
    text: 'dropdown',
    value: 'dropdown',
    id: 'dropdown',
  },
  {
    text: 'data table',
    value: 'datatable',
    id: 'datatable',
  },
  {
    text: 'table',
    value: 'table',
    id: 'table',
  },
  {
    text: 'grid',
    value: 'grid',
    id: 'grid',
  },
  {
    text: 'panel',
    value: 'panel',
    id: 'panel',
  },
  {
    text: 'popover',
    value: 'popover',
    id: 'popover',
  },
  {
    text: 'navigation menu',
    value: 'navigationmenu',
    id: 'navigationmenu',
  },
  {
    text: 'context menu',
    value: 'contextmenu',
    id: 'contextmenu',
  },
  {
    text: 'pallete swatch',
    value: 'palleteswatch',
    id: 'palleteswatch',
  },
  {
    text: 'droppable container',
    value: 'droppablecontainer',
    id: 'droppablecontainer',
  },
  {
    text: 'chip',
    value: 'chip',
    id: 'chip',
  },
  {
    text: 'divider',
    value: 'divider',
    id: 'divider',
  },
  {
    text: 'padgination',
    value: 'padgination',
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
    <dfx-drawer
      draggable="false"
      :is-active="drawerActive"
      @update="drawerActive = $event.detail.value"
    >
      TESTE
      <br />
      <br />
      <br />
      <dfx-light-bulb></dfx-light-bulb>
    </dfx-drawer>
    <!-- Para Vue 3 com Custom Elements -->
    <div style="width: 400px; height: 50px">
      <div>
        <dfx-button variant="deus">deus</dfx-button>
        <dfx-button variant="link">link</dfx-button>
        <dfx-button color="red" variant="pill" text-color="white">pill</dfx-button>
        <dfx-button variant="ghost">ghost</dfx-button>
        <dfx-button variant="outline" dfx-draggable="yes">outline</dfx-button>
        <dfx-button variant="flat">flat</dfx-button>
        <dfx-button variant="duo-tone" dfx-draggable="yes">duo-tone</dfx-button>
        <dfx-button variant="material" material="mosaic" dfx-draggable="yes" text-color="white"
          >material</dfx-button
        >
        <!--
        -->
      </div>
      <div class="p-2">
        <dfx-input value="" dfx-draggable="yes" />
      </div>
      <dfx-alert material="none" variant="warning" container="yes" dfx-draggable="yes"
        >asdasasd</dfx-alert
      >
      <div class="p-2">
        <dfx-accordion .items="lesser" />
        <dfx-dropdown .options="ddOptions" dfx-draggable="yes" multiple="yes" />
      </div>
      <dfx-range />
      <div class="p-10">
        <dfx-tooltip text="teste 123"
          ><div>
            ola<br /><br />AAAAAA<br /><dfx-badge positionVertical="bottom" dfx-draggable="yes"
              ><dfx-button variant="deus" draggable="false">BADGE</dfx-button></dfx-badge
            >
          </div></dfx-tooltip
        >
      </div>
      <div class="p-2">
        <dfx-tab
          height="50px"
          width="100%"
          :items="[
            {
              id: 'button-spec',
              text: 'spec',
            },
            {
              id: 'button-api',
              text: 'api',
            },
            {
              id: 'button-blueprints',
              text: 'blueprints',
            },
          ]"
        />
      </div>
      <div class="p-2">
        <dfx-button
          @click="
            $notify.send({
              text: 'teste ok de titulos para testes maiores do que o normal e ainda maior ainda',
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
      style="--overlay-z-index: 1101"
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
      <dfx-radio size="md" dfx-draggable="yes" />
    </div>
    <div class="p-2">
      <dfx-switch
        dfx-draggable="yes"
        size="md"
        ref="swtref"
        :is-active="data?.zumba"
        @update="
          ($event) => {
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

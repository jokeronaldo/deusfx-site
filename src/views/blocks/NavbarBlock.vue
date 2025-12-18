<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const links = ref([
  {
    iconSize: 64,
    iconUrl: '../../../public/icon-start-line.svg',
    iconHoverUrl: '../../../public/icon-start-duo-tone.svg',
    iconActiveUrl: '../../../public/icon-start.svg',
    name: 'guide',
    url: './guide',
  },
  {
    iconSize: 64,
    iconUrl: '../../../public/icon-components-line.svg',
    iconHoverUrl: '../../../public/icon-components-duo-tone.svg',
    iconActiveUrl: '../../../public/icon-components.svg',
    name: 'components',
    url: './components',
  },
  {
    iconSize: 64,
    iconUrl: '../../../public/icon-materials-line.svg',
    iconHoverUrl: '../../../public/icon-materials-duo-tone.svg',
    iconActiveUrl: '../../../public/icon-materials.svg',
    name: 'materials',
    url: './materials',
  },
  {
    iconSize: 64,
    iconUrl: '../../../public/icon-effects-line.svg',
    iconHoverUrl: '../../../public/icon-effects-duo-tone.svg',
    iconActiveUrl: '../../../public/icon-effects.svg',
    name: 'materials',
    url: './materials',
  },
  {
    iconSize: 64,
    iconUrl: '../../../public/icon-structures-line.svg',
    iconHoverUrl: '../../../public/icon-start-duo-tone.svg',
    iconActiveUrl: '../../../public/icon-start.svg',
    name: 'structures',
    url: './structures',
  },
  {
    iconSize: 64,
    iconUrl: '../../../public/icon-components.svg',
    iconHoverUrl: '../../../public/icon-start-duo-tone.svg',
    iconActiveUrl: '../../../public/icon-start.svg',
    name: 'machina',
    url: './machina',
  },
])

const iconSize = '32px'

const drawer = ref(null)

const openDrawer = () => {
  drawer.value.toggle()
}

const RightToolbarRef = ref(null)

const linkIconUrl = (link) => {
  if (linkHover.name === link.name && linkHover.url === link.url) {
    return linkHover.iconHoverUrl
  }

  if (linkActive.name === link.name && linkActive.url === link.url) {
    return linkActive.iconActiveUrl
  }

  return link.iconUrl
}

const isActive = (link) => {
  return link.name === linkActive.name && link.url === linkActive.url
}

const isHover = (link) => {
  return link.name === linkHover.name && link.url === linkHover.url
}

const isLink = (link) => {
  if (
    link.name !== linkHover.name &&
    link.url !== linkHover.url &&
    link.name !== linkActive.name &&
    link.url !== linkActive.url
  ) {
    return true
  }

  return false
}

const linkHover = reactive({
  iconSize: '',
  iconUrl: '',
  iconHoverUrl: '',
  iconActiveUrl: '',
  name: '',
  url: '',
})

const linkActive = reactive({})

const linkHoverEye = (link) => {
  //return
}

const linkHandle = (link) => {
  linkActive.iconUrl = link.iconUrl
  linkActive.iconHoverUrl = link.iconHoverUrl
  linkActive.iconActiveUrl = link.iconActiveUrl
  linkActive.name = link.name
  linkActive.url = link.url

  router.push(link.url)
}

onMounted(() => {
  //
})
</script>

<template>
  <div class="layout-navbar">
    <dfx-drawer
      v-if="RightToolbarRef"
      ref="drawer"
      :parentElement="RightToolbarRef"
      :anchor="RightToolbarRef"
      height="100vh"
      width="400px"
    >
      <div class="flex flex-col items-center">
        <div v-for="(link, index) in links" :key="index" class="pl-3 pt-4 w-full">
          <div
            :class="`links-icons relative h-[42px] w-[42px]`"
            icon
            material="none"
            size="xl"
            @mouseover="linkHoverEye(link)"
          >
            <button @click="linkHandle(link)">
              <img
                :class="`${isHover(link) ? 'on' : 'off'} dfx-hover absolute top-0 left-0 link-icon w-[42px] z-30`"
                :src="link.iconHoverUrl"
              />
              <img
                :class="`${isLink(link) ? 'on' : 'off'} dfx-link absolute top-0 left-0 h-full  w-full link-icon w-[42px] z-20`"
                :src="link.iconUrl"
              />
              <img
                :class="`${isActive(link) ? 'on' : 'off'} dfx-active absolute top-0 left-0 link-icon w-[42px] z-10`"
                :src="link.iconActiveUrl"
              />
            </button>
          </div>
        </div>
        <i class="icon-github" />
      </div>
      {{ linkIconUrl(linkHover) }}
    </dfx-drawer>
    <button @click="openDrawer()">drawer</button>
    <dfx-card
      ref="RightToolbarRef"
      border-radius="0"
      color-scheme="dark"
      height="100%"
      material="none"
      style="
        --dfx-glassmorphism-blur: 40px;
        --dfx-glassmorphism-background: rgba(255, 255, 255, 0.5);
      "
    >
    </dfx-card>
  </div>
</template>

<style>
@layer layout-navbar {
  :host {
  }

  .layout-default-navbar {
    position: relative;
    border-left: #0000ff50 solid 1px;
    overflow: hidden;
    -background-image: linear-gradient(to bottom, transparent 80%, rgba(0, 0, 255, 0.2));
  }
}

.links-icons {
  --dfx-link: on;
  --dfx-hover: off;
  --dfx-active: off;

  .dfx-link,
  .dfx-hover,
  .dfx-active {
    -opacity: 0;
    -background-color: white;

    &.off {
      opacity: 0;
    }

    &.on {
      opacity: 1;
    }
  }

  .dfx-link:hover {
    --dfx-hover: on;
    --dfx-link: off;
    background-color: red.;
  }

  .dfx-hover:hover,
  .dfx-hover::active {
    --dfx-hover: on;
    --dfx-link: off;
    background-color: red.;
  }

  .dfx-active:hover {
    --dfx-hover: on;
    --dfx-link: off;
    background-color: red.;
  }

  @container style(--dfx-hover: 'on') {
    .dfx-hover {
      opacity: 1;
    }
  }
}

.link-icon {
  transition:
    src 0.5s ease,
    transform @.5s ease,
    display 0.5s ease,
    opacity 0.5s ease;
}

.icon-github {
  display: inline-block;
  width: 48px;
  height: 48px;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='none' stroke='blue' stroke-linecap='round' stroke-linejoin='round' stroke-width='0.4' d='M6.517 17.113c.395.578 1.592 1.81 3.225 2.12M9.864 22C8.836 21.83 2 19.606 2 12.093C2 5.063 8.002 2 12 2c4 0 10 3.063 10 10.093c0 7.513-6.836 9.738-7.864 9.907c0 0-.21-3.417-.087-4.003c.122-.586-.294-1.528-.294-1.528c.971-.364 2.45-.884 2.945-2.282c.385-1.084.627-2.658-.45-4.138c0 0 .282-2.39-.25-2.484c-.533-.092-2.1.947-2.1.947c-.457-.13-1.476-.377-1.898-.333c-.423-.044-1.445.203-1.902.333c0 0-1.568-1.04-2.1-.947s-.25 2.484-.25 2.484c-1.077 1.48-.835 3.054-.45 4.138c.496 1.398 1.974 1.918 2.945 2.282c0 0-.416.942-.294 1.528S9.864 22 9.864 22'/%3E%3C/svg%3E");
}
</style>

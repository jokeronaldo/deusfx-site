import './assets/css/main.css'
import 'deusfx/src/components/index.ts'
import 'deusfx/src/index.ts'

import { createApp, onMounted } from 'vue'
import { createPinia } from 'pinia'
import { useLayoutStore } from '@/stores/layout'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

const layoutStore = useLayoutStore()

app.directive('page-body-style', {
  mounted() {
    if (layoutStore.bodyStyle) {
      const on = document.body.querySelector('.background-transition-on')

      if (!on) {
        return
      }

      const off = document.body.querySelector('.background-transition-off')

      Object.keys(layoutStore.bodyStyle).map(
        (prop) => (off.style[prop] = layoutStore.bodyStyle[prop]),
      )

      off?.classList.remove('background-transition-off')
      on?.classList.remove('background-transition-on')
      off?.classList.add('background-transition-on')
      on?.classList.add('background-transition-off')
    }
  },
})

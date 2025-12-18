import { createRouter, createWebHistory } from 'vue-router'
import ComponentsPage from '../views/pages/ComponentsPage.vue'
import MachinaPage from '../views/pages/MachinaPage.vue'
import GuidePage from '../views/pages/GuidePage.vue'
import GuideIntroductionPage from '../views/pages/guide/GuideIntroductionPage.vue'
import ComponentButtonPage from '../views/pages/components/ComponentButtonPage.vue'
import ComponentBasePage from '../views/pages/components/ComponentBasePage.vue'
import HomePage from '../views/pages/HomePage.vue'
import MaterialsPage from '../views/pages/MaterialsPage.vue'
import StructuresPage from '../views/pages/StructuresPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      meta: { layout: 'DefaultLayout' },
      component: HomePage,
    },
    {
      path: '/components',
      name: 'components',
      meta: { layout: 'DefaultLayout' },
      component: ComponentsPage,
      children: [
        {
          path: 'button',
          name: 'ComponentButton',
          meta: { layout: 'DefaultLayout' },
          components: {
            componentsView: ComponentButtonPage,
          },
        },
        {
          path: 'base',
          name: 'ComponentBase',
          meta: { layout: 'DefaultLayout' },
          components: {
            componentsView: ComponentBasePage,
          },
        },
      ],
    },
    {
      path: '/guide',
      name: 'guide',
      meta: { layout: 'DefaultLayout' },
      component: GuidePage,
      children: [
        {
          path: '/introduction',
          name: 'guideIntroduction',
          meta: { layout: 'DefaultLayout' },
          component: GuideIntroductionPage,
        },
      ],
    },
    {
      path: '/machina',
      name: 'machina',
      meta: { layout: 'DefaultLayout' },
      component: MachinaPage,
    },
    {
      path: '/materials',
      name: 'materials',
      meta: { layout: 'DefaultLayout' },
      component: MaterialsPage,
    },
    {
      path: '/structures',
      name: 'structures',
      meta: { layout: 'DefaultLayout' },
      component: StructuresPage,
    },
  ],
})

export default router

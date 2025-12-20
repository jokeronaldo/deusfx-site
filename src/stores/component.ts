import { computed, reactive, ref } from 'vue'
import { defineStore } from 'pinia'

export const useComponentStore = defineStore('component', () => {
  const active = ref({
    category: {
      value: 'basics',
      icon: 'dfx-cmp-basics',
      component: {
        value: 'accordion',
        tab: {
          value: 'options',
        },
      },
    },
  })
  const categories = ref([
    {
      icon: 'dfx-cmp-basics',
      id: 'basics',
      title: 'basics',
    },
    {
      icon: 'dfx-cmp-feedback',
      id: 'feedback',
      title: 'feedback',
    },
    {
      icon: 'dfx-cmp-data',
      id: 'data',
      title: 'data',
    },
    {
      icon: 'dfx-cmp-contents',
      id: 'contents',
      title: 'contents',
    },
    {
      icon: 'dfx-cmp-layout',
      id: 'Layout',
      title: 'Layout',
    },
    {
      icon: 'dfx-cmp-forms',
      id: 'forms',
      title: 'forms',
    },
    {
      icon: 'dfx-cmp-editors',
      id: 'editors',
      title: 'editors',
    },
    {
      icon: 'dfx-cmp-overlay',
      id: 'overlay',
      title: 'overlay',
    },
    {
      icon: 'dfx-cmp-navigation',
      id: 'navigation',
      title: 'navigation',
    },
  ])
  const components = ref([
    {
      category: 'basics',
      icon: 'dfx-cmp-accordion',
      id: 'accordion',
      title: 'accordion',
    },
    {
      category: 'basics',
      icon: 'dfx-cmp-base',
      id: 'base',
      title: 'base',
      routeName: 'ComponentBase',
    },
    {
      category: 'basics',
      icon: 'dfx-cmp-button',
      id: 'button',
      title: 'button',
      routeName: 'ComponentButton',
    },
    {
      category: 'basics',
      icon: 'dfx-edt-angelo',
      id: 'list',
      title: 'list',
    },
    {
      category: 'forms',
      icon: 'dfx-edt-angelo',
      id: 'inputs',
      title: 'inputs',
    },
    {
      category: 'forms',
      icon: 'dfx-edt-angelo',
      id: 'switchs',
      title: 'switchs',
    },
  ])

  return {
    active,
    categories,
    components,
  }
})

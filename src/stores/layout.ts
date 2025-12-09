import { computed, reactive, ref } from 'vue'
import { defineStore } from 'pinia'

export const useLayoutStore = defineStore('layout', () => {
  const bodyStyle = ref({
    backgroundBlendMode: 'normal',
    backgroundColor: 'white',
    backgroundImage: 'none',
  })
  const proseBlock = ref()
  const template = ref()

  return {
    bodyStyle,
    proseBlock,
    template,
  }
})

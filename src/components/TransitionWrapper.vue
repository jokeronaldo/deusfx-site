<template>
  <router-view name="componentsView" :key="$route.fullPath" v-slot="{ Component }">
    <transition name="content-transition" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<style scoped>
.content-transition-enter-active,
.content-transition-leave-active {
  transition: all 0.3s ease;
}

.content-transition-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.content-transition-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>

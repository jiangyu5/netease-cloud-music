<script setup>
import AppDetail from '../AppDetail/index.vue'
</script>

<template>
  <div class="app-main position-relative">
    <router-view v-slot="{ Component, route }">
      <keep-alive>
        <component :is="Component" :key="route.path"></component>
      </keep-alive>
    </router-view>
    <AppDetail />
  </div>
</template>

<style scoped></style>

<script setup>
import AppNav from "./components/AppNav/index.vue";
import AppMain from "./components/AppMain/index.vue";
import AppFooter from "./components/AppFooter/index.vue";
</script>

<template>
  <div class="container-fluid bg-dark text-light">
    <div class="row">
      <AppNav class="col-md-2 order-3 order-md-1" />
      <AppMain class="col-md-10 order-1 order-md-2" />
      <AppFooter class="order-2 order-md-3" />
    </div>
  </div>
</template>

<style lang="scss">
#app {
  height: inherit;
  margin: 0 auto;
  user-select: none;
  --app-footer-height: 65px;
  --app-nav-height: 70px;

  .app-main,
  .app-main .app-j-detail {
    height: calc(100vh - var(--app-footer-height) - var(--app-nav-height));
    overflow-y: auto;
  }
}

@media (min-width: 768px) {
  #app .app-main,
  #app .app-main .app-j-detail {
    height: calc(100vh - var(--app-footer-height));
  }
}

// 根据 .app-main 的宽进行调整
.app-j-detail {
  width: 100%;
  @media (min-width: 768px) {
    width: 41.66%;
  }
}
</style>

<script setup>
import PlayListDetail from "./component/PlayListDetail.vue";
import { usePlaylistStore } from "@/store/detail.js";

</script>

<template>
  <div class="app-j-detail-container col-12 col-sm-6 col-md-5">
    <Transition>
      <Suspense>
        <PlayListDetail />
      </Suspense>
    </Transition>
  </div>
</template>

<style scoped lang="less">
.app-j-detail-container {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9999;
}

.v-enter-active,
.v-leave-active {
  transition: transform 0.2s ease;
}

.v-enter-from,
.v-leave-to {
  transform: translate(100%);
}
</style>

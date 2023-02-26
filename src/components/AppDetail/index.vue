<script setup>
import { watch, ref } from "vue";
import { useRoute } from "vue-router";
import CommentDetail from "./component/CommentDetail.vue";
import PlayListDetail from "./component/PlaylistDetail.vue";

const route = useRoute();
const id = ref(null);
watch(
  () => route.query,
  (q) => {
    if (!q || q == {}) {
      return;
    }
    id.value = q.id;
  },
  { immediate: true }
);
</script>

<template>
  <div class="app-j-detail-container col-12 col-sm-6 col-md-5" v-if="id">
    <Transition>
      <Suspense>
        <div>
          <!-- <PlayListDetail :id="id" /> -->
          <!-- <CommentDetail :id="id" /> -->
        </div>
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

<script setup>
import { useDetailStore } from "../../store/detail";
import { storeToRefs } from "pinia";
import CommentDetail from "./component/CommentDetail.vue";
import PlayListDetail from "./component/PlaylistDetail.vue";
import Loading from "@/components/Loading/index.vue";
import { computed } from "vue";

const store = useDetailStore();
const { details } = storeToRefs(store);
const components = { playlist: PlayListDetail, comment: CommentDetail };

// const containerClass = computed(() => {
//   if (details.value.length == 1) {
//     return "col-12 col-md-5";
//   } else if (details.value.length > 1) {
//     return "col-12 col-md-10";
//   }
//   return "";
// });
</script>

<template>
  <!-- col-12 col-sm-6 col-md-5 -->
  <div class="app-j-detail-container bg-dark">
    <Suspense>
      <TransitionGroup name="details">
        <component
          v-for="detail in details"
          :is="components[detail.detail]"
          :id="detail.id"
          :key="detail.detail + detail.id"
        ></component>
      </TransitionGroup>
      <template #fallback>
        <Loading />
      </template>
    </Suspense>
  </div>
</template>

<style scoped lang="less">
.app-j-detail {
  position: fixed;
  z-index: 9999;
  top: 0;
  right: 50%;
  transition: all 0.2s ease-in;

  &:only-child,
  &:last-child {
    right: 0;
  }
}

.details-move,
.details-leave-active,
.details-enter-active {
  transition: all 0.17s ease;
}

.details-leave-active:nth-last-child(2) {
  right: 0;
}

.details-enter-from {
  transform: translateX(100%);
}

.details-leave-to {
  // 思考中
  transform: translateX(100%);
}
</style>

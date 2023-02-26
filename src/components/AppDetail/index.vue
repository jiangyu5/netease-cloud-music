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

const containerClass = computed(() => {
  if (details.value.length == 1) {
    return "col-12 col-md-5";
  } else if (details.value.length > 1) {
    return "col-12 col-md-10";
  }
  return "";
});
</script>

<template>
  <!-- col-12 col-sm-6 col-md-5 -->
  <div
    class="app-j-detail-container bg-dark position-fixed end-0 top-0"
    :class="containerClass"
  >
    <Suspense>
      <!-- <TransitionGroup name="details"> -->
      <component
        v-for="detail in details"
        :is="components[detail.detail]"
        :id="detail.id"
        :key="detail.detail + detail.id"
      ></component>
      <!-- </TransitionGroup> -->
      <template #fallback>
        <Loading />
      </template>
    </Suspense>
  </div>
</template>

<style scoped lang="less">
.app-j-detail-container {
  z-index: 9999;
//   transition: all 0.2s;

  & .app-j-detail {
    position: fixed;
    top: 0;
    right: 50%;
    z-index: 9999;
    // transition: all 0.2s;

    @media (max-width: 768px) {
      right: 0;
    }

    &:last-child {
      right: 0;
    }
  }
}

.details-move,
.details-enter-active,
.details-leave-active {
  transition: all 0.3s linear;
}

.details-enter-from,
.details-leave-to {
  transform: translateX(100%);
}
</style>

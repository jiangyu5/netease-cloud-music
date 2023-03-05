<script setup>
import { useDetailStore } from "../../store/detail";
import { storeToRefs } from "pinia";
import CommentDetail from "./component/CommentDetail.vue";
import PlayListDetail from "./component/PlaylistDetail.vue";
import Loading from "@/components/Loading/index.vue";

const store = useDetailStore();
const { details } = storeToRefs(store);
const components = { playlist: PlayListDetail, comment: CommentDetail };
</script>

<template>
  <!-- col-12 col-sm-6 col-md-5 -->
  <div class="app-j-detail-container bg-dark">
    <Suspense>
      <TransitionGroup name="details">
        <component
          v-for="detail in details"
          :class="detail.jclass || ''"
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
.app-j-detail-container {
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  z-index: 9999;
}

.app-j-detail {
  position: absolute;
  z-index: 9999;
  top: 0;
  right: 0;
  transform: translateX(-99.9%);
  transition: all 0.2s ease;

  @media (max-width: 768px) {
    transform: translateX(0);
  }

  &:only-child,
  &:last-child {
    transform: translateX(0);
  }
}

// 去往右侧
.static {
  transform: translateX(0) !important;
}

// 从右侧离开
.leave {
  transform: translateX(100%) !important;
}

// 从右外进入右侧
.enter {
  //   transform: translateX(100%);
  animation: enter 0.2s ease !important;
}

@keyframes enter {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0);
  }
}
</style>

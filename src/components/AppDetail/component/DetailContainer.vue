<script setup>
import { useRouter } from "vue-router";

const props = defineProps(["title"]);
const router = useRouter();

function back() {
  router.back();
}
</script>

<template>
  <div class="app-j-detail bg-dark">
    <div
      class="text-center pb-2 pt-4 sticky-top clearfix text-bg-dark border-bottom border-secondary"
    >
      <button
        class="d-inline-block float-start border-0 ms-1 text-bg-dark iconfont icon-gengduo"
        @click="back"
      ></button>
      {{ props.title }}
    </div>
    <slot></slot>
  </div>
</template>

<style scoped></style>

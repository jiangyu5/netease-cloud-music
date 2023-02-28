<script setup>
import { useDetailStore } from "@/store/detail";
import { storeToRefs } from "pinia";
import { computed } from "vue";

const store = useDetailStore();
const { details } = storeToRefs(store);
const { detailsBack } = store;

const props = defineProps(["title"]);
// const detailStyle = computed(() => {
//   if (details.value.length == 1) {
//     return "col-12 col-md-6";
//   } else if (details.value.length > 1) {
//     return "col-12 col-md-6";
//   }
//   return "";
// });
</script>

<template>
  <div class="app-j-detail col-12 col-md-6 bg-dark text-light">
    <div
      class="text-center pb-2 pt-4 sticky-top clearfix text-bg-dark border-bottom border-secondary"
    >
      <button
        class="d-inline-block float-start border-0 ms-1 text-bg-dark iconfont icon-gengduo"
        @click="detailsBack"
      ></button>
      {{ props.title }}
    </div>
    <slot></slot>
  </div>
</template>

<style scoped></style>

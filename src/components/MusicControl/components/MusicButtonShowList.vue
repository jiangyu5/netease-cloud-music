<script setup>
import MusicButton from "./MusicButton.vue";

import { ref } from "vue";

const props = defineProps({
  iconName: {
    type: String,
    default: "main",
  },
});

const wrapperState = ref(false);
function changeWrapperState() {
  wrapperState.value = !wrapperState.value;
}
</script>

<template>
  <MusicButton :icon-name="props.iconName" @collect="changeWrapperState">
    <div class="wrapper" v-show="wrapperState">
      <slot></slot>
    </div>
  </MusicButton>
</template>

<style scoped>
.music-button {
  position: relative;
}

.wrapper {
  position: absolute;
  z-index: 1;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  background-color: var(--main-3);
  color: var(--main-8);
}
</style>

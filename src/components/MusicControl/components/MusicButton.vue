<script setup>
const props = defineProps({
  iconName: {
    default: "main",
  },
});

const emits = defineEmits(["collect"]);
function triggerCollect() {
  emits("collect");
}
</script>

<template>
  <div class="music-button iconfont" @click="triggerCollect">
    <span :class="`icon-${props.iconName}`"></span>
    <slot></slot>
  </div>
</template>

<style scoped lang="less">
.music-button {
  display: inline-block;
  border-radius: 50%;
  font-size: 1.5em;

  span {
    height: 1em;
    line-height: 1em;
    border-radius: 50%;
  }
}
</style>

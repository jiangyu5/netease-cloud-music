<script setup>
const props = defineProps(['title']);
</script>

<template>
  <div v-if="props.title" class="d-flex justify-content-between my-2">
    <span class="fs-5">{{ props.title }}</span>
    <span class="text-secondary" style="font-size: 0.5em">更多&ensp;&gt;</span>
  </div>
  <slot></slot>
</template>

<style scoped></style>

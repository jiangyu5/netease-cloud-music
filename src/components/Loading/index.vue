<script setup>
</script>

<template>
  <div class="position-absolute top-50 start-50 translate-middle text-center">
    <div class="spinner-border text-primary" role="status"></div>
    <div class="text-secondary mt-2"><slot>loading...</slot></div>
  </div>
</template>

<style scoped></style>

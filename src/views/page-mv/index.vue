<script setup>
import JingXuan from "./views/JingXuan/index.vue";
import Loading from "@/components/Loading/index.vue";
</script>

<template>
  <Suspense>
    <JingXuan />
    <template #fallback>
      <Loading />
    </template>
  </Suspense>
</template>

<style scoped></style>

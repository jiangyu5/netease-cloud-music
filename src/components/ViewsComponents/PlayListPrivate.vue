<script setup>
import PlayListContainer from "./PlayListContainer.vue";

// {picUrl, name}
const props = defineProps(["title", "data"]);
</script>

<template>
  <PlayListContainer :title="props.title">
    <div class="d-flex flex-row flex-wrap gap-1 justify-content-between">
      <figure
        class="j-figure figure col-xl-3 position-relative"
        v-for="(i, index) in props.data"
        :key="index"
      >
        <img :src="i.picUrl" class="figure-img img-fluid" />
        <figcaption class="figure-caption text-light">
          {{ i.name }}
        </figcaption>
      </figure>
    </div>
  </PlayListContainer>
</template>

<style scoped lang="less">
.j-figure {
  width: 30%;

  @media (max-width: 992px) {
    width: 30%;
  }

  @media (max-width: 768px) {
    width: 28%;
  }
  @media (max-width: 576px) {
    width: 48%;
  }
}
</style>

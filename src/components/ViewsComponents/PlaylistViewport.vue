<script setup>
import axios from "axios";
import { computed } from "vue";

const props = defineProps(["title", "data"]);
const playCount = computed(()=>{
    console.log()
})

function getNumber(count, n=0) {
    let willRes = ''
}
</script>

<template>
  <div class="">
    <div>
      <span>{{ props.title }}</span>
      <span>更多></span>
    </div>
    <div class="d-flex flex-row flex-wrap gap-1 justify-content-between">
      <figure
        class="j-figure figure col-3 col-sm-2 position-relative"
        v-for="i in props.data"
      >
        <img :src="i.picUrl" class="figure-img img-fluid" />
        <figcaption class="figure-caption">
          {{ i.name }}
        </figcaption>
        <span class="d-block position-absolute right-0 top-0" style="font-size: .6em;">{{
          i.playCount
        }}</span>
      </figure>
    </div>
  </div>
</template>

<style scoped lang="less">
.j-figure {
  @media (max-width: 576px) {
    width: 30%;
  }
}
</style>

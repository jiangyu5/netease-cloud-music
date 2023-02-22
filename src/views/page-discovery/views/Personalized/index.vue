<script setup>
import axios from "axios";
import PlaylistViewport from "../../../../components/ViewsComponents/PlaylistViewport.vue";
import TopSlide from "../../components/TopSlide.vue";

let res = await axios("/api/personalized?limit=15");
const data = res.data.result;
console.log(data)
</script>

<template>
  <TopSlide />
  <PlaylistViewport title="推荐歌单" :data="data" />
</template>

<style scoped></style>

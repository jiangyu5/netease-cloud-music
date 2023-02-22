<script setup>
import ViewNav from "../../components/ViewsComponents/ViewNav.vue";
import Loading from "../../components/Loading/index.vue";

const navs = [
  { title: "推荐", url: "personalized" },
  { title: "歌单", url: "playlist" },
  { title: "电台", url: "dj" },
  { title: "排行榜", url: "toplist" },
  { title: "新歌", url: "newsong" },
];
</script>

<template>
  <ViewNav :navs="navs" />
  <Suspense>
    <div class="pt-3">
      <router-view> </router-view>
    </div>
    <template #fallback>
      <Loading />
    </template>
  </Suspense>
</template>

<style scoped></style>

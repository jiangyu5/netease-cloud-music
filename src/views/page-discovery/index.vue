<script setup>
import ViewNav from "../../components/ViewsComponents/ViewNav.vue";
import Loading from "../../components/Loading/index.vue";

const navs = [
  { title: "推荐", url: "/discovery/personalized" },
  { title: "歌单", url: "/discovery/playlist" },
  { title: "电台", url: "/discovery/dj" },
  { title: "排行榜", url: "/discovery/toplist" },
  { title: "新歌", url: "/discovery/newsong" },
];

</script>

<template>
  <ViewNav :navs="navs" />
  <Suspense>
    <div class="pt-3">
      <router-view></router-view>
    </div>
    <template #fallback>
      <Loading />
    </template>
  </Suspense>
</template>

<style scoped></style>

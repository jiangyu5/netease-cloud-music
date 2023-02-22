<script setup>
import axios from "axios";
import PlayListPrivate from "../../../../components/ViewsComponents/PlayListPrivate.vue";
import PlayListSingle from "../../../../components/ViewsComponents/PlayListSingle.vue";
import PlayListSong from "../../../../components/ViewsComponents/PlayListSong.vue";
import TopSlide from "../../components/TopSlide.vue";

// 推荐歌单
let cookie = localStorage.getItem("cookie");
let res = await axios({ url: "/api/recommend/resource", data: { cookie } });
let song = res.data.recommend;

let res1 = await axios("/api/personalized?limit=12");
res1.data.result.forEach((e) => song.push(e));

// 独家放送
let res2 = await axios(
  "/api/personalized/privatecontent/list?limit=6&offset=0"
);
const privatecontent = res2.data.result;

// 最新音乐
let res3 = await axios("/api/personalized/newsong?limit=10");
const newsong = res3.data.result;
</script>

<template>
  <TopSlide />
  <PlayListSong title="推荐歌单" :data="song" />
  <PlayListPrivate title="独家放送" :data="privatecontent" />
  <PlayListSingle title="最新音乐" :data="newsong" />
</template>

<style scoped></style>

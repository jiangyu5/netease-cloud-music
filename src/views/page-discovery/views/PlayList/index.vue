<script setup>
import axios from "axios";
import PlayListSong from "../../../../components/ViewsComponents/PlayListSong.vue";

let res = await axios("/api/top/playlist?limit=20");
const dataTemp = res.data.playlists;
const data = [];

dataTemp.forEach((el) => {
  const { name, coverImgUrl, playCount, creator } = { ...el };
  const { nickname, avatarUrl, avatarbackgroundUrl, vipType } = { ...creator };

  data.push({
    name,
    playCount,
    picUrl: coverImgUrl,
    creator: { nickname, avatarUrl, avatarbackgroundUrl, vipType },
  });
});
</script>

<template>
  <PlayListSong title="全部歌单" :data="data" />
</template>

<style scoped></style>

<script setup>
import axios from "axios";
import PlaListSingle from "../../ViewsComponents/PlayListSingle.vue";
import { useCount } from "@/hook/useTools.js";
import DetailContainer from "./DetailContainer.vue";

const props = defineProps(["id"]);
let res = await axios(`/api/playlist/detail?id=${props.id}`);
let dataPlaylist = res.data.playlist;
const {
  id,
  name,
  creator,
  tracks,
  coverImgUrl,
  commentCount,
  subscribedCount,
  shareCount,
} = {
  ...dataPlaylist,
};
const songList = tracks.map((el) => {
  const { name, ar, sq } = { ...el };
  let artists = ar.map((e) => {
    return { name: e.name };
  });
  return {
    name,
    song: { artists, sqMusic: sq ? true : null },
  };
});
</script>

<template>
  <DetailContainer title="歌单">
    <div class="position-relative text-bg-secondary">
      <!-- 背景玻璃 -->
      <div
        class="position-absolute w-100 h-100 text-bg-secondary j-blur"
        style="--bs-bg-opacity: 0.8"
      ></div>
      <!-- ## 歌单信息 -->
      <div class="d-flex align-items-center gap-3 p-3">
        <!-- 歌单图片 -->
        <img
          :src="coverImgUrl"
          class="d-blcok"
          style="width: 100px; height: 100px"
        />
        <!-- 右侧信息 -->
        <div>
          <div class="mb-3">{{ name }}</div>
          <div style="font-size: 0.8em">
            <img
              :src="creator.avatarUrl"
              class="d-inline-block rounded-circle text-bg-secondary align-middle me-1"
              style="width: 2em; height: 2em"
            />{{ creator.nickname }}&ensp;&gt;
          </div>
        </div>
      </div>
      <!-- ## 歌单操作 -->
      <div class="d-flex justify-content-around py-2 text-center">
        <div>
          <span class="iconfont icon-shoucang"></span>
          <div>{{ useCount(subscribedCount) }}</div>
        </div>
        <div>
          <span class="iconfont icon-pinlun"></span>
          <div>{{ useCount(commentCount) }}</div>
        </div>
        <div>
          <span class="iconfont icon-fenxiang"></span>
          <div>{{ useCount(shareCount) }}</div>
        </div>
        <div>
          <span class="iconfont icon-xiazai"></span>
          <div>下载</div>
        </div>
      </div>
    </div>

    <!-- # 列表 -->
    <div>
      <PlaListSingle :data="songList" direction="column" />
    </div>
  </DetailContainer>
</template>

<style scoped lang="less">
.j-blur {
  z-index: -1;
  -webkit-backdrop-filter: blur(8px);
  backdrop-filter: blur(8px);
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.2);
}

.iconfont {
  font-size: 1.5em !important;

  & + div {
    font-size: 0.5em;
  }
}
</style>

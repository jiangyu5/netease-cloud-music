<script setup>
import Loading from "@/components/Loading/index.vue";
import PlaListSingle from "../../ViewsComponents/PlayListSingle.vue";
import { usePlaylistStore } from "@/store/detail.js";
import { toRefs } from "vue";
import { storeToRefs } from "pinia";

const store = usePlaylistStore();
const playlist = storeToRefs(store);
const { playlistStatus, getPlaylistDataRef } = store;

const data = await getPlaylistDataRef();
const { name, creator, songList, coverImgUrl } = toRefs(data);
</script>

<template>
  <div v-show="playlist.status.value" class="app-j-detail text-bg-dark">
    <div v-show="playlist.code.value">
      <!-- # 基本信息与个人操作区 -->
      <div
        class="text-center pb-2 pt-4 sticky-top clearfix text-bg-dark border-bottom border-secondary"
      >
        <button
          class="d-inline-block float-start border-0 ms-1 text-bg-dark iconfont icon-gegnduo"
          @click="playlistStatus()"
        ></button>
        歌单
      </div>
      <div class="position-relative">
        <!-- 背景玻璃 -->
        <div
          class="position-absolute w-100 h-100 text-bg-secondary j-blur"
          style="--bs-bg-opacity: 0.8"
        ></div>
        <!-- ## 歌单信息 -->
        <div class="d-flex align-items-center gap-3 p-3 text-bg-secondary">
          <!-- 歌单图片 -->
          <!-- <div class="text-bg-secondary" style="width: 100px; height: 100px"></div> -->
          <img
            :src="coverImgUrl"
            class="d-blcok"
            style="width: 100px; height: 100px"
          />
          <div class="">
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
      </div>

      <!-- # 列表 -->
      <div>
        <PlaListSingle :data="songList" direction="column" />
      </div>
    </div>

    <Loading v-show="!playlist.code.value" />
  </div>
</template>

<style scoped>
.j-blur {
  z-index: -1;
  -webkit-backdrop-filter: blur(8px);
  backdrop-filter: blur(8px);
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.2);
}
</style>

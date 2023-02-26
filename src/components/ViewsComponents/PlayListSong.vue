<script setup>
import PlayListContainer from "./PlayListContainer.vue";
import { useRouter } from "vue-router";
import { useCount } from "../../hook/useTools";
import { useDetailStore } from "@/store/detail";

const store = useDetailStore();
const { detailsPush } = store;

// data = >[{}]
// {id, playcount,picUrl, creator: {nickname, vipType,},  }
const props = defineProps(["title", "data", "showCreator"]);

const router = useRouter();

function getDetail(index) {
  detailsPush("playlist", props.data[index].id);
}
</script>

<template>
  <PlayListContainer :title="props.title">
    <div class="d-flex flex-row flex-wrap gap-1 justify-content-between">
      <figure
        class="j-figure figure col-3 col-sm-2 position-relative"
        v-for="(i, index) in props.data"
        :key="index"
        @click="getDetail(index)"
      >
        <div class="position-relative">
          <img :src="i.picUrl" class="d-block figure-img img-fluid" />
          <!-- 左下角作者 -->
          <div
            v-if="i.creator && props.showCreator"
            class="position-absolute start-0 bottom-0 px-2 d-flex align-items-center"
            style="transform: scale(0.8) translateX(-15%)"
          >
            <div class="j-name-label d-inline-block">
              <span class="iconfont icon-zhanghao pe-1"></span>
              {{ i.creator.nickname }}
            </div>
            <span
              v-if="i.creator.vipType == 11"
              class="text-danger fw-bold fs-5"
              style="transform: translateX(20%)"
              >V</span
            >
          </div>
        </div>
        <figcaption class="figure-caption text-light">
          {{ i.name }}
        </figcaption>

        <!-- 右上角播放量 -->
        <div
          class="position-absolute end-0 top-0 px-2"
          style="font-size: 0.5em; --bs-bg-opacity: 0.2"
        >
          <span class="d-inline-block iconfont icon-main"></span>
          <span>
            {{ useCount(i.playCount || i.playcount) }}
          </span>
        </div>
      </figure>
    </div>
  </PlayListContainer>
</template>

<style scoped lang="less">
.j-figure {
  cursor: pointer;
  overflow: hidden;
  @media (max-width: 1024px) {
    width: 20%;
  }
  @media (max-width: 576px) {
    width: 30%;
  }
}

.j-name-label {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  @media (max-width: 576px) {
    max-width: 120px;
  }
  @media (max-width: 400px) {
    max-width: 90px;
  }
}
</style>

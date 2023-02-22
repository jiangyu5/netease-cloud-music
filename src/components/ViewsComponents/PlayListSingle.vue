<script setup>
import PlayListContainer from "./PlayListContainer.vue";
const props = defineProps(["title", "data"]);

// 歌手
function getArtists(index) {
  let ls = props.data[index].song.artists;
  if (!ls) return "";
  return ls.reduce((a, e) => {
    return a + e.name + " ";
  }, "");
}

// SQ
function getSQ(index) {
  if (!props.data[index].song.sqMusic) return "";
  return "SQ";
}
</script>

<template>
  <PlayListContainer :title="props.title">
    <div class="d-flex flex-row flex-wrap">
      <div
        class="j-figure d-flex gap-0 align-items-center col-12 col-sm-6 figure position-relative"
        v-for="(i, index) in props.data"
        :key="index"
      >
        <!-- 序号 -->
        <span
          class="d-inline-block text-center"
          style="color: var(--main-5); width: 2em"
          >{{ index + 1 }}</span
        >
        <!-- 图片 -->
        <img
          :src="i.picUrl"
          class="j-img d-block col-1 figure-img img-fluid my-2 me-2"
        />
        <!-- 歌名、歌手与专辑 -->
        <div class="d-flex flex-column figure-caption text-light">
          <div>{{ i.name }}</div>
          <div>
            <span
              v-if="getSQ(index)"
              class="d-inline-block text-danger border border-2 border-danger rounded-1 px-1 fw-bold ms-0"
              style="transform: scale(0.6)"
              >{{ getSQ(index) }}</span
            >
            <span>
              {{ getArtists(index) }}
            </span>
          </div>
        </div>
        <!-- 更多 -->
        <span
          class="iconfont icon-gengduov position-absolute top-50 end-0 translate-middle"
          style="color: var(--main-5)"
        ></span>
      </div>
    </div>
  </PlayListContainer>
</template>

<style scoped lang="less">
.j-img {
  min-width: 45px;
  width: 10%;
}
</style>

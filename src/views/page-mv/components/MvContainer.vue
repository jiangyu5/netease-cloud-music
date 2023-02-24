<script setup>
const props = defineProps(["title", "data", "hasMainPic"]);

function getPlayCount(playCount) {
  const unit = ["", "万", "亿", "兆", "京"];
  const [count, unitIndex] = getNumber(playCount);
  return count.toFixed(1) + unit[unitIndex];
}

function getNumber(count, n = 0) {
  if (count < 10000) {
    return [count, n];
  } else {
    let willCount = count / 10000;
    n++;
    return getNumber(willCount, n);
  }
}
</script>

<template>
  <!-- # 标题 -->
  <div class="d-flex justify-content-between align-items-center mb-2 mt-4">
    <span class="fs-5"
      ><span
        class="d-inline-block text-bg-danger border border-2 border-danger rounded-2"
        style="transform: scale(0.3, 0.7)"
        >&ensp;</span
      >{{ props.title }}</span
    >
    <span class="text-secondary" style="font-size: 0.5em">更多&ensp;&gt;</span>
  </div>

  <!-- # 容器 -->
  <div
    class="j-figure-container d-flex flex-wrap gap-2"
    :class="{ 'j-figure-container-main': props.hasMainPic }"
  >
    <!-- ## mv 卡片 -->
    <figure
      class="j-figure figure position-relative"
      v-for="(i, index) in props.data"
      :key="index"
    >
      <span
        class="iconfont icon-mv position-absolute end-0"
        style="transform: scale(0.7) translateX(15%)"
        >{{ getPlayCount(i.playCount) }}</span
      >
      <img :src="i.picUrl" class="d-block figure-img img-fluid" />
      <figcaption class="j-figcaption figure-caption text-light py-2">
        {{ i.name }}
      </figcaption>
    </figure>
  </div>
</template>

<style scoped lang="less">
.j-figure-container {
  display: grid !important;
  grid-template-columns: repeat(4, minmax(10%, 22%));
  grid-template-rows: auto auto;
  grid-auto-flow: row;
  justify-content: space-between;
  height: auto;
  gap: 2em;

  .j-figure {
    width: 100%;
    height: 100%;
    overflow: hidden;

    img {
      width: 100%;
      object-fit: cover;
    }
  }
  @media (max-width: 576px) {
    height: auto;
    grid-template-columns: repeat(2, minmax(40%, 50%));
    grid-template-rows: auto auto;
  }
}

.j-figure-container-main {
  grid-template-columns: repeat(4, minmax(10%, 22%));
  grid-auto-flow: column;
  height: 200px;

  .j-figure {
    img {
      height: 100%;
    }
  }
  .j-figure:first-child {
    grid-area: span 2 / span 2;
  }
  @media (max-width: 576px) {
    grid-template-columns: repeat(2, minmax(40%, 50%));

    .j-figure:first-child {
      grid-area: 1;
    }

    .j-figure:last-child {
      display: none;
    }
  }

  .j-figcaption {
    position: absolute;
    bottom: 1em;
    left: 0.5em;
    z-index: 99;
  }
}
</style>

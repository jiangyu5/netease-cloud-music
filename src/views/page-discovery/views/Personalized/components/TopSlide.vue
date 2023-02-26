<script setup>
import axios from "axios";
import { reactive, onUnmounted } from "vue";

let res = await axios("/api/banner?type=3");
const data = res.data.banners.map((e) => {
  const { typeTitle, pic, song } = { ...e };
  return { typeTitle, pic, song };
});

// 动画
let timer;
const aniLength = data.length;
const aniData = reactive([
  ...data.map((e, index) => {
    return { n: index, o: index, name: "", active: "" }; // n:动画位置，o: 原位置
  }),
]);
function setClassName() {
  for (let i = 0; i < aniLength; i++) {
    let el = aniData[i];
    if (el.n > 0) {
      el.n--;
    } else {
      el.n = aniLength - 1;
    }
    el.name = "j-slid-" + aniData[i].n;
    if (el.n != 3) {
      el.active = "";
    } else {
      el.active = "active";
    }
  }
}

// 鼠标点击圆点
function dotAnchor(index) {
  let gap = aniLength + 3 - index;
  for (let i = 0; i < aniLength; i++) {
    let tempN = i + gap;
    aniData[i].n = (tempN % aniLength) + 1; // 加 1， setClassName() 自减
  }
  setClassName();
}

function setTimer() {
  timer = setInterval(() => setClassName(), 5000);
}

function clearTimer() {
  clearInterval(timer);
}

setClassName();
setTimer();

onUnmounted(() => {
  clearInterval(timer);
});
</script>

<template>
  <div class="position-relative j-top-slid">
    <div class="j-pic-container">
      <div
        v-for="(d, index) in data"
        class="j-pic"
        :key="index"
        :class="aniData[index].name"
      >
        <img :src="d.pic" alt="" />
        <span class="j-type-title">{{ d.typeTitle }}</span>
      </div>
    </div>
    <div
      class="j-dot-container"
      @mouseenter="clearTimer"
      @mouseleave="setTimer"
    >
      <span
        class="j-dot"
        v-for="(d, index) in data"
        style="width: 0.6em; height: 0.6em"
        :class="aniData[index].active"
        @click="dotAnchor(index)"
      ></span>
    </div>
  </div>
</template>

<style scoped lang="less">
.j-top-slid {
  --pic-width: 566px;
  --pic-height: 220px;
  @media (max-width: 768px) {
    --pic-width: 347.5px;
    --pic-height: 135.14px;
  }
  @media (max-width: 576px) {
    --pic-width: 278px;
    --pic-height: 108.1px;
  }
  .j-pic-container {
    position: relative;
    height: var(--pic-height);
    width: 100%;
    overflow: hidden;
    .j-pic {
      position: absolute;
      width: var(--pic-width);
      height: var(--pic-height);
      background-color: var(--main-5);
      transition: all 0.5s;

      left: 100%;
      transform: translateX(0);
      display: none;
      img {
        display: block;
        width: 100%;
      }
    }

    // 防闪现
    .j-slid-0 {
      display: none;
      left: 0;
      transform: translateX(-120%) scale(0.8);
    }

    // 1 从左侧出去
    .j-slid-1 {
      display: block;
      left: 0;
      transform: translateX(-120%) scale(0.8);
    }

    // 2 从中间到左
    .j-slid-2 {
      opacity: 1;
      display: block;
      left: 0;
      transform: translateX(-20%) scale(0.8);
    }

    // 3 从 左到中间
    .j-slid-3 {
      display: block;
      left: 50%;
      transform: translateX(-50%) scale(1);
      z-index: 999;
    }

    // 4 从右外进入
    .j-slid-4 {
      display: block;
      left: 100%;
      transform: translateX(-80%) scale(0.8);
    }

    .j-type-title {
      display: block;
      position: absolute;
      bottom: 0;
      right: 0;
      transform: translate(0.25em, -0.25em);
      font-size: 0.7em;
      background-color: var(--mid-2);
      padding-left: 0.8em;
      padding-right: 0.5em;
      border-top-left-radius: 9px;
      border-bottom-left-radius: 9px;
    }
  }

  .j-dot-container {
    text-align: center;
    width: fit-content;
    margin: 0.5em auto;
    .j-dot {
      display: inline-block;
      width: 0.4em;
      height: 0.4em;
      background-color: var(--main-5);
      border-radius: 50%;
      margin: 0 0.3em;

      &:hover {
        cursor: pointer;
      }
    }
    .active {
      background-color: var(--mid-1);
    }
  }
}
</style>

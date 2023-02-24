<script setup>
import { ref, onUnmounted, onMounted } from "vue";
import axios from "axios";
import Loading from "@/components/Loading/index.vue";
import { useLoginStore } from "../../../store/login";

// 加载状态
const isLoading = ref(true);
const loadingContant = ref("已登录");

// 登出
const store = useLoginStore();
const { logout } = store;

// 数据
const cookie = localStorage.getItem("cookie");
let res = await axios({
  url: `/api/user/account`,
  method: "post",
  data: {
    cookie,
  },
});
const { nickname, avatarUrl, backgroundUrl } = { ...res.data.profile };
const profile = { nickname, avatarUrl, backgroundUrl };

setTimeout(() => {
  loadingContant.value = "请稍后";
}, 500);

onMounted(() => {
  setTimeout(() => {
    isLoading.value = false;
  }, 1000);
});

// 时间
const time = ref("");
const timer = setInterval(() => {
  time.value = new Date().toLocaleTimeString("zh-CN");
}, 1000);

onUnmounted(() => {
  clearInterval(timer);
});
</script>

<template>
  <Loading v-show="isLoading">{{ loadingContant }}</Loading>
  <div
    v-show="!isLoading"
    class="col-10 col-sm-6 col-md-5 position-absolute top-50 start-50 translate-middle rounded-3 text-bg-light overflow-hidden"
  >
    <img
      class="d-block position-absolute top-0 s-0"
      :src="profile.backgroundUrl"
      style="width: 100%; z-index: -1"
    />
    <div class="text-light d-flex justify-content-between align-items-end p-3">
      <div class="fw-bold d-flex align-items-end">
        <img
          class="d-inline-block text-bg-danger rounded-circle"
          style="width: 6em; height: 6em"
          :src="profile.avatarUrl"
        />
        <span class="ps-2">{{ profile.nickname }}</span>
      </div>
      <div>{{ time }}</div>
    </div>
    <div class="p-3 text-bg-light" style="text-indent: 2em">
      我偷偷地碰了你一下，不料你像蒲公英一样散开，此后到处都是你的模样。
    </div>

    <!-- 操作区 -->
    <div class="j-control">
      <button
        type="button"
        @click="logout"
        class="j-button border-0 rounded-1 d-block my-3 ms-auto me-3 bg-transparent position-relative"
      >
        登出
      </button>
    </div>
  </div>
</template>

<style scoped lang="less">
.j-control {
  .j-button {
    cursor: pointer;

    display: block;
    position: relative;
    &::before {
      display: block;
      content: "";
      position: absolute;
      height: 60%;
      bottom: -10%;
      left: -5%;
      width: 110%;
      background-color: rgba(255, 99, 71, 0.577);
      z-index: -1;
      border-radius: 0;
      transition: all 0.3s;
    }

    &:hover {
      &::before {
        width: 120%;
        height: 150%;
        left: -10%;
        bottom: -25%;
        border-radius: 50%;
        transform: rotateZ(-30deg);
        background-color: tomato;
      }
    }
  }
}
</style>

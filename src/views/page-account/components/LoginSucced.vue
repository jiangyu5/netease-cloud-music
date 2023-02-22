<script setup>
import { ref, onUnmounted, computed } from "vue";
// import { setProfile } from "..";

// 用户信息
// 默认使用登录时保存的个人信息
// setProfile(); // 更新数据

const profile = JSON.parse(localStorage.getItem("profile"));

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
  <div
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
  </div>
</template>

<style scoped></style>

<script setup>
import MusicButton from "./components/MusicButton.vue";
import MusicProgressBar from "./components/MusicProgressBar.vue";
const iconsLeft = [
  { icon: "shangyiqu", class: "d-none d-sm-inline-block" },
  { icon: "bofang", class: "" },
  { icon: "xiayiqu", class: "d-none d-sm-inline-block" },
];

const iconsRight = [
  { icon: "jiarushoucang", class: "" },
  { icon: "xiazai", class: "d-none d-md-inline-block" },
  { icon: "danquxunhuan", class: "d-none d-md-inline-block" },
  { icon: "bofangliebiao", class: "d-none d-sm-inline-block" },
];

function track(name) {
  console.log(name);
}
</script>

<template>
  <div
    class="music-control container p-2"
    style="background-color: var(--main-8)"
  >
    <div
      class="d-flex flex-row text-center align-items-center justify-content-evenly gap-3"
    >
      <div class="text-bg-danger" style="width: 50px; height: 50px"></div>
      <MusicButton
        @collect="track(i)"
        v-for="item in iconsLeft"
        :icon-name="item.icon"
        :class="item.class"
      ></MusicButton>
      <MusicProgressBar class="col-7 col-sm-6" />
      <MusicButton
        @collect="track(i)"
        v-for="item in iconsRight"
        :icon-name="item.icon"
        :class="item.class"
      ></MusicButton>
    </div>
  </div>
</template>

<style scoped lang="less">
.music-control {
}
</style>

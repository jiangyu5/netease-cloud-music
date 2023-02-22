<script setup>

const data = [
  { title: "发现", icon: "main", to: "/discovery" },
  { title: "MV", icon: "mv", to: "/mv" },
  { title: "我的", icon: "yinyue", to: "/my" },
  { title: "朋友", icon: "pengyou", to: "/friends" },
  { title: "账号", icon: "zhanghao", to: "/account" },
];
</script>

<template>
  <div
    class="app-nav container p-2 text-center d-flex flex-row justify-content-evenly flex-md-column justify-content-md-center gap-md-4"
    style="border-right: 1px solid var(--main-10)"
  >
    <router-link
      v-for="(nav, index) in data"
      :to="nav.to"
      class="text-decoration-none text-light"
      replace
    >
      <span
        class="fs-2 p-1 lh-1 d-inline-block rounded-circle"
        :class="`iconfont icon-${nav.icon}`"
      ></span>
      <div style="font-size: 0.8em">{{ nav.title }}</div>
    </router-link>
  </div>
</template>

<style scoped lang="scss">
.router-link-active {
  span {
    background-color: var(--mid-1);
  }

  div {
    color: var(--mid-1);
  }
}
</style>

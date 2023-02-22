<script setup>
const props = defineProps({
  navs: { type: Array, default: [{ title: "标题", url: "链接" }] },
});
</script>

<template>
  <div
    class="bg-dark pt-3 d-flex flex-column-reverse justify-content-between flex-md-row sticky-top"
  >
    <div class="col-md-8 d-flex justify-content-evenly">
      <div class="p-2" v-for="(nav, index) in props.navs" :key="index">
        <router-link
          class="nav-link link-light"
          :to="nav.url"
          style="font-size: 0.9em"
          >{{ nav.title }}
        </router-link>
      </div>
    </div>
    <div class="col-md-4">
      <input
        class="btn bg-secondary text-light rounded-pill"
        style="width: 100%; font-size: 0.9em"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#staticBackdrop"
        aria-controls="staticBackdrop"
        value="搜索"
      />
    </div>
  </div>

  <div
    class="offcanvas offcanvas-end text-bg-dark col-10"
    data-bs-backdrop="static"
    tabindex="-1"
    id="staticBackdrop"
    aria-labelledby="staticBackdropLabel"
  >
    <div class="offcanvas-header">
      <input
        class="bg-transparent border-0 fs-4"
        type="button"
        aria-label="Close"
        data-bs-dismiss="offcanvas"
        value="<"
      />
      <input
        type="text"
        class="form-control rounded-pill bg-secondary text-light border-0 mx-3"
      />
    </div>
    <div class="offcanvas-body">
      <div>这里是搜索与搜索建议</div>
      <div>功能正在完善中...</div>
    </div>
  </div>
</template>

<style scoped>
.router-link-active {
  color: var(--mid-1) !important;
}
</style>

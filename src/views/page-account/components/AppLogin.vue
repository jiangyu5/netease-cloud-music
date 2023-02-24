<script setup>
import LoginStep from "./LoginStep.vue";
import LoginSucceed from "./LoginSucceed.vue";
import { useLoginStore } from "@/store/login.js";
import { storeToRefs } from "pinia";

// # 登录状态
const store = useLoginStore();
const { status } = storeToRefs(store);
const { initStatus } = store;

await initStatus();

</script>

<template>
    <!-- 此处不加父节点会报错 -->
  <div>
    <LoginSucceed v-if="status" />
    <LoginStep v-else />
  </div>
</template>

<style scoped></style>

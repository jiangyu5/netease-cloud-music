<script setup>
import { ref } from "vue";
import LoginStep from "./LoginStep.vue";
import LoginSucceed from "./LoginSucced.vue";
import axios from "axios";

// # 登录状态
const loginSucceed = ref(false);

async function loginStatusRes() {
  let cookie = localStorage.getItem("cookie");
  if (!cookie) return null;
  let res = await axios({
    url: `/api/login/status`,
    method: "post",
    data: {
      cookie,
    },
  });
  return res;
}

let res = await loginStatusRes();
if (res) {
  if (res.data.data.code == 200) {
    loginSucceed.value = true;
  } else {
    loginSucceed.value = false;
  }
}
</script>

<template>
  <LoginSucceed v-if="loginSucceed" />
  <LoginStep v-else v-model:login-succeed="loginSucceed" />
</template>

<style scoped></style>

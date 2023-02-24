<script setup>
import { ref, computed, watch, onUnmounted, nextTick } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";


const router = useRouter();

// # 登录状态
const props = defineProps(["loginSucceed"]);
const emits = defineEmits(["update:loginSucceed"]);
const loginSucceed = computed({
  get() {
    return props.loginSucceed;
  },
  set(value) {
    emits("update:loginSucceed", value);
  },
});

// # 选择的登录方式
const isPassword = ref(true); // 账号密码
const isQR = computed(() => !isPassword.value); // 二维码

function changeLoginMethod() {
  isPassword.value = !isPassword.value;
}

const loginMethod = computed(() => {
  return isPassword.value ? "扫描二维码登录" : "账号密码登录";
});

// # 取消按钮
function cancel() {
  router.replace("/");
}

// # 二维码登录过程判断
const qrImg = ref("");
const qrResFalse = ref(false);
const qrExpired = ref(false); // 二维码是否过期

// 初始化上述状态
function initQrStatus() {
  qrImg.value = "";
  qrResFalse.value = false;
  qrExpired.value = false;
}

// 为二维码登录则触发
watch(isQR, async (value) => {
  if (!value) return;
  loadQR();
});

// 二维码的操作步骤
async function loadQR() {
  initQrStatus();

  let res;
  try {
    res = await getQRImg();
    if (res.keyRes.status != 200 || res.base64Res.status != 200) {
      qrResFalse.value = true;
      return;
    }
  } catch (e) {
    qrResFalse.value = true;
    console.log("请求失败：", e);
    return;
  }

  const key = res.keyRes.data.data.unikey;
  const base64 = res.base64Res.data.data.qrimg;
  qrImg.value = base64;
  watchQRStatus(key);
}

// 获得二维码数据
async function getQRImg() {
  const keyRes = await axios(`/api/login/qr/key?timestamp=${Date.now()}`);
  const key = keyRes.data.data.unikey;
  const base64Res = await axios(
    `/api/login/qr/create?key=${key}&qrimg=true&timestamp=${Date.now()}`
  );
  return { keyRes, base64Res };
}

// 二维码操作失败提示语 失败 or 过期
const falseContent = computed(() => {
  return qrExpired.value ? "二维码已过期" : "二维码获取失败";
});

// 二维码出现后监听状态
let timer;
function watchQRStatus(key) {
  timer = setInterval(async () => {
    const statusRes = await axios(
      `/api/login/qr/check?key=${key}&timestamp=${Date.now()}`
    ).then((res) => res.data);
    if (statusRes.code === 800) {
      // 二维码已过期,请重新获取;
      qrExpired.value = true;
      clearInterval(timer);
    }
    if (statusRes.code === 803) {
      // 这一步会返回cookie
      clearInterval(timer);
      localStorage.setItem("cookie", statusRes.cookie);

      nextTick(() => {
        loginSucceed.value = true; // 登录状态改变
      });
    }
  }, 3000);
}

onUnmounted(() => {
  clearInterval(timer);
});
</script>

<template>
  <div
    class="bg-light text-dark position-absolute top-50 start-50 translate-middle p-4 rounded-4"
    style="width: 280px"
  >
    <!-- # v-if 账号密码 -->
    <form v-if="isPassword">
      <div class="form-floating mb-3">
        <input
          type="text"
          class="form-control"
          id="appLoginNumber"
          placeholder="账号"
        />
        <label for="appLoginNumber">账号</label>
      </div>
      <div class="form-floating">
        <input
          type="password"
          class="form-control"
          id="appLoginPassword"
          autocomplete="off"
          placeholder="密码"
        />
        <label for="appLoginPassword">密码</label>
      </div>
      <div class="form-text">
        <input
          class="form-check-input"
          type="checkbox"
          value=""
          id="appLoginTip"
        />
        <label class="form-check-label ms-1" for="appLoginTip">
          账号密码不会被本站以任何形式存储。
        </label>
      </div>
    </form>

    <!-- # v-elif 二维码登录 -->
    <div
      v-else-if="isQR"
      class="d-flex flex-column align-items-center justify-content-center gap-3"
      style="min-height: 137.88px"
    >
      <!-- if !qrImg && !qrResFalse 载入中 -->
      <template v-if="!qrImg && !qrResFalse">
        <div class="spinner-border text-primary" role="status"></div>
        <div class="text-primary">loading...</div>
      </template>
      <!-- elif qrImg && !qrExpired 二维码图片 -->
      <img
        v-else-if="qrImg && !qrExpired"
        :src="qrImg"
        alt="扫描二维码登录"
        class="d-block mx-auto"
      />
      <!-- else qrResFalse || qrExpired 二维码获取失败与过期 -->
      <template v-else>
        <span class="text-danger">{{ falseContent }}</span>
        <button
          type="button"
          class="btn btn-outline-primary word-wrap rounded-circle"
          style="width: 4em; height: 4em"
          @click="loadQR"
        >
          重新载入
        </button>
      </template>
    </div>

    <!-- # 公用按钮 -->
    <div class="text-align-center my-2">
      <button
        type="button"
        class="btn btn-outline-primary w-100"
        @click="changeLoginMethod"
      >
        {{ loginMethod }}
      </button>
    </div>
    <div class="border-top pt-2">
      <button v-show="isPassword" type="button" class="btn btn-dark">
        登录
      </button>
      <button
        type="button"
        class="btn btn-outline-secondary float-end"
        @click="cancel"
      >
        取消
      </button>
    </div>
  </div>
</template>

<style scoped></style>

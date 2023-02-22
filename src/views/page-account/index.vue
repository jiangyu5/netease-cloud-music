<script setup>
import AppLogin from "./components/AppLogin.vue";
import Loading from "../../components/Loading/index.vue";
</script>

<template>
  <Transition>
    <KeepAlive>
      <Suspense>
        <AppLogin />
        <template #fallback>
          <Loading />
        </template>
      </Suspense>
    </KeepAlive>
  </Transition>
</template>

<style scoped>
.v-enter-active {
  transition: all 0.4s linear;
}

.v-leave-active {
  transition: all 0.2s linear;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>

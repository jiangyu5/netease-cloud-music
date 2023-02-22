<script setup>
import { computed, ref } from "vue";
import MusicButton from "./MusicButton.vue";
const props = defineProps({
  iconNames: {
    type: Array,
    default: ["main", "yinyue"],
  },
});

const emits = defineEmits(["collect"]);

const showIconNameKey = ref(false);
const showIconName = computed(() => {
  return showIconNameKey.value ? props.iconNames[1] : props.iconNames[0];
});

function triggerCollect() {
  emits("collect");
  showIconNameKey.value = !showIconNameKey.value;
}
</script>

<template>
  <MusicButton :icon-name="showIconName" @collect="triggerCollect" />
</template>

<style scoped></style>

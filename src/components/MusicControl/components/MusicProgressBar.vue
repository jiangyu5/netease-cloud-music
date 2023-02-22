<script setup>
const progressRedWidth = {
  width: "80" + "px",
};
const songName = "海阔天空";
const songTotalTime = "04:15";
const songPartTime = "01:06";
</script>

<template>
  <div class="progress-bar">
    <div class="song-info">
      <div class="song-name">{{ songName }}</div>
      <div class="song-time">{{ songPartTime }} / {{ songTotalTime }}</div>
    </div>
    <div class="progress-grey" ref="TOTAL">
      <div class="progress-red" :style="progressRedWidth">
        <span class="dot"></span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.progress-bar {
  padding: 0 0.1em;
}
.progress-bar .song-info {
  font-size: 0.8em;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  margin-bottom: .5em;
}

.progress-bar .progress-grey {
  --bar-height: 0.15em;
  --dot-height: calc(var(--bar-height) * 3);

  background-color: var(--main-6);
  width: 100%; // 长度待修改
  height: var(--bar-height);
  border-radius: calc(var(--bar-height) / 2);

  .progress-red {
    position: relative;
    width: 0;
    height: inherit;
    background-color: var(--mid-1);
    border-radius: calc(var(--bar-height) / 2);

    .dot {
      position: absolute;
      top: 0;
      right: 0;
      transform: translate(
        50%,
        calc((var(--bar-height) - var(--dot-height)) / 2)
      );
      width: var(--dot-height);
      height: var(--dot-height);
      border-radius: 50%;
      background-color: inherit;
    }
  }
}
</style>

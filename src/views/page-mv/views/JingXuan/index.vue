<script setup>
import MvContainer from "../../components/MvContainer.vue";
import axios from "axios";

function getData(arr) {
  return arr.map((el) => {
    const { cover, name, artistName, artists, id, playCount } = { ...el };
    return {
      picUrl: cover,
      name: name + " - " + artistName,
      artists,
      id,
      playCount,
    };
  });
}

// 最新MV
let res = await axios("/api/mv/first?limit=5");
const dataTemp = res.data.data;
const data = getData(dataTemp);

// 热播 MV
let res2 = await axios("/api/mv/all?order=最热&&limit=8");
const data2Temp = res2.data.data;
const data2 = getData(data2Temp);
</script>

<template>
  <div class="">
    <MvContainer title="最新 MV" :data="data" :has-main-pic="true" />
    <MvContainer title="热播 MV" :data="data2" />
  </div>
</template>

<style scoped></style>

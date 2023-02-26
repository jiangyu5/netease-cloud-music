<script setup>
import axios from "axios";
import { useRouter } from "vue-router";
import DetailContainer from "./DetailContainer.vue";

const router = useRouter;
const props = defineProps(["id"]);
let res = await axios(`/api/playlist/detail?id=${props.id}`);
let dataPlaylist = res.data.playlist;
const { name, creator, coverImgUrl, commentCount } = {
  ...dataPlaylist,
};

let res2 = await axios(`/api/comment/playlist?id=${props.id}`);
const { hotComments } = { ...res2.data };
// {id, time, timeStr, content,likeCount, user:{avatarUrl, nickname, userId}}

function back() {
  router.back();
}
</script>

<template>
  <DetailContainer :title="`评论（${commentCount}）`">
    <div class="d-flex gap-3 bg-grey-deep p-3">
      <!-- 图片 -->
      <img :src="coverImgUrl" alt="" width="80" />
      <!-- 信息 -->
      <div>
        <div>
          <span
            class="fs-s5 d-inline-block border border-danger px-1 text-danger fw-bold scale-s6"
            >歌单</span
          ><span>{{ name }}</span>
        </div>
        <div class="fs-s5 text-secondary">by {{ creator.nickname }}</div>
      </div>
    </div>
    <!-- # 精彩评论 -->
    <div class="p-3 bg-grey-deep mt-2">
      <div class="fw-bold pt-2">精彩评论</div>
      <div class="d-flex gap-2 my-4 fs-s7" v-for="comment in hotComments">
        <img
          :src="comment.user.avatarUrl"
          width="30"
          height="30"
          class="d-block rounded-circle mt-1"
        />
        <div>
          <div class="fs-7 d-flex justify-content-between text-secondary">
            <div>
              <div>{{ comment.user.nickname }}</div>
              <div class="">{{ comment.timeStr }}</div>
            </div>
            <div>
              {{ comment.likedCount
              }}<span class="iconfont icon-zan ms-1"></span>
            </div>
          </div>
          <div>
            {{ comment.content }}
          </div>
        </div>
      </div>
    </div>
  </DetailContainer>
</template>

<style scoped></style>

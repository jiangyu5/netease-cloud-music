import axios from "axios";
import { defineStore } from "pinia";
import { reactive, watch } from "vue";

export const useDetailStore = defineStore("detailStore", {
  state: () => {
    return {
      status: false,
    };
  },
  getters: {},
  actions: {
    detailStatus(value = false) {
      this.status = value;
    },
  },
});

export const usePlaylistStore = defineStore("playlistStore", {
  state: () => {
    return {
      id: "",
      status: false,
      code: null,
    };
  },
  getters: {
    // 获得该 id 数据,返回值 promise
    async playlistData() {
      return axios(`/api/playlist/detail?id=${this.id}`).then((res) => {
        let dataPlaylist = res.data.playlist;
        const { name, creator, tracks, coverImgUrl } = { ...dataPlaylist };
        const songList = tracks.map((el) => {
          const { name, ar, sq } = { ...el };
          let artists = ar.map((e) => {
            return { name: e.name };
          });
          return {
            name,
            song: { artists, sqMusic: sq ? true : null },
          };
        });
        return { name, creator, songList, coverImgUrl };
      });
    },
  },
  actions: {
    playlistId(id) {
      this.id = id;
    },
    playlistStatus(value = false) {
      this.status = value;
    },

    // 返回响应式data
    async getPlaylistDataRef() {
      const data = reactive({
        name: "",
        creator: "",
        coverImgUrl: "",
        songList: [],
      });
      watch(
        () => this.id,
        async () => {
          this.playlistStatus(true);
          this.code = null;
          this.playlistData.then((res) => {
            this.code = true;
            data.name = res.name;
            data.creator = res.creator;
            data.coverImgUrl = res.coverImgUrl;
            data.songList = res.songList;
          });
        },
        { deep: true }
      );
      return data;
    },
  },
});

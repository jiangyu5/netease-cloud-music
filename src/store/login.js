import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";

export const useLoginStore = defineStore("loginStore", {
  state: () => {
    return {
      status: false,
    };
  },
  getters: {},
  actions: {
    async getCookie() {
      let cookie = localStorage.getItem("cookie");
      if (!cookie) return null;
      let res = await axios({
        url: `/api/login/status`,
        method: "post",
        data: {
          cookie,
        },
      });
      return res.data.data.code == 200 ? cookie : null;
    },
    async initStatus() {
      let cookie = await this.getCookie();
      if (!cookie) return false;
      this.status = true;
      return true;
    },
    changeStatus(value) {
      this.status = value;
    },

    logout() {
      localStorage.removeItem("cookie");
      this.status = false;
    },
  },
});

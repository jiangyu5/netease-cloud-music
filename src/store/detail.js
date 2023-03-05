import axios from "axios";
import { defineStore } from "pinia";
import { nextTick, reactive, watch } from "vue";

export const useDetailStore = defineStore("detailStore", {
  state: () => {
    return {
      details: [],
    };
  },
  getters: {},
  actions: {
    detailsPush(detail, id) {
      let length = this.details.length;
      if (length) {
        let r = this.details.some((el) => el.detail == detail && el.id == id);
        if (r) return;
      }

      if (length == 1 && this.details[0].detail == detail) {
        this.detailReplace({ detail, id }, 0);
        return;
      }

      this.details.push({ detail, id });
      this.details[length].jclass = "enter";
      if (length != 0) {
        this.details[length - 1].jclass = "";
      }
    },

    detailsBack() {
      let length = this.details.length;
      this.details[length - 1].jclass = "leave";
      if (length > 1) this.details[length - 2].jclass = "static";

      setTimeout(() => {
        this.details.pop();
      }, 200);
    },

    detailReplace(value, to = 0) {
      this.details[to] = value;
    },

    detailsClear() {
      this.details.length = 0;
    },
  },
});

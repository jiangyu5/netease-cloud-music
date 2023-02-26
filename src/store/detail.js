import axios from "axios";
import { defineStore } from "pinia";
import { reactive, watch } from "vue";

export const useDetailStore = defineStore("detailStore", {
  state: () => {
    return {
      details: [],
    };
  },
  getters: {},
  actions: {
    detailsPush(detail, id) {
      if (this.details.length == 1 && this.details[0].detail == detail) {
        this.detailReplace({ detail, id }, 0);
        return;
      }
      this.details.push({ detail, id });
    },

    detailsBack() {
      return this.details.pop();
    },

    detailReplace(value, to = 0) {
      this.details[to] = value;
    },

    detailsClear() {
      this.details.length = 0;
    },
  },
});

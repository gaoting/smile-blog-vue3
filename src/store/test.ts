import {
  defineStore
} from "pinia";

export const testStore = defineStore( {
  id: "test",
  state: () => {
    return {
      count: 0,
      price: 0,
      num: 0,
      produce: {},
    };
  },
  getters: {
    getCount(state) {
      console.log("getter", state);
      return (state.price = 1800), (state.num = 10);
    },
    add(state) {
      console.log("getter", state);
    },
    minus(state) {
      console.log("getter", state);
    },
  },
  actions: {
    changeState(a: any) {
      this.count = a
    },
  },
  persist: {
    enabled: true
  }
});

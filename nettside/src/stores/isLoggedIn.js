import { defineStore } from "pinia";

export const useIsLoggedInStore = defineStore("isLoggedIn", {
  state: () => {
    return { isLoggedIn: false };
  },
});

import { defineStore } from "pinia";

export const useHasVotedStore = defineStore("hasVoted", {
  state: () => {
    return { hasVoted: false };
  },
});

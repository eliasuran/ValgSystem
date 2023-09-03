<script setup>
import { ref } from "vue";
import axios from "axios";
import { useIsLoggedInStore } from "../stores/isLoggedIn";

const isLoggedIn = useIsLoggedInStore();
const hasVoted = ref(false);

defineProps({
  showVotingPage: Function,
  showLoginPage: Function,
  showRegisterPage: Function,
  logOut: Function,
  showStatsPage: Function,
});
</script>

<template>
  <nav>
    <h1>BakkaValg</h1>
    <div>
      <div v-if="isLoggedIn.isLoggedIn">
        <button @click="showStatsPage">Satistikk</button>
        <button v-if="!hasVoted" @click="showVotingPage">Stem</button>
        <button @click="logOut">Logg Ut</button>
      </div>
      <div v-if="!isLoggedIn.isLoggedIn">
        <button @click="showStatsPage">Satistikk</button>
        <button @click="showLoginPage">Logg Inn</button>
        <button @click="showRegisterPage">Registrer</button>
      </div>
    </div>
  </nav>
</template>

<style scoped>
nav {
  height: 80px;
  width: 100vw;
  padding-left: 20px;
  padding-right: 20px;
  box-sizing: border-box;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #324b7b;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
button {
  margin: 10px;
}
</style>

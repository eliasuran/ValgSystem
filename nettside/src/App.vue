<script setup>
import Nav from "./components/nav.vue";
import Header from "./components/header.vue";
import Candidates from "./components/candidates.vue";
import Register from "./components/entry/register.vue";
import Login from "./components/entry/login.vue";
import Stats from "./components/stats.vue";
import { ref, onMounted } from "vue";
import { useIsLoggedInStore } from "./stores/isLoggedIn.js";

const isLoggedIn = useIsLoggedInStore();
const showVoting = ref(false);
const showRegister = ref(false);
const showLogin = ref(false);
const showStats = ref(false);
const user = ref("");

onMounted(() => {
  if (localStorage.getItem("token")) {
    isLoggedIn.isLoggedIn = true;
    user.value = localStorage.getItem("user");
  }
});

const showVotingPage = () => {
  if (localStorage.getItem("token")) {
    user.value = localStorage.getItem("user");
  }
  showVoting.value = true;
  showStats.value = false;
  showLogin.value = false;
};
const showRegisterPage = () => {
  showRegister.value = true;
  showLogin.value = false;
  showStats.value = false;
};
const hideRegisterPage = () => {
  showRegister.value = false;
};
const showLoginPage = () => {
  showLogin.value = true;
  showRegister.value = false;
  showStats.value = false;
};
const logOut = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  showVoting.value = false;
  isLoggedIn.isLoggedIn = false;
  showStats.value = false;
};
const showStatsPage = () => {
  showStats.value = true;
  showVoting.value = false;
  showLogin.value = false;
  showRegister.value = false;
};
</script>

<template>
  <main>
    <Nav
      :logOut="logOut"
      :showVotingPage="showVotingPage"
      :showLoginPage="showLoginPage"
      :showRegisterPage="showRegisterPage"
      :showStatsPage="showStatsPage"
    />
    <div v-if="showVoting">
      <Header />
      <Candidates :user="user" />
    </div>
    <div v-if="showRegister">
      <Register :hideRegisterPage="hideRegisterPage" />
    </div>
    <div v-if="showLogin">
      <Login />
    </div>
    <div v-if="showStats">
      <Stats />
    </div>
  </main>
</template>

<style scoped>
main {
  margin: 0;
  padding: 0;
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fbfcfe;
}
</style>

<script setup>
import Header from "./header.vue";
import Axios from "axios";
import { ref } from "vue";
import { useIsLoggedInStore } from "../../stores/isLoggedIn";

const isLoggedIn = useIsLoggedInStore();

const userData = ref({
  mail: "",
  password: "",
});

const errorNotification = ref("");

const loginUser = () => {
  Axios.post("http://localhost:3000/login", {
    mail: userData.value.mail,
    password: userData.value.password,
  }).then((response) => {
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", response.data.user.mail);
      errorNotification.value = "";
      isLoggedIn.isLoggedIn = true;
    } else if (response.data.message) {
      errorNotification.value = response.data.message;
    }
  });
};
</script>

<template>
  <form @submit.prevent="loginUser">
    <Header text="Logg Inn" />
    <input
      v-model="userData.mail"
      type="email"
      name="mail"
      placeholder="Mail"
    />
    <input
      v-model="userData.password"
      type="password"
      name="password"
      placeholder="Passord"
    />
    <button type="submit">Logg inn</button>
    <span>{{ errorNotification }}</span>
  </form>
</template>

<style>
form {
  background-color: #324b7b;
  height: 500px;
  width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  border-radius: 15px;
}
input {
  border: black 3px solid;
  border-radius: 10px;
  padding: 8px;
}
.blue-span {
  color: #00a0e4;
  cursor: pointer;
}
</style>

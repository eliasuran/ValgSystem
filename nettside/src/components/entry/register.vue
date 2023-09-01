<script setup>
import Header from "./header.vue";
import { ref } from "vue";
import Axios from "axios";

const userData = ref({
  mail: "",
  password: "",
});

defineProps({
  hideRegisterPage: Function,
});

const registerUser = () => {
  Axios.post("http://localhost:3000/register", {
    mail: userData.value.mail,
    password: userData.value.password,
  })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.error("Feil under registrering:", error);
    });
};
</script>

<template>
  <form @submit.prevent="registerUser">
    <Header text="Opprett bruker" />
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
    <button type="submit">Registrer</button>
  </form>
</template>

<style>
.blue-span {
  color: #00a0e4;
  cursor: pointer;
}
</style>

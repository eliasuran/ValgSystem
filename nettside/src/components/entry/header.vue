<script setup lang="ts">
defineProps({
  text: String,
});
</script>

<template>
  <h1>{{ text }}</h1>
</template>

<style scoped>
h1 {
  font-size: 3rem;
  color: #fbfcfe;
  margin: 0;
  padding: 0;
}
</style>

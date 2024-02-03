<template>
  <!-- Header -->
  <MyHeader />

  <!-- Main -->
  <main>
    <RouterView />
  </main>

  <!-- Footer -->
  <MyFooter />
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";
import MyHeader from "./components/Structure/Header/MyHeader.vue";
import MyFooter from "./components/Structure/Footer/MyFooter.vue";
</script>

<style lang="scss">
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
main {
  flex-grow: 1;
}
</style>

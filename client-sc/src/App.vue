<template>
  <MyHeader />

  <main>
    <RouterView />
  </main>

  <MyFooter />
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import MyHeader from "./components/structure/header/MyHeader.vue";
import MyFooter from "./components/structure/footer/MyFooter.vue";
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

<template>
  <MyHeader />
  <RouterView />
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import MyHeader from "./components/structure/header/MyHeader.vue";
</script>

<style scoped lang="scss"></style>

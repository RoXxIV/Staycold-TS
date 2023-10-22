<template>
  <div id="banner-landscape"></div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
#banner-landscape {
  min-height: 250px;
  margin-top: 100px;
  border-top: 2px solid var(--color-dark-border);
  border-bottom: 2px solid var(--color-dark-border);
  background-image: url(../../assets/images/background-home.jpg);
  background-attachment: fixed;
  background-size: cover;
  background-repeat: no-repeat;
  background-position-y: 50%;
}
</style>

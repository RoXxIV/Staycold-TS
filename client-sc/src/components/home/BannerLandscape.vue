<template>
  <div
    class="banner-landscape"
    aria-label="Un paysage d'hiver avec des montagnes enneigées sous un ciel rosé, le soleil se levant à l'horizon et une surface glacée au premier plan."
  ></div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.banner-landscape {
  min-height: 250px;
  margin-top: 100px;
  border-top: 2px solid var(--primary-border);
  border-bottom: 2px solid var(--primary-border);
  background-image: url(../../assets/images/background-home.jpg);
  background-attachment: fixed;
  background-size: cover;
  background-repeat: no-repeat;
  background-position-y: 50%;
}
</style>

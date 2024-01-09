<template>
  <section>
    <h1 class="title">Ajouter une <span>baignade</span></h1>
    <!-- Form -->
    <BathForm />
  </section>
</template>

<script setup lang="ts">
import BathForm from "@/components/baths/BathForm.vue";
</script>

<style lang="scss" scoped>
section {
  width: 75%;
  margin: auto;

  h1 {
    text-align: center;
    .title-span {
      display: inline-block;
    }
  }

  @include media-max(611.98px) {
    width: 90%;
    margin: auto;
  }
}
</style>

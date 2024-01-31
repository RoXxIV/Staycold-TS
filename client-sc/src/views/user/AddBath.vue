<template>
  <section class="section-add-bath-form">
    <h1 class="title">Ajouter une <span>baignade</span></h1>
    <!-- Form -->
    <BathForm :editMode="false" />

    <!-- back button -->
    <div class="back-button">
      <a @click="router.go(-1)" aria-label="Retour à la page précédente">
        Retour à la page précédente
      </a>
    </div>
  </section>
</template>

<script setup lang="ts">
import BathForm from "@/components/baths/BathForm.vue";
import { useRoute } from "vue-router";
import router from "@/router";

const route = useRoute();
</script>

<style lang="scss" scoped>
h1 {
  text-align: center;
}
.back-button {
  text-align: center;
  margin-top: 50px;
  text-decoration: underline;
  a {
    cursor: pointer;
  }
}
</style>

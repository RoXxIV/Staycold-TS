<template>
  <section class="section-edit-bath-form">
    <h1 class="title">Modifier une <span>baignade</span></h1>
    <!-- Form -->
    <BathForm :editMode="true" />

    <!-- back button -->
    <BackLink
      path="back"
      ariaLabel="Retour à la page précédente"
      content="Page précédente"
    />
  </section>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import router from "@/router";
import BathForm from "@/components/Baths/BathForm.vue";
import BackLink from "@/components/Common/BackLink.vue";

const route = useRoute();
</script>

<style lang="scss" scoped>
h1 {
  text-align: center;
}
</style>

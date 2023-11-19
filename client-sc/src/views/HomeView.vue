<template>
  <!-- Banner-->
  <Banner />
  <!-- Hero section -->
  <Hero />
  <!-- Banner Landscape -->
  <BannerLandscape />
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import Banner from "@/components/home/Banner.vue";
import Hero from "@/components/home/Hero.vue";
import BannerLandscape from "@/components/home/BannerLandscape.vue";
import BathDataService from "@/services/BathDataService";
import type { IBath } from "@/types/bath";

const baths = ref<IBath[]>([]);

const fetchAllBaths = async () => {
  try {
    const response = await BathDataService.getRecent();
    baths.value = response.data;
    console.log(baths.value);
  } catch (error) {
    console.error("Erreur lors de la récupération de la baignades:", error);
  }
};

onMounted(() => {
  fetchAllBaths();
});
</script>

<style lang="scss">
/* Your SCSS styles here */
</style>

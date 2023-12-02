<template>
  <!-- Banner-->
  <Banner />
  <!-- Hero section -->
  <Hero />
  <!-- Banner Landscape -->
  <BannerLandscape />
  <!-- Recent baths -->
  <RecentBaths />
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import Banner from "@/components/home/Banner.vue";
import Hero from "@/components/home/Hero.vue";
import BannerLandscape from "@/components/home/BannerLandscape.vue";
import RecentBaths from "@/components/baths/RecentBaths.vue";
import BathDataService from "@/services/BathDataService";
import type { IBath } from "@/types/bath";

const baths = ref<IBath[]>([]);

const fetchRecentBaths = async () => {
  try {
    const response = await BathDataService.getRecent();
    baths.value = response.data;
    console.log(baths.value);
  } catch (error) {
    // console.error("Erreur lors de la récupération de la baignades:", error);
  }
};

onMounted(() => {
  fetchRecentBaths();
});
</script>

<style lang="scss">
/* Your SCSS styles here */
</style>

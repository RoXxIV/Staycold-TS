<template>
  <!-- Banner-->
  <Banner />
  <!-- Hero section -->
  <Hero />
  <!-- Banner Landscape -->
  <BannerLandscape />
  <!-- Recent baths -->
  <RecentBaths />
  <!-- Breath link -->
  <BreathLink />
</template>

<script setup lang="ts">
import Banner from "@/components/home/Banner.vue";
import Hero from "@/components/home/Hero.vue";
import BannerLandscape from "@/components/home/BannerLandscape.vue";
import RecentBaths from "@/components/baths/RecentBaths.vue";
import BreathLink from "@/components/reusable/BreathLink.vue";
</script>

<style lang="scss">
/* Your SCSS styles here */
</style>

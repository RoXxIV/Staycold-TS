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
  <!-- Advices -->
  <Advices />
  <div class="animation">
    <vue3-lottie
      :options="lottieSilentSharkOptions"
      class="lottie lottie-silent-shark"
      :animationData="lottieSilentSharkOptions.animationData"
    ></vue3-lottie>
  </div>
</template>

<script setup lang="ts">
import { useLottieOptions } from "@/composables/useLottieOptions";
import Banner from "@/components/Home/Banner.vue";
import Hero from "@/components/Home/Hero.vue";
import BannerLandscape from "@/components/Home/BannerLandscape.vue";
import RecentBaths from "@/components/Baths/RecentBaths.vue";
import BreathLink from "@/components/Common/BreathLink.vue";
import Advices from "@/components/Home/Advices.vue";
import SilentShark from "@/assets/lotties/silent_shark.json";

// lottie options
const lottieSilentSharkOptions = useLottieOptions(SilentShark);
</script>

<style lang="scss">
.animation {
  margin-top: 50px;
  .lottie-silent-shark {
    max-width: 350px;
  }
}
</style>

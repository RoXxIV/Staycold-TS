<template>
  <section class="not-found-section">
    <h1 class="title">Page non trouvée</h1>

    <vue3-lottie
      :options="lottieOptions"
      class="lottie"
      :animationData="lottieOptions.animationData"
    ></vue3-lottie>

    <div>
      <router-link to="/" tag="a">Retrouver son chemin</router-link>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useLottieOptions } from "@/helpers/useLottieOptions";
import LottieNotFound from "@/assets/lotties/not-found.json";

// lottie options
const lottieOptions = useLottieOptions(LottieNotFound);
</script>

<style lang="scss" scoped>
.not-found-section {
  margin-top: 50px;

  h1 {
    text-align: center;
    font-size: 2rem;
    margin-bottom: 20px;
  }

  .lottie {
    width: 500px;
    margin: auto;
    @media (max-width: 611.98px) {
      width: 200px;
    }
  }

  div {
    text-align: center;
    margin-top: 20px;
    a {
      text-decoration: underline;
    }
  }

  @media (max-width: 611.98px) {
    .lottie {
      width: 200px;
    }
  }
}
</style>

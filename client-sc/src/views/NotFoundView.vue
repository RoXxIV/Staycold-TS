<template>
  <section class="not-found-section">
    <h1 class="title">Page <span>non</span> trouvée</h1>

    <vue3-lottie
      :options="lottieOptions"
      class="lottie"
      :animationData="lottieOptions.animationData"
      aria-label="Animation illustrant une page non trouvée"
    ></vue3-lottie>

    <p class="explanation">
      Désolé, la page que vous recherchez semble introuvable. <br />
      Elle a peut-être été déplacée ou supprimée, ou l'URL est incorrecte.
    </p>

    <div>
      <router-link to="/" tag="a">Retrouver son chemin</router-link>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useLottieOptions } from "@/composables/useLottieOptions";
import { useTitle } from "@vueuse/core";
import LottieNotFound from "@/assets/lotties/not-found.json";

// Page title
const title = useTitle("StayCold - Page non trouvée :(");

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

  .explanation {
    text-align: center;
    margin: 30px auto;
  }

  div {
    text-align: center;
    margin-top: 20px;
    a {
      text-decoration: underline;
    }
  }
}
</style>

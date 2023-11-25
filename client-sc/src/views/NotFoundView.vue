<template>
  <section>
    <vue3-lottie
      :options="notFoundOptions"
      class="lottie"
      :animationData="notFoundOptions.animationData"
    ></vue3-lottie>
    <div>
      <router-link to="/" tag="a">Retrouver son chemin</router-link>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import LottieNotFound from "@/assets/lotties/not-found.json";
// lottie options
const notFoundOptions = ref({
  animationData: LottieNotFound,
  loop: true,
  autoplay: true,
});
</script>

<style lang="scss" scoped>
section {
  margin-top: 50px;
  /* lottie -----------*/
  .lottie {
    width: 500px;
    margin: auto;
    @media (max-width: 611.98px) {
      width: 200px;
    }
  }
  /* redirection -----------*/
  div {
    text-align: center;
    margin-top: 20px;
    a {
      text-decoration: underline;
    }
  }
}
</style>

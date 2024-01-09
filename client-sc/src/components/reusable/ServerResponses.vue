<template>
  <div class="server-messages">
    <p>{{ serverMessage }}</p>
    <vue3-lottie
      :options="loaderOptions"
      class="lottie"
      :animationData="loaderOptions.animationData"
    ></vue3-lottie>
    <p>Redirection dans {{ counter }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRedirectionTimer } from "@/helpers/redirectionHelper";
import loader from "@/assets/lotties/snow-loader.json";
import type { IlottieOptions } from "@/types/lottieOptions";

const props = defineProps({
  serverMessage: String,
  timeBeforeRedirection: Number,
  redirectTo: String,
});

// lottie options
const loaderOptions = ref<IlottieOptions>({
  animationData: loader,
  loop: true,
  autoplay: true,
});

// redirection timer settings
const { time: counter, startRedirectionTimer: startRedirection } =
  useRedirectionTimer(props.redirectTo || "", props.timeBeforeRedirection);

// start the redirection timer when the component is mounted
onMounted(() => {
  startRedirection();
});
</script>

<style scoped lang="scss">
.server-messages {
  margin-top: 50px;

  .lottie {
    max-width: 250px;
  }
  p {
    text-align: center;
    font-size: 1.2em;
  }
}
</style>

<template>
  <div class="server-messages">
    <p>{{ serverMessage }}</p>
    <vue3-lottie
      :options="lottieOptions"
      class="lottie"
      :animationData="lottieOptions.animationData"
    ></vue3-lottie>
    <p>Redirection dans {{ counter }}</p>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useRedirectionTimer } from "@/helpers/redirectionHelper";
import { useLottieOptions } from "@/helpers/useLottieOptions";
import loader from "@/assets/lotties/snow-loader.json";

const props = defineProps({
  serverMessage: String,
  timeBeforeRedirection: Number,
  redirectTo: String,
});

// lottie options
const lottieOptions = useLottieOptions(loader);

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

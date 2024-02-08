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
import { useRedirectionTimer } from "@/composables/useRedirectionTimer";
import { useLottieOptions } from "@/composables/useLottieOptions";
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
  margin-top: 100px;
  width: auto;
  margin: 100px auto;
  padding: 30px;
  border: 2px solid var(--secondary-border);

  @include media-max(611.98px) {
    width: 80%;
    margin: 50px auto;
    padding: 5px;
  }
  .lottie {
    max-width: 150px;
  }
  p {
    text-align: center;
    font-size: 1.2em;
  }
}
</style>

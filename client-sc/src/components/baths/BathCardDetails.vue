<template>
  <ul class="wrapper-bath-details">
    <!-- username & timestamp -->
    <li class="username-timestamp">
      <span class="timestamp">{{ bath.formattedCreatedAt }}</span>
      <span class="username">{{ bath?.author?.username }}</span>
      <!-- weather -->
      <img
        class="weather-icon"
        v-show="weatherIconPath"
        :src="weatherIconPath"
        alt="icone indiquant la météo"
      />
    </li>

    <!-- water-temperature -->
    <li class="water-temperature">
      <span>Temperature de l'eau</span
      ><span>{{ bath.waterTemperature }}&#8451;</span>
    </li>

    <!-- temperature-outside -->
    <li class="temperature-outside">
      <span>Temperature exterieur</span
      ><span>{{ bath.temperatureOutside }}&#8451;</span>
    </li>

    <!-- time-in-water -->
    <li class="time-in-water">
      <span>Temps dans l'eau</span><span>{{ bath.timeInWater }} min</span>
    </li>

    <!-- wind -->
    <li class="wind">
      <span>Vent</span><span>{{ bath.wind ? bath.wind : "n/a" }}</span>
    </li>

    <!-- recovery-time -->
    <li class="recovery-time">
      <span>Temps de récupération</span
      ><span>{{ bath.recoveryTime ? `${bath.recoveryTime} min` : "n/a" }}</span>
    </li>

    <!-- afterdrop -->
    <li class="afterdrop">
      <span>Intensité de la récupération</span
      ><span>{{ bath.afterdrop ? bath.afterdrop : "n/a" }}</span>
    </li>

    <!-- global-feeling -->
    <li class="global-feeling">
      <span>Ressenti global</span
      ><span>{{ bath.globalFeeling ? bath.globalFeeling : "n/a" }}</span>
    </li>

    <!-- lottie animation -->
    <li class="lottie-animation">
      <vue3-lottie
        :options="lottieOptions"
        class="lottie"
        :animationData="lottieOptions.animationData"
      ></vue3-lottie>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { watchEffect } from "vue";
import gsap from "gsap";
import { useMediaQuery } from "@vueuse/core";
import { getWeatherIconPath } from "@/helpers/getWeatherIconPath";
import { useLottieOptions } from "@/composables/useLottieOptions";
import sharkDetails from "@/assets/lotties/shark_details.json";
import type { IBath } from "@/types/bath";

const props = defineProps({
  bath: {
    type: Object as () => IBath,
    required: true,
  },
});

// lottie options
const lottieOptions = useLottieOptions(sharkDetails);

// animations settings (gsap)
const animations = [
  { selector: ".username", xStart: "-300" },
  { selector: ".timestamp", xStart: "300" },
  { selector: ".weather-icon", xStart: "300" },
  { selector: ".temperature-outside", xStart: "300" },
  { selector: ".water-temperature", xStart: "-300" },
  { selector: ".time-in-water", xStart: "-300" },
  { selector: ".wind", xStart: "300" },
  { selector: ".recovery-time", xStart: "-300" },
  { selector: ".afterdrop", xStart: "300" },
  { selector: ".global-feeling", xStart: "-300" },
];

const weatherIconPath = ref<string>("");

// Get weather icon path when component is mounted
watchEffect(() => {
  if (props.bath && props.bath.weather) {
    getWeatherIconPath(props.bath.weather)
      .then((path) => {
        weatherIconPath.value = path;
      })
      .catch((error) => {
        console.error("Erreur lors du chargement de l'icône météo:", error);
      });
  }
});

onMounted(() => {
  // start animations only if screen is bigger than 991.98px
  const isSmallScreen = useMediaQuery("(max-width: 991.98px)");
  if (!isSmallScreen.value) {
    animations.forEach(({ selector, xStart }) => {
      gsap.fromTo(selector, { x: xStart }, { duration: 1, x: 0 });
    });
  }
});
</script>

<style scoped lang="scss">
.wrapper-bath-details {
  position: relative;
  width: 100%;
  margin: auto;
  text-align: center;

  li {
    font-weight: bold;

    &.temperature-outside,
    &.wind,
    &.water-temperature,
    &.time-in-water,
    &.recovery-time,
    &.afterdrop,
    &.global-feeling {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 20px;
      padding: 10px;
      border-bottom: 1px solid var(--primary-border);
      color: var(--color-text);
      -webkit-box-shadow: 0 30px 33px -60px #000000;
      box-shadow: 0 30px 33px -60px #000000;
    }

    &.username-timestamp {
      display: flex;
      flex-direction: column;
      position: relative;
      height: 100px;
      padding-bottom: 50px;
      border: 2px solid var(--primary-border);
      border-radius: 0.75rem;
      background: var(--secondary-background);
      background: url(../../assets/images/wave.png);
      background-position: 1000px 100px;
      background-repeat: repeat-x;
      background-size: 2000px 200px;
      color: var(--color-text);
      -webkit-box-shadow: 0 30px 33px -60px #000000;
      box-shadow: 0 30px 33px -60px #000000;
      animation: filling 50s ease-in-out infinite;

      .username {
        margin-top: 20px;
        font-size: 1.8em;
      }
      .timestamp {
        align-self: flex-end;
        margin: 10px 20px 0 0;
      }

      /*wave animation */
      @keyframes filling {
        50% {
          background-position: 2000px 100px;
        }
        100% {
          background-position: 4000px 100px;
        }
      }
      .weather-icon {
        position: absolute;
        left: calc(50% - 35px);
        top: -35px;
        border: 3px solid var(--primary-border);
        border-radius: 50%;
        background-color: var(--secondary-background);
      }
    }
  }
  /* lottie animation */
  .lottie-animation {
    position: absolute;
    right: calc(-150px);
    bottom: -150px;
    border-radius: 50%;
    z-index: -1;
    opacity: 0.5;

    .lottie {
      max-width: 150px;
    }
    /* Media queries .lottie */
    @include media-max(991.98px) {
      display: none;
    }
  }
}
</style>

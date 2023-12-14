<template>
  <ul class="wrapper-bath-details">
    <!-- username & timestamp -->
    <li class="username-timestamp">
      <span class="timestamp">{{ bath.formattedCreatedAt }}</span>
      <span class="username">{{ bath?.author?.username }}</span>
      <!-- weather -->
      <img
        class="weather"
        v-show="weatherIconPath"
        :src="weatherIconPath"
        alt="icone indiquant la météo"
      />
    </li>

    <!-- temperature-outside -->
    <li class="temperature-outside">
      <span>Temperature exterieur</span
      ><span class="blue-text">{{ bath.temperatureOutside }}&#8451;</span>
    </li>

    <!-- wind -->
    <li class="wind">
      <span>Vent</span
      ><span class="blue-text">{{ bath.wind ? bath.wind : "n/a" }}</span>
    </li>

    <!-- water-temperature -->
    <li class="water-temperature">
      <span>Temperature de l'eau</span
      ><span class="blue-text">{{ bath.waterTemperature }}&#8451;</span>
    </li>

    <!-- time-in-water -->
    <li class="time-in-water">
      <span>Temps dans l'eau</span
      ><span class="blue-text">{{ bath.timeInWater }} min</span>
    </li>

    <!-- recovery-time -->
    <li class="recovery-time">
      <span>Temps de récupération</span
      ><span class="blue-text">{{
        bath.recoveryTime ? `${bath.recoveryTime} min` : "n/a"
      }}</span>
    </li>

    <!-- afterdrop -->
    <li class="afterdrop">
      <span>Intensité de la récupération</span
      ><span class="blue-text">{{
        bath.afterdrop ? bath.afterdrop : "n/a"
      }}</span>
    </li>

    <!-- global-feeling -->
    <li class="global-feeling">
      <span>Ressenti global</span
      ><span class="blue-text">{{
        bath.globalFeeling ? bath.globalFeeling : "n/a"
      }}</span>
    </li>

    <!-- lottie animation -->
    <li class="lottie-animation">
      <vue3-lottie
        :options="loaderOptions"
        class="lottie"
        :animationData="loaderOptions.animationData"
      ></vue3-lottie>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { watchEffect } from "vue";
import type { IBath } from "@/types/bath";
import { getWeatherIconPath } from "@/helpers/pathHelper";
import gsap from "gsap";
import type { IlottieOptions } from "@/types/lottieOptions";
import sharkDetails from "@/assets/lotties/shark_details.json";

const props = defineProps({
  bath: {
    type: Object as () => IBath,
    required: true,
  },
});

// lottie options
const loaderOptions = ref<IlottieOptions>({
  animationData: sharkDetails,
  loop: true,
  autoplay: true,
});

const weatherIconPath = ref("");

// Get weather icon path when component is mounted
watchEffect(() => {
  if (props.bath && props.bath.weather) {
    getWeatherIconPath(props.bath.weather)
      .then((path) => {
        weatherIconPath.value = path;
      })
      .catch((error) => {
        console.error("Erreur lors du chargement de l'icône météo:", error);
        // Utiliser une icône d'erreur ou un placeholder si nécessaire
      });
  }
});

// Animate the bath details blocs when component is mounted (gsap)
onMounted(() => {
  const animations = [
    { selector: ".username", xStart: "-300" },
    { selector: ".timestamp", xStart: "300" },
    { selector: ".weather", xStart: "300" },
    { selector: ".wind", xStart: "-300" },
    { selector: ".water-temperature", xStart: "-300" },
    { selector: ".time-in-water", xStart: "300" },
    { selector: ".recovery-time", xStart: "300" },
    { selector: ".global-feeling", xStart: "-300" },
  ];

  animations.forEach(({ selector, xStart }) => {
    gsap.fromTo(selector, { x: xStart }, { duration: 1, x: 0 });
  });
});
</script>

<style scoped lang="scss">
.wrapper-bath-details {
  width: 100%;
  margin: auto;
  text-align: center;
  position: relative;

  li {
    font-weight: bold;

    &.temperature-outside,
    &.wind,
    &.water-temperature,
    &.time-in-water,
    &.recovery-time,
    &.afterdrop,
    &.global-feeling {
      border-bottom: 1px solid var(--color-dark-border);
      color: var(--color-text);
      -webkit-box-shadow: 0 30px 33px -60px #000000;
      box-shadow: 0 30px 33px -60px #000000;
      margin-top: 20px;
      padding: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      span:last-child {
        transition: color 0.2s ease-in-out;
      }
      &:hover span:last-child {
        color: var(--blue);
      }
    }

    &.username-timestamp {
      display: flex;
      flex-direction: column;
      height: 100px;
      border: 2px solid var(--color-dark-border);
      background: var(--lighter-background);
      color: var(--color-text);
      border-radius: 0.75rem;
      -webkit-box-shadow: 0 30px 33px -60px #000000;
      box-shadow: 0 30px 33px -60px #000000;
      background: url(../../assets/images/wave.png);
      background-position: 1000px 100px;
      background-repeat: repeat-x;
      background-size: 2000px 200px;
      animation: filling 50s ease-in-out infinite;
      position: relative;
      padding-bottom: 50px;
      .username {
        font-size: 1.8em;
        margin-top: 20px;
      }
      .timestamp {
        align-self: flex-end;
        margin: 10px 20px 0 0;
      }

      @keyframes filling {
        50% {
          background-position: 2000px 100px;
        }
        100% {
          background-position: 4000px 100px;
        }
      }
      .weather {
        border: 3px solid var(--color-dark-border);
        border-radius: 50%;
        position: absolute;
        left: calc(50% - 35px);
        top: -35px;
        background-color: var(--lighter-background);
      }
    }
  }
  .lottie-animation {
    border-radius: 50%;
    position: absolute;
    right: calc(-150px);
    z-index: -1;
    bottom: -150px;
    opacity: 0.5;
    .lottie {
      max-width: 150px;
    }
  }

  @include media-max(991.98px) {
    .lottie-animation {
      display: none;
    }
  }
}
</style>

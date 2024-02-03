<template>
  <!-- Dynamic link to bath details using bath's ID -->
  <router-link :to="`/bath-details/${bath._id}`" tag="div" class="card">
    <div>
      <!-- weather icon -->
      <img
        :src="weatherIconPath"
        class="weather-icon"
        alt="icone indiquant la météo"
        aria-label="Time in water"
      />
    </div>

    <!-- card details -->
    <ul class="card-details">
      <!-- username -->
      <li class="card-username">{{ bath.author.username }}</li>
      <!-- timestamp -->
      <li class="card-timestamp">{{ bath.formattedCreatedAt }}</li>
      <!-- temperature -->
      <li>Air : {{ bath.temperatureOutside }}&#8451;</li>
      <!-- water temperature -->
      <li>Eau : {{ bath.waterTemperature }}&#8451;</li>
      <!-- time in water -->
      <li>
        <font-awesome-icon
          class="font-awesome-icon"
          :icon="['fa', 'stopwatch']"
          aria-hidden="true"
        />
        : {{ bath.timeInWater }} min
      </li>
    </ul>
  </router-link>
</template>

<script setup lang="ts">
import { ref, watchEffect } from "vue";
import { getWeatherIconPath } from "@/helpers/getWeatherIconPath";
import type { IBath } from "@/types/bath";

const props = defineProps({
  bath: {
    type: Object as () => IBath,
    required: true,
  },
});

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
</script>

<style scoped lang="scss">
.card {
  display: flex;
  align-items: center;
  padding: 0px 50px 0px 0px;
  border: 3px solid var(--secondary-border);
  border-radius: 0.75rem;
  background: var(--secondary-background);
  -webkit-box-shadow: 0 30px 33px -60px #000000;
  box-shadow: 0 30px 33px -60px #000000;
  &:hover {
    -webkit-box-shadow: 0 40px 43px -60px var(--blue);
    box-shadow: 0 40px 43px -60px var(--blue);
  }
  /* weather icon */
  .weather-icon {
    min-width: 80px;
    min-height: 80px;
    margin-right: 20px;
    padding: 0px 10px 0px 20px;
  }
  /* card details */
  .card-details li {
    margin: 5px 0px;
    &.card-username {
      font-weight: bold;
    }
    &.card-timestamp {
      font-size: 0.8em;
      font-style: italic;
    }
  }
  /* Media queries card */
  @include media-max(770px) {
    text-align: center;
    margin: 5px auto;
  }
}
</style>

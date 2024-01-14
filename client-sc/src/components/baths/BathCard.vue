<template>
  <!-- Dynamic link creation to bath details using bath's ID -->
  <router-link :to="`/bath-details/${bath._id}`" tag="div" class="card">
    <div>
      <!-- weather -->
      <!-- Displaying weather icon. On load, handleImageLoaded is triggered -->
      <img
        class="weather-icon"
        :src="weatherIconPath"
        alt="icone indiquant la météo"
        aria-label="Time in water"
        @load="handleImageLoaded"
      />
    </div>

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
import { ref, onMounted } from "vue";
import { getWeatherIconPath } from "@/helpers/pathHelper";
import type { IBath } from "@/types/bath";

// define props
const props = defineProps({
  bath: {
    type: Object as () => IBath,
    required: true,
  },
});

const emit = defineEmits(["weatherIconLoaded"]);

const weatherIconPath = ref<string>("");
const isWeatherIconLoaded = ref(false);

// Emitting an event when the weather icon loads
const handleImageLoaded = () => {
  isWeatherIconLoaded.value = true;
  emit("weatherIconLoaded", true);
};

// Fetching weather icon path when component mounts
onMounted(async () => {
  try {
    weatherIconPath.value = await getWeatherIconPath(props.bath.weather);
  } catch (error) {
    console.error("Failed to load weather icon:", error);
    // Error handling logic here
  }
});
</script>

<style scoped lang="scss">
/* card component */
.card {
  display: flex;
  align-items: center;
  padding: 0px 50px 0px 0px;
  border: 2px solid var(--secondary-border);
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
}
</style>

<template>
  <router-link :to="`/bath-details/${bath._id}`" tag="div" class="card">
    <div>
      <!-- weather -->
      <img
        class="weather-icon"
        :src="weatherIconPath"
        alt="icone indiquant la météo"
        aria-label="Time in water"
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
      <li>Eau :{{ bath.waterTemperature }}&#8451;</li>
      <!-- time in water -->
      <li>
        <font-awesome-icon
          class="font-awesome-icon"
          :icon="['fa', 'stopwatch']"
        />
        : {{ bath.timeInWater }} min
      </li>
    </ul>
  </router-link>
</template>

<script setup lang="ts">
// Vue imports
import { ref, onMounted } from "vue";
// types imports
import type { IBath } from "@/types/bath";
// helpers imports
import { getWeatherIconPath } from "@/helpers/pathHelper";

// define props
const props = defineProps({
  bath: {
    type: Object as () => IBath,
    required: true,
  },
});

// define refs
const weatherIconPath = ref<string>("");

// Get weather icon path when component is mounted
onMounted(async () => {
  weatherIconPath.value = await getWeatherIconPath(props.bath.weather);
});
</script>

<style scoped lang="scss">
.card {
  display: flex;
  align-items: center;
  padding: 0px 50px 0px 0px;
  background: var(--secondary-background);
  border: 2px solid var(--secondary-border);
  border-radius: 0.75rem;
  -webkit-box-shadow: 0 30px 33px -60px #000000;
  box-shadow: 0 30px 33px -60px #000000;
  &:hover {
    -webkit-box-shadow: 0 40px 43px -60px var(--blue);
    box-shadow: 0 40px 43px -60px var(--blue);
  }
  .weather-icon {
    min-width: 80px;
    min-height: 80px;
    margin-right: 20px;
    padding: 0px 10px 0px 20px;
  }
  .card-details li {
    margin: 5px 0px;
    &.card-username {
      font-weight: bold;
    }
    &.card-timestamp {
      font-size: 0.8em;
    }
  }
}
</style>

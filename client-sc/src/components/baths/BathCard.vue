<template>
  <router-link :to="`/bath-details/${bath._id}`" tag="div" class="card">
    <div>
      <!-- weather -->
      <img
        class="weather"
        :src="weatherIconPath"
        alt="icone indiquant la météo"
      />
    </div>
    <ul>
      <!-- username -->
      <li class="bath-username">{{ bath.author.username }}</li>
      <!-- date -->
      <li class="bath-date">{{ bath.formattedCreatedAt }}</li>
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
import { ref, onMounted } from "vue";
import type { IBath } from "@/types/bath";
import { getWeatherIconPath } from "@/helpers/pathHelper";

const props = defineProps({
  bath: {
    type: Object as () => IBath,
    required: true,
  },
});

const weatherIconPath = ref("");

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
  background: var(--lighter-background);
  border: 2px solid var(--color-light-border);
  border-radius: 0.75rem;
  -webkit-box-shadow: 0 30px 33px -60px #000000;
  box-shadow: 0 30px 33px -60px #000000;
  &:hover {
    -webkit-box-shadow: 0 40px 43px -60px var(--blue);
    box-shadow: 0 40px 43px -60px var(--blue);
  }
  img {
    min-width: 80px;
    min-height: 80px;
    margin-right: 20px;
    padding: 0px 10px 0px 20px;
  }
  ul {
    li {
      margin: 5px 0px;
      &.bath-username {
        font-weight: bold;
      }
      &.bath-date {
        font-size: 0.8em;
      }
    }
  }
}
</style>

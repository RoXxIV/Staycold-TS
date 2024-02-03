<template>
  <section class="recent-baths">
    <h2 class="title">Baignades <span>récentes</span></h2>

    <!-- Loading -->
    <BathSkeleton v-if="isLoading" :numberOfSkeletons="4" />

    <!-- Error -->
    <div v-if="errorServer" class="error-server">
      <p>Une erreur est survenue lors de la récupération des baignades.</p>
    </div>

    <!-- Recent baths -->
    <div v-else class="cards-list">
      <BathCard v-for="bath in recentBaths" :key="bath._id" :bath="bath" />
    </div>

    <!-- Link to all baths -->
    <div class="all-baths-link">
      <router-link to="/all-baths"
        ><button aria-label="Voir toutes les baignades">
          Voir tout
        </button></router-link
      >
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, type Ref } from "vue";
import BathCard from "../Baths/BathCard.vue";
import BathDataService from "@/services/BathDataService";
import RenderBathData from "@/helpers/renderBathData";
import BathSkeleton from "@/components/Baths/BathSkeleton.vue";
import gsap from "gsap";
import type { IBath } from "@/types/bath";

const recentBaths = ref<IBath[]>([]);
const errorServer = ref<boolean>(false);
const isLoading = ref<boolean>(false);

/**
 * Asynchronously fetches recent baths from the API.
 * On success, formats the date and weather data for display.
 * On failure, sets an error message to inform the user.
 * @returns {Promise<void>}
 */
const fetchRecentBaths = async () => {
  isLoading.value = true;
  try {
    const response = await BathDataService.getRecent();
    recentBaths.value = response.data;

    recentBaths.value.forEach((bath) => {
      bath.formattedCreatedAt = RenderBathData.editDateFormat(bath.createdAt);
      bath.weather = RenderBathData.displayWeatherAsEmoji(bath.weather);
    });
    errorServer.value = false;
  } catch (error) {
    errorServer.value = true;
  } finally {
    isLoading.value = false;
  }
};
// Fetch recent baths when component is mounted and animate title (gsap)
onMounted(() => {
  fetchRecentBaths();

  gsap.fromTo(
    ".recent-baths h2",
    {
      opacity: 0,
      x: "-300",
    },
    {
      duration: 1.5,
      opacity: 1,
      x: 0,
    }
  );
});
</script>

<style scoped lang="scss">
.recent-baths {
  display: flex;
  justify-content: center;
  flex-direction: column;

  h2 {
    margin-bottom: 50px;
    text-align: center;
  }

  /* error message */
  .error-server {
    text-align: center;
    margin-top: 50px;
    p {
      font-weight: bold;
    }
  }

  /* cards list */
  .cards-list {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 20px;
  }

  .all-baths-link {
    text-align: center;
    margin-top: 50px;
  }
}
</style>

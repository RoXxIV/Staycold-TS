<template>
  <section class="section-recent-baths">
    <h2>Baignades <span>récentes</span></h2>

    <!-- Loading -->
    <div v-if="!recentBaths.length" id="loading">
      <p>Chargement...</p>
    </div>

    <!-- Recent baths -->
    <div class="cards-list">
      <BathCard v-for="bath in recentBaths" :key="bath.id" :bath="bath" />
    </div>

    <!-- Link to all baths -->
    <div v-if="!serverErrorMessage" id="recent-baths-link">
      <router-link to="/all-baths"><button>Voir tout</button></router-link>
    </div>

    <!-- Error -->
    <div v-if="serverErrorMessage" id="error">
      <p>{{ serverErrorMessage }}</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, type Ref } from "vue";
import BathCard from "@/components/baths/BathCard.vue";
import BathDataService from "@/services/BathDataService";
import RenderBathData from "@/helpers/renderBathData";
import type { IBath } from "@/types/bath";

const recentBaths = ref<IBath[]>([]);
const serverErrorMessage: Ref<string> = ref("");

/**
 * @description Fetch recent baths from API and format weather and date
 * @returns {Promise<void>}
 */
const fetchRecentBaths = async () => {
  try {
    const response = await BathDataService.getRecent();
    recentBaths.value = response.data;

    recentBaths.value.forEach((bath) => {
      bath.formattedCreatedAt = RenderBathData.editDateFormat(bath.createdAt);
      bath.weather = RenderBathData.displayWeatherAsEmoji(bath.weather);
    });
  } catch (error) {
    serverErrorMessage.value = "Impossible de récupérer les baignades récentes";
  }
};

// Fetch recent baths when component is mounted
onMounted(() => {
  fetchRecentBaths();
});
</script>

<style scoped lang="scss">
.section-recent-baths {
  display: flex;
  justify-content: center;
  flex-direction: column;

  h2 {
    margin-bottom: 50px;
    text-align: center;
    font-size: 2rem;

    span {
      color: var(--blue);
      font-family: var(--oswald);
    }
  }

  #loading {
    text-align: center;
  }

  .cards-list {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 20px;
  }

  #recent-baths-link {
    text-align: center;
    margin-top: 50px;
  }

  #error {
    text-align: center;
  }
}
</style>

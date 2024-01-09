<template>
  <section class="recent-baths">
    <h2 class="title">Baignades <span>récentes</span></h2>

    <!-- Loading -->
    <div v-if="!recentBaths.length" class="loading">
      <div class="skeleton" v-for="n in numberOfSkeletons" :key="n"></div>
    </div>

    <!-- Recent baths -->
    <div class="cards-list">
      <BathCard v-for="bath in recentBaths" :key="bath._id" :bath="bath" />
    </div>

    <!-- Link to all baths -->
    <div v-if="!serverErrorMessage" class="all-baths-link">
      <router-link to="/all-baths"><button>Voir tout</button></router-link>
    </div>

    <!-- Error -->
    <div v-if="serverErrorMessage" class="error-message">
      <p>{{ serverErrorMessage }}</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, type Ref } from "vue";
import BathCard from "@/components/baths/BathCard.vue";
import BathDataService from "@/services/BathDataService";
import RenderBathData from "@/helpers/renderBathData";
import gsap from "gsap";
import type { IBath } from "@/types/bath";

const recentBaths = ref<IBath[]>([]);
const serverErrorMessage = ref<string>("");
const skeletonArray = ref([]);
const numberOfSkeletons = 4;

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
// Fetch recent baths when component is mounted and animate title (gsap)
onMounted(() => {
  fetchRecentBaths();

  gsap.fromTo(
    "h2",
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

  .loading {
    text-align: center;
    .skeleton {
      background: linear-gradient(
        90deg,
        var(--secondary-background) 25%,
        var(--skeleton-background) 50%,
        var(--secondary-background) 75%
      );
      background-size: 200% 100%;
      border-radius: 0.75rem;
      animation: toto 1.5s infinite;
      @keyframes toto {
        0% {
          background-position: 200% 0;
        }
        100% {
          background-position: -200% 0;
        }
      }
    }
  }

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

  .error-message {
    text-align: center;
  }
}
</style>

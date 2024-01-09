<template>
  <section class="all-baths-section">
    <!-- Landscape banner -->
    <div class="all-bath-landscape"></div>

    <!-- Title -->
    <div class="all-baths-title">
      <h1 class="title">Toutes les <span>baignades</span></h1>
      <img
        class="illustration-iceberg slideInLeft"
        src="@/assets/images/iceberg.png"
        alt="illlustration d'un iceberg"
      />
    </div>

    <!-- Loading -->
    <div v-if="!Allbaths.length" class="loading">
      <div class="skeleton" v-for="n in numberOfSkeletons" :key="n"></div>
    </div>

    <!-- All baths -->
    <div class="cards-list">
      <BathCard v-for="bath in Allbaths" :key="bath._id" :bath="bath" />
    </div>

    <!-- Pagination -->
    <div class="all-baths-pagination">
      <button @click="changePage(-1)" :disabled="page === 1">Précédent</button>
      <button @click="changePage(1)" :disabled="isNextDisabled">Suivant</button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, watchEffect, computed } from "vue";
import BathDataService from "@/services/BathDataService";
import BathCard from "@/components/baths/BathCard.vue";
import RenderBathData from "@/helpers/renderBathData";
import type { IBath } from "@/types/bath";

const Allbaths = ref<IBath[]>([]);
const page = ref<number>(1);
const limit = ref<number>(16);
const total = ref<number>(0);
const skeletonArray = ref([]);
const numberOfSkeletons = 8;

/**
 * @description Fetch all baths from API and format weather and date
 * @returns {Promise<void>}
 */
const fetchBaths = async () => {
  try {
    const response = await BathDataService.getAll(page.value, limit.value);

    Allbaths.value = response.data.baths;
    Allbaths.value.forEach((bath) => {
      bath.formattedCreatedAt = RenderBathData.editDateFormat(bath.createdAt);
      bath.weather = RenderBathData.displayWeatherAsEmoji(bath.weather);
    });
  } catch (error) {
    // console.error("Erreur lors de la récupération de la baignades:", error);
  }
};

/**
 * @description Change page number
 * @param increment
 */
const changePage = (increment: number) => {
  page.value += increment;
};

// check if next button is disabled
const isNextDisabled = computed(() => Allbaths.value.length < limit.value);

// Fetch all baths when component is mounted and when page changes
watchEffect(() => {
  // console.log("Fetching baths for page:", page.value);
  fetchBaths();
});
</script>

<style lang="scss">
.all-baths-section {
  width: 75%;
  margin: auto;

  .all-bath-landscape {
    height: 90px;
    margin-top: 50px;
    border-top: 2px solid var(--primary-border);
    border-bottom: 2px solid var(--primary-border);
    background-image: url(../assets/images/all-baths-banner.png);
    background-size: cover;
    background-repeat: no-repeat;
    background-position-y: 43%;
  }

  .all-baths-title {
    position: relative;
    margin: 50px auto 20px auto;
    text-align: center;

    h1 {
      margin-bottom: 10px;
    }

    .illustration-iceberg {
      max-width: 100px;
    }
  }

  .loading {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-auto-rows: minmax(200px, auto);
    grid-gap: 1rem;
    margin-top: 20px;

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
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-auto-rows: minmax(200px, auto);
    grid-gap: 1rem;
    margin-top: 20px;
  }

  .all-baths-pagination {
    text-align: center;
    margin-top: 50px;
    button {
      margin: 10px;
    }
  }
}
</style>

<template>
  <section class="all-baths-section">
    <!-- Landscape banner -->
    <div class="all-bath-landscape"></div>

    <!-- Title -->
    <div class="all-baths-title">
      <h1 class="title">Toutes les <span>baignades</span></h1>
      <img
        id="icebergAnimation"
        src="@/assets/images/iceberg.png"
        alt="illlustration d'un iceberg"
      />
    </div>

    <!-- Loading -->
    <div v-if="!allbaths.length" class="loading">
      <div class="skeleton" v-for="n in numberOfSkeletons" :key="n"></div>
    </div>

    <!-- All baths -->
    <div class="cards-list">
      <BathCard
        v-for="bath in allbaths"
        :key="bath._id"
        :bath="bath"
        @weatherIconLoaded="handleWeatherIconLoaded"
      />
    </div>

    <!-- Pagination -->
    <div class="all-baths-pagination">
      <button
        @click="changePage(-1)"
        :disabled="page === 1"
        aria-label="Afficher les baignades précedentes"
      >
        Précédent
      </button>
      <button
        @click="changePage(1)"
        :disabled="isNextDisabled"
        aria-label="Afficher les baignades suivantes"
      >
        Suivant
      </button>
    </div>

    <!-- back button -->
    <div class="back-button">
      <button @click="router.go(-1)" aria-label="Retour à la page précédente">
        Retour
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, watchEffect, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import router from "@/router";
import { gsap } from "gsap";
import BathDataService from "@/services/BathDataService";
import BathCard from "@/components/baths/BathCard.vue";
import RenderBathData from "@/helpers/renderBathData";
import type { IBath } from "@/types/bath";

const route = useRoute();
const allbaths = ref<IBath[]>([]);
const allWeatherIconsLoaded = ref(false);
let loadedIconsCount = 0;
const page = ref<number>(1);
const limit = ref<number>(16);
const total = ref<number>(0);
const skeletonArray = ref([]);
const numberOfSkeletons = 8;

/**
 * Increment the count of loaded weather icons.
 * Once all icons are loaded, update the allWeatherIconsLoaded state.
 */
const handleWeatherIconLoaded = () => {
  loadedIconsCount++;
  if (loadedIconsCount === allbaths.value.length) {
    allWeatherIconsLoaded.value = true;
  }
};

/**
 * Fetches all bath data from the API.
 * Formats the received data for display (date and weather).
 * This function is reactive to page changes for dynamic pagination.
 * @returns {Promise<void>}
 */
const fetchBaths = async () => {
  try {
    const response = await BathDataService.getAll(page.value, limit.value);

    allbaths.value = response.data.baths;
    allbaths.value.forEach((bath) => {
      bath.formattedCreatedAt = RenderBathData.editDateFormat(bath.createdAt);
      bath.weather = RenderBathData.displayWeatherAsEmoji(bath.weather);
    });
  } catch (error) {
    // console.error("Erreur lors de la récupération de la baignades:", error);
  }
};

/**
 * Updates the current page number for pagination.
 * @param {number} increment - The value to add to the current page number.
 */
const changePage = (increment: number) => {
  page.value += increment;
};

// check if next button is disabled
const isNextDisabled = computed(() => allbaths.value.length < limit.value);

// Fetch all baths when component is mounted and when page changes
watchEffect(() => {
  fetchBaths();
});

// GSAP animation for the iceberg image on component mount.
onMounted(() => {
  gsap.fromTo(
    "#icebergAnimation",
    { x: "-100%", visibility: "visible" },
    { duration: 1, x: "0%" }
  );
});
</script>

<style lang="scss">
/* all baths view */
.all-baths-section {
  /* Landscape banner */
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

    /* iceberg animation */
    #icebergAnimation {
      max-width: 100px;
    }
  }

  /* loading skeleton */
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
      animation: loading-animation 1.5s infinite;
      @keyframes loading-animation {
        0% {
          background-position: 200% 0;
        }
        100% {
          background-position: -200% 0;
        }
      }
    }
  }

  /* cards list */
  .cards-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-auto-rows: minmax(200px, auto);
    grid-gap: 1rem;
    margin-top: 20px;
  }

  /* pagination */
  .all-baths-pagination {
    text-align: center;
    margin-top: 50px;
    button {
      margin: 10px;
    }
  }

  .back-button {
    text-align: center;
    button {
      margin-top: 10px;
    }
  }
}
</style>

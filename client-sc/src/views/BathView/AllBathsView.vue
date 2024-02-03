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
    <BathSkeleton v-if="isLoading" :numberOfSkeletons="8" />

    <!-- Error -->
    <div v-if="errorServer" class="error-server">
      <p>Une erreur est survenue lors de la récupération des baignades.</p>
    </div>

    <!-- All baths -->
    <div v-else class="cards-list">
      <BathCard v-for="bath in allbaths" :key="bath._id" :bath="bath" />
    </div>

    <!-- Pagination -->
    <div v-if="!errorServer" class="all-baths-pagination">
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

    <!-- Back button -->
    <BackLink
      path="/"
      ariaLabel="Retour à la page d'accueil"
      content="Retour à l'accueil"
    />
  </section>
</template>

<script setup lang="ts">
import { ref, watchEffect, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import router from "@/router";
import { gsap } from "gsap";
import BathDataService from "@/services/BathDataService";
import BathCard from "@/components/Baths/BathCard.vue";
import RenderBathData from "@/helpers/renderBathData";
import BathSkeleton from "@/components/Baths/BathSkeleton.vue";
import BackLink from "@/components/Common/BackLink.vue";
import type { IBath } from "@/types/bath";

const route = useRoute();

const allbaths = ref<IBath[]>([]);
const errorServer = ref<boolean>(false);
const isLoading = ref<boolean>(false);

const page = ref<number>(1);
const limit = ref<number>(16);
const total = ref<number>(0);

/**
 * Fetches all bath data from the API.
 * Formats the received data for display (date and weather).
 * This function is reactive to page changes for dynamic pagination.
 * @returns {Promise<void>}
 */
const fetchBaths = async () => {
  isLoading.value = true;
  try {
    const response = await BathDataService.getAll(page.value, limit.value);

    allbaths.value = response.data.baths;
    allbaths.value.forEach((bath) => {
      bath.formattedCreatedAt = RenderBathData.editDateFormat(bath.createdAt);
      bath.weather = RenderBathData.displayWeatherAsEmoji(bath.weather);
    });
    errorServer.value = false;
  } catch (error) {
    console.error("Erreur lors de la récupération de la baignades:", error);
    errorServer.value = true;
  } finally {
    isLoading.value = false;
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
    background-image: url(@/assets/images/all-baths-banner.png);
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
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-auto-rows: minmax(200px, auto);
    grid-gap: 1rem;
    margin-top: 20px;

    @include media-max(770px) {
      grid-template-columns: repeat(auto-fill, minmax(60%, 1fr));
    }
  }

  /* pagination */
  .all-baths-pagination {
    text-align: center;
    margin-top: 50px;
    button {
      margin: 10px;
    }
  }
}
</style>

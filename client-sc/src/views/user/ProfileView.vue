<template>
  <!-- User Information -->
  <UserCard
    :username="authStore.user?.username"
    :registrationDate="registrationDate"
    :totalBaths="totalBaths"
    :timeInWater="timeInWater"
    :lowestTemperature="lowestTemperature"
  />
  <section class="section-user-baths">
    <h2 class="title">Mes <span>Baignades</span></h2>

    <!-- All User baths -->
    <div class="cards-list">
      <BathCard
        v-for="bath in allUserBaths.slice(0, lastIndex)"
        :key="bath._id"
        :bath="bath"
        @weatherIconLoaded="handleWeatherIconLoaded"
      />
    </div>
    <!-- display more baths -->
    <button
      @click="lastIndex += 4"
      :disabled="lastIndex >= allUserBaths.length"
    >
      Voir plus
    </button>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watchEffect } from "vue";
import router from "@/router";
import { useAuthStore } from "@/stores/authStore";
import RenderBathData from "@/helpers/renderBathData";
import BathDataService from "@/services/BathDataService";
import UserCard from "@/components/user/UserCard.vue";
import BathCard from "@/components/baths/BathCard.vue";
import type { IBath } from "@/types/bath";

const authStore = useAuthStore();
const loggedIn = computed(() => authStore.status.loggedIn);
const allUserBaths = ref<IBath[]>([]);
const allWeatherIconsLoaded = ref(false);
const registrationDate = ref<string>("");
let loadedIconsCount = 0;
const lastIndex = ref(4);

onMounted(() => {
  // Format user's registration date for display
  registrationDate.value = RenderBathData.editDateFormat(
    authStore.user?.createdAt
  );
  // Fetch user's baths
  fetchUserBaths(authStore.user.id.toString());
});

/**
 * Fetch user's baths with the given userId
 * @param userId
 */
const fetchUserBaths = async (userId: string) => {
  try {
    const response = await BathDataService.getByAuthor(userId);
    allUserBaths.value = response.data as IBath[];
    processBathData();
  } catch (error) {
    console.error("Erreur lors de la récupération des baignades:", error);
  }
};

// Processes bath data for display
const processBathData = () => {
  allUserBaths.value.forEach((bath) => {
    bath.formattedCreatedAt = RenderBathData.editDateFormat(bath.createdAt);
    bath.weather = RenderBathData.displayWeatherAsEmoji(bath.weather);
  });
};

// Computed properties for bath statistics display in UserCard
const totalBaths = computed(() => allUserBaths.value.length);
const timeInWater = computed(() =>
  allUserBaths.value.reduce((acc, bath) => acc + bath.timeInWater, 0)
);
const lowestTemperature = computed(() =>
  allUserBaths.value.reduce(
    (acc, bath) => Math.min(acc, bath.waterTemperature),
    100
  )
);

// Handler for when a weather icon is loaded
const handleWeatherIconLoaded = () => {
  loadedIconsCount++;
  // Mark all weather icons as loaded once count reaches total baths
  if (loadedIconsCount === allUserBaths.value.length) {
    allWeatherIconsLoaded.value = true;
  }
};
</script>

<style lang="scss" scoped>
.section-user-baths {
  h2 {
    text-align: center;
  }
  /* cards list */
  .cards-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-auto-rows: minmax(200px, auto);
    grid-gap: 1rem;
    margin-top: 20px;
  }
  button {
    display: block;
    margin: 30px auto;

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
}
</style>

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

    <!-- Loading -->
    <BathSkeleton v-if="isLoading" :numberOfSkeletons="4" />

    <!-- Error -->
    <div v-if="errorServer" class="error-server">
      <p>Une erreur est survenue lors de la récupération des baignades.</p>
    </div>

    <!-- All User baths -->
    <div class="cards-list">
      <BathCard
        v-for="bath in allUserBaths.slice(0, lastIndex)"
        :key="bath._id"
        :bath="bath"
      />
    </div>
    <!-- display more baths -->
    <button
      @click="lastIndex += 4"
      :disabled="lastIndex >= allUserBaths.length"
    >
      Voir plus
    </button>

    <!-- Back button -->
    <BackLink
      path="/"
      ariaLabel="Retour à la page d'accueil"
      content="Retour à l'accueil"
    />
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useTitle } from "@vueuse/core";
import router from "@/router";
import { useAuthStore } from "@/stores/authStore";
import RenderBathData from "@/helpers/renderBathData";
import BathDataService from "@/services/BathDataService";
import UserCard from "@/components/User/UserCard.vue";
import BathCard from "@/components/Baths/BathCard.vue";
import BathSkeleton from "@/components/Baths/BathSkeleton.vue";
import BackLink from "@/components/Common/BackLink.vue";
import type { IBath } from "@/types/bath";

// Page title
const title = useTitle("StayCold - Mon Profil");

const authStore = useAuthStore();
const loggedIn = computed(() => authStore.status.loggedIn);
const allUserBaths = ref<IBath[]>([]);
const registrationDate = ref<string>("");
const lastIndex = ref(4);
const errorServer = ref<boolean>(false);
const isLoading = ref<boolean>(false);

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
  isLoading.value = true;
  try {
    const response = await BathDataService.getByAuthor(userId);
    allUserBaths.value = response.data as IBath[];
    processBathData();
    errorServer.value = false;
  } catch (error) {
    console.error("Erreur lors de la récupération des baignades:", error);
    errorServer.value = true;
  } finally {
    isLoading.value = false;
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
</script>

<style lang="scss" scoped>
.section-user-baths {
  h2 {
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

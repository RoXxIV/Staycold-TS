<template>
  <section class="bath-details-section">
    <h1 class="title">Details de la <span>Baignade</span></h1>

    <!-- bath cards details -->
    <BathCardDetails v-if="bathDetails" :bath="bathDetails" />

    <!-- bath comments if owner -->
    <div v-if="loggedIn" class="commentary">
      <h3>Commentaire</h3>
      <span>
        "{{
          bathDetails.commentary ? bathDetails.commentary : "Aucun commantaire"
        }}"</span
      >
    </div>

    <!-- edit and delete buttons if owner -->
    <div v-if="loggedIn" class="action">
      <router-link :to="`/edit-bath/${bathDetails._id}`"
        ><button>
          Modifier
          <font-awesome-icon :icon="['far', 'pen-to-square']" /></button
      ></router-link>
      <button>
        Supprimer <font-awesome-icon :icon="['far', 'trash-can']" />
      </button>
    </div>

    <!-- back button -->
    <div class="back-button">
      <button @click="goBack">Retour</button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import router from "@/router";
import { useAuthStore } from "@/stores/authStore";
import BathCardDetails from "@/components/baths/BathCardDetails.vue";
import BathDataService from "@/services/BathDataService";
import RenderBathData from "../helpers/renderBathData";
import type { IBath } from "@/types/bath";

// use the authStore to get the loggedIn status
const authStore = useAuthStore();
const loggedIn = computed(() => authStore.status.loggedIn);

const route = useRoute();
const bathDetails = ref({} as IBath);

// get the bath id from the route params and fetch the bath details
onMounted(() => {
  const bathId = route.params.bathId;
  if (!bathId) {
    router.push("/not-found");
  } else {
    fetchOneBath(bathId.toString());
  }
});

// fetch the bath details and format the data to be displayed
const fetchOneBath = async (bathId: string) => {
  try {
    const response = await BathDataService.getOne(bathId);
    bathDetails.value = response.data as IBath;
    bathDetails.value.formattedCreatedAt = RenderBathData.editDateFormat(
      bathDetails.value.createdAt
    );
    bathDetails.value.weather = RenderBathData.displayWeatherAsEmoji(
      bathDetails.value.weather
    );
  } catch (error) {
    // console.error("Erreur lors de la récupération de la baignades:", error);
  }
};

// go back to the previous page
const goBack = () => {
  router.go(-1);
};
</script>

<style lang="scss">
.bath-details-section {
  width: 40%;
  margin: auto;
  h1 {
    text-align: center;
    font-size: 2em;
    margin-bottom: 50px;
  }

  .commentary {
    text-align: center;
    margin-top: 50px;
  }
  .action {
    margin: 30px 0;
    text-align: center;
    button:first-child {
      margin-right: 10px;
    }
  }

  .back-button {
    text-align: center;
    button {
      margin-top: 10px;
    }
  }

  @include media-max(991.98px) {
    width: 70%;

    .commentary {
      text-align: center;
      margin-top: 50px;
    }

    .action {
      text-align: center;
    }

    .back-button {
      text-align: center;
    }

    @include media-max(550px) {
      width: 90%;
      font-size: 0.8em;
    }
  }
}
</style>

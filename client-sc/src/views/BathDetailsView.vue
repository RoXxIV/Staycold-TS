<template>
  <section class="bath-details-section" v-if="!deleteSubmited">
    <h1 class="title">Details de la <span>Baignade</span></h1>

    <!-- bath cards details -->
    <BathCardDetails v-if="bathDetails" :bath="bathDetails" />

    <!-- bath comments if owner -->
    <div v-if="loggedIn && isOwner" class="commentary">
      <h3>Commentaire</h3>
      <span>
        "{{
          bathDetails.commentary ? bathDetails.commentary : "Aucun commantaire"
        }}"</span
      >
    </div>

    <!-- edit and delete buttons if owner -->
    <div v-if="loggedIn && isOwner" class="action">
      <router-link :to="`/edit-bath/${bathDetails._id}`"
        ><button aria-label="Modifier la baignade">
          Modifier
          <font-awesome-icon
            :icon="['far', 'pen-to-square']"
            aria-label="true"
          /></button
      ></router-link>
      <button @click="showModal = true" aria-label="Supprimer la baignade">
        Supprimer
        <font-awesome-icon :icon="['far', 'trash-can']" aria-label="true" />
      </button>
    </div>

    <PopupModal
      :isdisplayed="showModal"
      @close="showModal = false"
      class="modal-content"
    >
      <template v-slot:default="{ close }"
        ><p>Cette action est irréversible</p>
        <vue3-lottie
          :options="lottieOptions"
          class="lottie"
          :animationData="lottieOptions.animationData"
        ></vue3-lottie>
        <p>êtes vous sur ?</p>
        <div>
          <!-- cancel button -->
          <button @click="close" aria-label="Annuler et fermer le modal">
            Annuler
          </button>
          <!-- delete button -->
          <button
            @click="deleteOneBath(bathDetails._id, authStore.user.id)"
            aria-label="Supprimer la baignade"
          >
            Supprimer
          </button>
        </div></template
      >
    </PopupModal>

    <!-- back button -->
    <div class="back-button">
      <button @click="router.go(-1)" aria-label="Retour à la page précédente">
        Retour
      </button>
    </div>
  </section>

  <div v-else>
    <ServerResponses
      :serverMessage="serverMessage"
      :timeBeforeRedirection="3"
      :redirectTo="redirectionPath"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from "vue";
import { useRoute } from "vue-router";
import router from "@/router";
import { useAuthStore } from "@/stores/authStore";
import BathCardDetails from "@/components/baths/BathCardDetails.vue";
import BathDataService from "@/services/BathDataService";
import RenderBathData from "../helpers/renderBathData";
import ServerResponses from "@/components/reusable/ServerResponses.vue";
import PopupModal from "@/components/reusable/PopupModal.vue";
import deleteLottie from "@/assets/lotties/delete.json";
import { useLottieOptions } from "@/helpers/useLottieOptions";
import type { IBath } from "@/types/bath";

const authStore = useAuthStore();
const loggedIn = computed(() => authStore.status.loggedIn);
const isOwner = ref(false);
const route = useRoute();
const bathDetails = ref({} as IBath);
const showModal = ref(false);
const serverMessage = ref("");
const deleteSubmited = ref(false);
const redirectionPath = ref<string>("/");

// lottie options
const lottieOptions = useLottieOptions(deleteLottie);

// get the bath id from the route params and fetch the bath details
onMounted(() => {
  const bathId = route.params.bathId;
  if (!bathId) {
    router.push("/not-found");
  } else {
    fetchOneBath(bathId.toString());
  }
});

// watch the bath details to check if the user is the owner
watch(bathDetails, (newVal) => {
  if (newVal && newVal.author && newVal.author._id && authStore.user) {
    isOwner.value = newVal.author._id === authStore.user.id;
  }
});

/**
 * fetch the bath details, format the date and weather
 * and check if the user is the owner
 * @param bathId
 */
const fetchOneBath = async (bathId: string) => {
  try {
    const response = await BathDataService.getOne(bathId);
    bathDetails.value = response.data as IBath;
    isOwner.value =
      authStore.user && bathDetails.value.author._id === authStore.user.id;
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

/**
 * delete the bath and redirect to the home page
 * if an error occurs, display the error message and redirect to the home page
 * @param bathId
 * @param userID
 */
const deleteOneBath = async (bathId: string, userID: string) => {
  try {
    const response = await BathDataService.delete(bathId.toString(), userID);
    deleteSubmited.value = true;
    serverMessage.value = response.data.message;
    showModal.value = false;
  } catch (error) {
    deleteSubmited.value = true;
    serverMessage.value =
      (error as any)?.response?.data?.message || "Une erreur est survenue";
    // console.error("Erreur lors de la suppression de la baignade:", error);
  }
};
</script>

<style lang="scss">
/* Bath details */
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

  /* Modal */
  .modal-content {
    text-align: center;
    .lottie {
      max-width: 200px;
    }
    button {
      margin: 10px;
    }
  }

  /* media queries for bath-details-section */
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
      margin-top: 30px;
    }

    @include media-max(550px) {
      width: 90%;
      font-size: 0.8em;
    }
  }
}
</style>

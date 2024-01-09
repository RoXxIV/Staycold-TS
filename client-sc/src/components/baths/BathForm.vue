<template>
  <!-- Form -->
  <form @submit="handleSubmit" v-if="!isSubmited" class="add-bath-form">
    <p>Champs obligatoires <sup>*</sup></p>
    <div class="fields-bloc">
      <!-- WaterTemperature field -->
      <CustomNumberInput
        field-id="waterTemperature"
        field-name="waterTemperature"
        class="form-field"
        field="waterTemperature"
        v-model="waterTemperature"
        :min="-48"
        :max="50"
        placeholder="&#8451;"
      >
        <template v-slot:label
          ><label for="waterTemperature">
            <font-awesome-icon
              class="font-awesome-icon"
              :icon="['fa', 'swimming-pool']"
            />
            Température de l'eau <sup>*</sup>
          </label></template
        >
      </CustomNumberInput>

      <!-- TemperatureOutside field -->
      <CustomNumberInput
        class="form-field"
        field-id="temperatureOutside"
        field-name="temperatureOutside"
        v-model="temperatureOutside"
        :min="-60"
        :max="60"
        placeholder="&#8451;"
      >
        <template v-slot:label
          ><label for="temperatureOutside"
            ><font-awesome-icon
              class="font-awesome-icon"
              :icon="['fa', 'temperature-high']"
            />
            Température de l'air <sup>*</sup></label
          ></template
        >
      </CustomNumberInput>
    </div>

    <div class="fields-bloc">
      <!-- Weather field -->
      <CustomSelectInput
        class="form-field"
        field-id="weather"
        field-name="weather"
        v-model="weather"
        :options="weathers"
      >
        <template v-slot:label
          ><label for="weather"
            ><font-awesome-icon
              class="font-awesome-icon"
              :icon="['fa', 'cloud-sun-rain']"
            />
            Météo <sup>*</sup></label
          ></template
        >
      </CustomSelectInput>

      <!-- TimeInWater field -->
      <CustomNumberInput
        class="form-field"
        field-id="timeInWater"
        field-name="timeInWater"
        v-model="timeInWater"
        :min="1"
        :max="120"
        placeholder="minutes"
      >
        <template v-slot:label
          ><label for="timeInWater"
            ><font-awesome-icon
              class="font-awesome-icon"
              :icon="['fa', 'stopwatch']"
            />
            Temps passé dans l'eau <sup>*</sup></label
          ></template
        >
      </CustomNumberInput>
    </div>

    <div class="fields-bloc">
      <!-- RecoveryTime field -->
      <CustomNumberInput
        class="form-field"
        field-id="recoveryTime"
        field-name="recoveryTime"
        v-model="recoveryTime"
        :min="0"
        :max="180"
        placeholder="minutes"
      >
        <template v-slot:label
          ><label for="recoveryTime"
            ><font-awesome-icon
              class="font-awesome-icon"
              :icon="['fa', 'hourglass-half']"
            />
            Temps de récupération</label
          ></template
        >
      </CustomNumberInput>

      <!-- Wind field -->
      <CustomSelectInput
        class="form-field"
        field-id="wind"
        field-name="wind"
        v-model="wind"
        :options="winds"
      >
        <template v-slot:label
          ><label for="wind"
            ><font-awesome-icon
              class="font-awesome-icon"
              :icon="['fa', 'wind']"
            />
            Vent</label
          ></template
        >
      </CustomSelectInput>
    </div>

    <div class="fields-bloc">
      <!-- Afterdrop field -->
      <CustomSelectInput
        class="form-field"
        field-id="afterdrop"
        field-name="afterdrop"
        v-model="afterdrop"
        :options="afterdrops"
      >
        <template v-slot:label
          ><label for="afterdrop"
            ><font-awesome-icon
              class="font-awesome-icon"
              :icon="['fa', 'wave-square']"
            />
            Afterdrop
          </label></template
        >
      </CustomSelectInput>

      <!-- GlobalFeeling field -->
      <CustomSelectInput
        class="form-field"
        field-id="globalFeeling"
        field-name="globalFeeling"
        v-model="globalFeeling"
        :options="globalFeelings"
      >
        <template v-slot:label
          ><label for="globalFeeling"
            ><font-awesome-icon
              class="font-awesome-icon"
              :icon="['fa', 'grin-stars']"
            />
            Ressenti globale</label
          ></template
        >
      </CustomSelectInput>
    </div>

    <!-- Commentary field -->
    <CustomTextArea
      class="form-field"
      field-id="commentary"
      field-name="commentary"
      v-model="commentary"
      placeholder="Votre commentaire ici"
    >
      <template v-slot:label
        ><label for="commentary"
          ><font-awesome-icon
            class="font-awesome-icon"
            :icon="['fa', 'comment']"
          />
          Commentaire</label
        ></template
      >
    </CustomTextArea>

    <!-- Submit -->
    <div class="submit">
      <button type="submit">Envoyer</button>
    </div>
  </form>
  <div v-else class="server-messages">
    <ServerResponses
      :serverMessage="serverMessage"
      :timeBeforeRedirection="3"
      :redirectTo="redirectionPath"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import * as yup from "yup";
import { useForm, useField } from "vee-validate";
import { useRoute } from "vue-router";
import { useAuthStore } from "@/stores/authStore";
import BathDataService from "@/services/BathDataService";
import CustomNumberInput from "@/components/forms/CustomNumberInput.vue";
import CustomSelectInput from "../forms/CustomSelectInput.vue";
import CustomTextArea from "../forms/CustomTextArea.vue";
import ServerResponses from "../reusable/ServerResponses.vue";

import type { IBath } from "@/types/bath";

// Define component props
const props = defineProps({
  editMode: {
    type: Boolean,
    default: false,
  },
});

const route = useRoute();
const isSubmited = ref(false);
const serverMessage = ref("");
const redirectionPath = ref("");

// Options for select inputs
const weathers = [
  "partiellement nuageux",
  "nuageux",
  "ensoleillé",
  "pluie",
  "neige",
  "tempête",
];
const winds = ["aucun", "leger", "modéré", "beaucoup"];
const afterdrops = ["très intense", "intense", "modéré", "leger", "aucun"];
const globalFeelings = ["très dur", "dur", "modéré", "facile", "très facile"];

// Form validation schema using yup
const schema = yup.object({
  waterTemperature: yup
    .number()
    .transform((value) => (isNaN(value) || value === "" ? null : value))
    .required("La température de l'eau est requise")
    .min(-48, "La température de l'eau doit être supérieure à -48")
    .max(50, "La température de l'eau doit être inférieure à 50"),
  temperatureOutside: yup
    .number()
    .transform((value) => (isNaN(value) || value === "" ? null : value))
    .required("La température extérieure est requise")
    .min(-60, "La température extérieure doit être supérieure à -60")
    .max(60, "La température extérieure doit être inférieure à 60"),
  weather: yup
    .string()
    .required("La météo est requise")
    .oneOf(weathers, "Choix invalide"),
  timeInWater: yup
    .number()
    .transform((value) => (isNaN(value) || value === "" ? null : value))
    .required("Le temps passé dans l'eau est requis")
    .min(1, "Le temps passé dans l'eau doit être supérieur à 1 min")
    .max(120, "Le temps passé dans l'eau doit être inférieur à 1440 min"),
  wind: yup.string().nullable().oneOf(winds, "Choix invalide"),
  recoveryTime: yup
    .number()
    .transform((value) => (isNaN(value) || value === "" ? null : value))
    .nullable()
    .min(0, "Le temps de récupération doit être supérieur à 0.1 min")
    .max(180, "Le temps de récupération doit être inférieur à 1440 min"),
  afterdrop: yup.string().nullable().oneOf(afterdrops, "Choix invalide"),
  globalFeeling: yup
    .string()
    .nullable()
    .oneOf(globalFeelings, "Choix invalide"),
  commentary: yup
    .string()
    .nullable()
    .max(500, "Le commentaire doit être inférieur à 500 caractères"),
});
// Setup form validation using vee-validate
const { handleSubmit: handleVeeSubmit } = useForm({ validationSchema: schema });
// Define fields using useField hook
const { value: waterTemperature } = useField<number>("waterTemperature");
const { value: temperatureOutside } = useField<number>("temperatureOutside");
const { value: weather } = useField<string>("weather");
const { value: timeInWater } = useField<number>("timeInWater");
const { value: wind } = useField<string>("wind");
const { value: recoveryTime } = useField<number>("recoveryTime");
const { value: afterdrop } = useField<string>("afterdrop");
const { value: globalFeeling } = useField<string>("globalFeeling");
const { value: commentary } = useField<string>("commentary");

// Fetch bath details on component mount if in edit mode
onMounted(async () => {
  const bathId = route.params.bathId;
  if (props.editMode && bathId) {
    await fetchOneBath(bathId.toString());
  }
});

// Handle form submission, if in edit mode, send edited bath to server else send new bath
const handleSubmit = handleVeeSubmit(async (values: any) => {
  const bathId = route.params.bathId as string;
  if (props.editMode && bathId) {
    await editOnSubmit(bathId, values);
  } else {
    await addOnSubmit(values);
  }
});

/**
 * @description: Send the new bath to the server
 * if the response is 201, the bath is created
 * else an error message is displayed
 */
const addOnSubmit = async (values: IBath) => {
  try {
    // Get the user id from the store
    const authStore = useAuthStore();
    const userId = authStore.user.id;

    const completeValues = {
      ...values,
      author: userId,
    };
    const response = await BathDataService.create(completeValues);

    if (response.status === 201) {
      redirectionPath.value = `/bath-details/${response.data.bath._id}`;
      serverMessage.value = response.data.message;
      isSubmited.value = true;
    }
  } catch (error) {
    isSubmited.value = true;
    serverMessage.value =
      (error as any)?.response?.data?.message || "Une erreur est survenue";
    // console.log(error);
  }
};

/**
 * @description: Send the edited bath to the server
 * if the response is 200, the bath is updated
 * else an error message is displayed
 */

const editOnSubmit = async (bathId: string, values: IBath) => {
  try {
    const authStore = useAuthStore();
    const userId = authStore.user.id;

    const completeValues = { ...values, author: userId };
    const response = await BathDataService.update(bathId, completeValues);

    if (response.status === 200) {
      serverMessage.value = response.data.message;
      isSubmited.value = true;
      redirectionPath.value = `/bath-details/${bathId}`;
    }
  } catch (error) {
    isSubmited.value = true;
    redirectionPath.value = "/";
    serverMessage.value =
      (error as any)?.response?.data?.message || "Une erreur est survenue";
    // console.log(error);
  }
};

// Fetch details of a single bath
const fetchOneBath = async (bathId: string) => {
  try {
    const response = await BathDataService.getOne(bathId);
    waterTemperature.value = response.data.waterTemperature;
    timeInWater.value = response.data.timeInWater;
    temperatureOutside.value = response.data.temperatureOutside;
    weather.value = response.data.weather;
    wind.value = response.data.wind;
    recoveryTime.value = response.data.recoveryTime;
    afterdrop.value = response.data.afterdrop;
    globalFeeling.value = response.data.globalFeeling;
    commentary.value = response.data.commentary;
  } catch (error) {
    // console.error("Erreur lors de la récupération de la baignades:", error);
  }
};
</script>

<style scoped lang="scss">
.add-bath-form {
  width: 1000px;
  margin: auto;
  padding: 20px 30px;
  border-radius: 0.75rem;
  -webkit-box-shadow: 1px 1px 17px -5px #3b82f6;
  -moz-box-shadow: 1px 1px 17px -5px #3b82f6;
  box-shadow: 1px 1px 17px -5px #3b82f6;

  p {
    text-align: center;
    margin-bottom: 2rem;
    sup {
      color: var(--blue);
    }
  }
  .fields-bloc {
    display: flex;
    justify-content: space-between;
    align-items: center;

    @include media-max(991.98px) {
      flex-direction: column;
    }
  }
  .form-field {
    width: 45%;
    margin: 20px auto;
    min-height: 150px;

    label {
      display: block;
      margin-bottom: 20px;
      font-size: 1.2em;

      sup {
        color: var(--blue);
      }
      .font-awesome-icon {
        margin-right: 10px;
      }

      @include media-max(611.98px) {
        font-size: 1em;
      }
    }

    @include media-max(991.98px) {
      width: 75%;
      margin: 0 auto;

      @include media-max(611.98px) {
        width: 100%;
      }
    }
  }
  .submit {
    text-align: center;
    margin-top: 30px;
  }

  @include media-max(991.98px) {
    width: 100%;
    padding: 10px 10px 30px 10px;
    margin-top: 50px;

    @include media-max(611.98px) {
      width: 100%;
    }
  }
}
.server-messages {
  margin-top: 50px;
}
</style>

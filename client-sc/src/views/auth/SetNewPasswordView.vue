<template>
  <section class="set-new-password-section">
    <div v-if="!successful">
      <h1 class="title-block">Réinitialisation du <span>mot de passe</span></h1>
      <!-- Reset password Form -->
      <form @submit="onSubmit" class="custom-form">
        <!-- Password -->
        <CustomTextInput
          fieldId="password"
          fieldName="password"
          placeholder="Entrez votre mot de passe"
          v-model="password"
          type="password"
        >
          <template v-slot:label
            ><label for="password">Mot de passe:</label></template
          >
        </CustomTextInput>

        <!-- Confirm password -->
        <CustomTextInput
          fieldId="confirmPassword"
          fieldName="confirmPassword"
          placeholder="Confirmez votre mot de passe"
          v-model="confirmPassword"
          type="password"
        >
          <template v-slot:label
            ><label for="confirmPassword"
              >Confirmez votre mot de passe:</label
            ></template
          >
        </CustomTextInput>

        <!-- Submit -->
        <div class="submit">
          <button type="submit" aria-label="Soumettre le formulaire">
            Envoyer
          </button>
        </div>
      </form>

      <!-- Error message -->
      <div v-if="serverErrorMessage && !successful" class="if-error">
        {{ serverErrorMessage }}
      </div>
    </div>

    <!-- if succed -->
    <div v-else class="if-succed">
      <ServerResponses
        :serverMessage="serverMessage"
        :timeBeforeRedirection="5"
        :redirectTo="redirectionPath"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import * as yup from "yup";
import { useForm, useField } from "vee-validate";
import router from "@/router";
import { useRoute } from "vue-router";
import AuthService from "@/services/auth-service";
import ServerResponses from "@/components/reusable/ServerResponses.vue";
import CustomTextInput from "@/components/forms/CustomTextInput.vue";

const route = useRoute();
const successful = ref<boolean>(false);
const serverErrorMessage = ref<string>("");
const serverMessage = ref<string>("");
const redirectionPath = ref<string>("/login");
const confirmationCode = ref<string>("");

// Validation schema with Yup and vee-validate
const schema = yup.object({
  password: yup
    .string()
    .required("Le mot de passe est requis")
    .min(8, "Le mot de passe doit contenir au moins 8 caractères")
    .max(128, "Le mot de passe doit contenir au maximum 128 caractères"),
  confirmPassword: yup
    .string()
    .required("La confirmation du mot de passe est requise")
    .oneOf([yup.ref("password")], "Les mots de passe doivent correspondre"),
});
const { handleSubmit } = useForm({ validationSchema: schema });
const { value: password } = useField("password");
const { value: confirmPassword } = useField("confirmPassword");

/**
 * Submit the form and send the new password to the server.
 * If the password is valid and the confirmation code is valid, redirect to the login page.
 * Else display an error message.
 * @param {Event} event
 * @returns {Promise<void>}
 * @throws {Error} - If the confirmation code is not valid.
 * @throws {Error} - If the password is not valid.
 */
const onSubmit = handleSubmit(async () => {
  try {
    const response = await AuthService.resetPassword(
      password.value as string,
      confirmationCode.value as string
    );

    if (response.status === 200) {
      serverMessage.value = response.data.message;
      successful.value = true;
    }
  } catch (error) {
    serverErrorMessage.value =
      (error as any)?.response?.data?.message || "Erreur lors de la connexion";
  }
});

/**
 * This function is called when the component is mounted.
 * it checks if the confirmation code is present in the url and call the sendConfirmationCode function.
 * If the confirmation code is not present, redirect the user to the not found page.
 * @param {string} confirmationCode - The confirmation code.
 * @returns {void} - Nothing.
 */
onMounted(() => {
  confirmationCode.value = route.params.confirmationCode.toString();
  if (!confirmationCode) {
    router.push("/not-found");
  }
});
</script>

<style lang="scss" scoped>
/* Set new password section */
.set-new-password-section {
  margin: 30px auto 0px auto;

  & div:first-child {
    display: flex;
    flex-direction: column;

    h1 {
      margin-top: 50px;
      text-align: center;
      font-size: 2em;
    }

    form {
      margin: auto;
    }

    .if-error {
      margin-top: 50px;
      text-align: center;
      color: var(--red);
    }
  }
}
</style>

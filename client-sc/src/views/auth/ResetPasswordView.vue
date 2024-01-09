<template>
  <section class="reset-password-section">
    <div v-if="!successful">
      <h1 class="title-block">Demander un nouveau <span>Mot de passe</span></h1>
      <!-- Reset password Form -->
      <form @submit="onSubmit" class="custom-form">
        <!-- Email field -->
        <div class="form-field">
          <label for="email">Email:</label>
          <Field
            id="email"
            name="email"
            v-model="email"
            type="email"
            placeholder="Entrez votre email"
            aria-label="Email"
          />
          <ErrorMessage name="email" class="error-feedback" />
        </div>

        <!-- Email confirmation fiels -->
        <div class="form-field">
          <label for="emailConfirmation">Confirmer l'Email:</label>
          <Field
            id="emailConfirmation"
            name="emailConfirmation"
            v-model="emailConfirmation"
            type="email"
            placeholder="Entrez votre email"
            aria-label="Email"
          />
          <ErrorMessage name="emailConfirmation" class="error-feedback" />
        </div>

        <!-- Submit -->
        <div class="submit">
          <button type="submit">Envoyer</button>
        </div>
      </form>

      <!-- Error message -->
      <div
        v-if="serverErrorMessage && !successful"
        class="error-reset-password"
      >
        {{ serverErrorMessage }}
      </div>
    </div>

    <!-- Email confirmed -->
    <div v-else class="email-confirmed">
      <ServerResponses
        :serverMessage="serverMessage"
        :timeBeforeRedirection="5"
        :redirectTo="redirectionPath"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import * as yup from "yup";
import { useForm, useField, Field, ErrorMessage } from "vee-validate";
import AuthService from "@/services/auth-service";
import ServerResponses from "@/components/reusable/ServerResponses.vue";

const successful = ref<boolean>(false);
const serverMessage = ref<string>("");
const serverErrorMessage = ref<string>("");
const redirectionPath = ref<string>("/login");

// Validation schema with Yup and vee-validate
const schema = yup.object({
  email: yup
    .string()
    .required("L'email est requis")
    .email("L'email doit être valide")
    .max(320, "L'email doit contenir au maximum 320 caractères"),
  emailConfirmation: yup
    .string()
    .required("L'email est requis")
    .oneOf([yup.ref("email")], "Les emails doivent correspondre"),
});
const { handleSubmit } = useForm({ validationSchema: schema });
const { value: email } = useField<string>("email");
const { value: emailConfirmation } = useField<string>("emailConfirmation");

/**
 * @description Submit the form and send the email to the user
 * if the email is valid and the user exists redirect to the login page
 * else display an error message
 * @param {Event} event
 * @returns {Promise<void>}
 */
const onSubmit = handleSubmit(async () => {
  try {
    const response = await AuthService.resetPasswordEmail(
      email.value as string
    );
    if (response.status === 200) {
      serverMessage.value = response.data.message;
      successful.value = true;
    }
  } catch (error) {
    serverErrorMessage.value =
      (error as any)?.response?.data?.message || "Une erreur est survenue";
  }
});
</script>

<style lang="scss" scoped>
.reset-password-section {
  width: 75vw;
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
  }
  .error-reset-password {
    margin-top: 50px;
    text-align: center;
    color: var(--red);
  }

  @media (max-width: 611.98px) {
    width: 100vw;
  }
}
</style>

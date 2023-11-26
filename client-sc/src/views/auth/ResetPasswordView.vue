<template>
  <section class="reset-password-section">
    <div v-if="!successful">
      <h1>Demander un nouveau <span class="title-span">Mot de passe</span></h1>
      <!-- Reset password Form -->
      <form @submit="onSubmit" class="custom-form">
        <!-- Email field -->
        <div class="form-field">
          <label for="email">Email:</label>
          <input
            id="email"
            v-model="email"
            type="email"
            placeholder="Entrez votre email"
            aria-label="Email"
          />
          <span class="error-feedback">{{ emailError }}</span>
        </div>

        <!-- Email confirmation fiels -->
        <div class="form-field">
          <label for="emailConfirmation">Confirmer l'Email:</label>
          <input
            id="emailConfirmation"
            v-model="emailConfirmation"
            type="email"
            placeholder="Entrez votre email"
            aria-label="Email"
          />
          <span class="error-feedback">{{ emailConfirmationError }}</span>
        </div>

        <!-- Submit -->
        <div class="submit">
          <button type="submit">Envoyer</button>
        </div>
      </form>

      <!-- Error message -->
      <div v-if="serverErrorMessage && !successful" id="error">
        {{ serverErrorMessage }}
      </div>
    </div>

    <!-- Email confirmed -->
    <div v-else id="emailConfirmed">
      <p><span>❄</span> {{ succesMessage }} <span>❄</span></p>
      <p>Redirection dans {{ timeToLogin }}</p>
      <vue3-lottie
        :options="loaderOptions"
        class="lottie"
        :animationData="loaderOptions.animationData"
      ></vue3-lottie>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import * as yup from "yup";
import { useForm, useField } from "vee-validate";
import AuthService from "@/services/auth-service";
import { useRedirectionTimer } from "@/helpers/redirectionHelper";
import lottieLoader from "@/assets/lotties/loader.json";

// lottie options
const loaderOptions = ref({
  animationData: lottieLoader,
  loop: true,
  autoplay: true,
});

const successful = ref(false);
const succesMessage = ref("");
const serverErrorMessage = ref("");

// settings for the redirection timer after the user is confirmed or not
const { time: timeToLogin, startRedirectionTimer: redirectToLogin } =
  useRedirectionTimer("/login", 5);

// Validation schema with Yup
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

// Configuring the form validation with vee-validate
const { handleSubmit } = useForm({ validationSchema: schema });
const { value: email, errorMessage: emailError } = useField("email");
const { value: emailConfirmation, errorMessage: emailConfirmationError } =
  useField("emailConfirmation");

/**
 * @description Submit the form and send the email to the user
 * if the email is valid and the user exists redirect to the login page
 * else display an error message
 * @param {Event} event
 * @returns {Promise<void>}
 */
const onSubmit = handleSubmit(async () => {
  try {
    console.log("Email:", email.value);
    const response = await AuthService.resetPasswordEmail(
      email.value as string
    );
    if (response.status === 200) {
      succesMessage.value = response.data.message;
      successful.value = true;
      redirectToLogin();
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

  #error {
    margin-top: 50px;
    text-align: center;
    color: var(--red);
  }

  #emailConfirmed {
    margin-top: 50px;
    text-align: center;

    & p:first-child {
      font-size: 1.2em;
    }

    span {
      color: var(--blue);
    }

    & p:nth-child(2) {
      text-decoration: underline;
    }

    .lottie {
      width: 300px;
      margin: auto;
      @media (max-width: 611.98px) {
        width: 200px;
      }
    }
  }
}
</style>

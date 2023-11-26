<template>
  <section class="register-section">
    <!-- Main bloc that contain form and illustration -->
    <div id="bloc">
      <!-- Form container -->
      <div v-if="!isSubmitted" id="form-container">
        <h1>Formulaire d'<span class="title-span">Inscription</span></h1>

        <!-- Regiser Form -->
        <form @submit="onSubmit" class="custom-form">
          <!-- Username field ----------->
          <div class="form-field">
            <label for="username">Nom d'utilisateur:</label>
            <input
              id="username"
              v-model="username"
              type="text"
              placeholder="Entrez votre nom d'utilisateur"
              aria-label="Nom d'utilisateur"
            />
            <span class="error-feedback">{{ usernameError }}</span>
          </div>

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

          <!-- Password field -->
          <div class="form-field">
            <label for="password">Mot de passe:</label>
            <input
              id="password"
              v-model="password"
              type="password"
              placeholder="Entrez votre mot de passe"
              aria-label="Mot de passe"
            />
            <span class="error-feedback">{{ passwordError }}</span>
          </div>

          <!-- Confirm password field -->
          <div class="form-field">
            <label for="confirm-password">Confirmez votre mot de passe:</label>
            <input
              id="confirm-password"
              v-model="confirmPassword"
              type="password"
              placeholder="Confirmez votre mot de passe"
              aria-label="Confirmez votre mot de passe"
            />
            <span class="error-feedback">{{ confirmPasswordError }}</span>
          </div>

          <!-- Server error message -->
          <span class="error-feedback">{{ serverErrorMessage }}</span>

          <!-- Submit -->
          <div class="submit">
            <button type="submit">Inscription</button>
          </div>
        </form>

        <!-- Redirection link -->
        <div class="redirection-link">
          <router-link to="/login">Déjà inscrit ?</router-link>
        </div>
      </div>
      <!-- Illustration -->
      <div v-if="!isSubmitted" class="illustration-container">
        <img
          class="rubberBand"
          src="@/assets/images/inscription.svg"
          alt="Illustration d'une montagne sur fond bleu avec des nuages en arriere plan"
        />
      </div>
    </div>
    <!-- Success message -->
    <div v-show="isSubmitted && serverSuccesMessage" id="if-success">
      <p><span>❄</span> {{ serverSuccesMessage }} <span>❄</span></p>
      <p>Redirection dans {{ timeToHome }}</p>
      <vue3-lottie
        :options="lottieOptions"
        class="lottie"
        :animationData="lottieOptions.animationData"
      ></vue3-lottie>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import * as yup from "yup";
import { useForm, useField } from "vee-validate";
import { useAuthStore } from "@/stores/authStore";
import { useRedirectionTimer } from "@/helpers/redirectionHelper";
import LottieLoader from "@/assets/lotties/loader.json";

const authStore = useAuthStore();

// lottie options
const lottieOptions = ref({
  animationData: LottieLoader,
  loop: true,
  autoplay: true,
});

const serverErrorMessage = ref("");
const serverSuccesMessage = ref("");
const isSubmitted = ref(false);

// settings for the redirection timer after the user is registered
const { time: timeToHome, startRedirectionTimer: redirectToHome } =
  useRedirectionTimer("/", 5);

// Validation schema with Yup
const schema = yup.object({
  username: yup
    .string()
    .required("Le nom d'utilisateur est requis")
    .min(3, "Le nom d'utilisateur doit contenir au moins 3 caractères")
    .max(50, "Le nom d'utilisateur doit contenir au maximum 50 caractères"),
  email: yup
    .string()
    .required("L'email est requis")
    .email("L'email doit être valide")
    .max(320, "L'email doit contenir au maximum 320 caractères"),
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

// Configuring the form validation with vee-validate
const { handleSubmit } = useForm({ validationSchema: schema });
const { value: username, errorMessage: usernameError } = useField("username");
const { value: email, errorMessage: emailError } = useField("email");
const { value: password, errorMessage: passwordError } = useField("password");
const { value: confirmPassword, errorMessage: confirmPasswordError } =
  useField("confirmPassword");

/**
 * @description Handles the form submission.
 * Calls the register method from the authStore.
 * Redirects the user to the login page after 5 seconds.
 * Displays the error message from the server if available.
 * Displays the success message from the server if available.
 * @param {object} values - The form values.
 */
const onSubmit = handleSubmit(async (values) => {
  try {
    const response = await authStore.register({
      username: values.username,
      email: values.email,
      password: values.password,
    });
    if (response) {
      serverSuccesMessage.value = response;
    }
    isSubmitted.value = true;
    redirectToHome();
  } catch (error) {
    serverErrorMessage.value =
      (error as any)?.response?.data?.message || "Erreur lors de l'inscription";
  }
});
</script>

<style lang="scss" scoped>
.register-section {
  width: 100vw;

  /* Main bloc that contain form and illustration */
  #bloc {
    display: flex;
    justify-content: space-around;
    width: 75%;
    margin: 20px auto 0px auto;
    @include media-max(991.98px) {
      flex-direction: column-reverse;
      align-items: center;
      width: 100%;
      margin: 30px 0px 0px 0px;
      margin-top: 20px;
    }

    .illustration-container {
      img {
        max-width: 600px;
        @include media-max(991.98px) {
          max-width: 200px;
          margin: 0;
          @include media-max(611.98px) {
            max-width: 100px;
            margin: 0;
          }
        }
      }
    }

    /* Register form container */
    #form-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 50%;
      margin-top: 50px;
      @include media-max(991.98px) {
        margin-top: 0px;
        @include media-max(611.98px) {
          width: 100%;
        }
      }
      h1 {
        margin-bottom: 50px;
        span {
          display: inline-block;
        }
        @include media-max(991.98px) {
          margin-top: 0px;
        }
      }
    }
  }

  /* Success message __________*/
  #if-success {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 50px;
    font-size: 1.4em;
    text-align: center;
    @include media-max(611.98px) {
      margin-top: 50px;
      font-size: 1em;
    }
    span {
      color: var(--blue);
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

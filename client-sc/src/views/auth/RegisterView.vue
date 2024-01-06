<template>
  <section class="register-section">
    <!-- Main bloc that contain form and illustration -->
    <div class="bloc-register">
      <!-- Form container -->
      <div v-if="!isSubmitted" class="register-form-container">
        <h1 class="title">Formulaire d'<span>Inscription</span></h1>

        <!-- Regiser Form -->
        <form @submit="onSubmit" class="custom-form">
          <!-- Username field ----------->
          <div class="form-field">
            <label for="username">Nom d'utilisateur:</label>
            <Field
              id="username"
              name="username"
              v-model="username"
              type="text"
              placeholder="Entrez votre nom d'utilisateur"
              aria-label="Nom d'utilisateur"
            />
            <ErrorMessage name="username" class="error-feedback" />
          </div>

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

          <!-- Password field -->
          <div class="form-field">
            <label for="password">Mot de passe:</label>
            <Field
              id="password"
              name="password"
              v-model="password"
              type="password"
              placeholder="Entrez votre mot de passe"
              aria-label="Mot de passe"
            />
            <ErrorMessage name="password" class="error-feedback" />
          </div>

          <!-- Confirm password field -->
          <div class="form-field">
            <label for="confirm-password">Confirmez votre mot de passe:</label>
            <Field
              id="confirm-password"
              name="confirm-password"
              v-model="confirmPassword"
              type="password"
              placeholder="Confirmez votre mot de passe"
              aria-label="Confirmez votre mot de passe"
            />
            <ErrorMessage name="confirmPassword" class="error-feedback" />
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
    <div
      v-show="isSubmitted && serverSuccesMessage"
      class="if-register-success"
    >
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
import { useForm, useField, Field, ErrorMessage } from "vee-validate";
import { useAuthStore } from "@/stores/authStore";
import { useRedirectionTimer } from "@/helpers/redirectionHelper";
import type { IlottieOptions } from "@/types/lottieOptions";
import LottieLoader from "@/assets/lotties/loader.json";

const authStore = useAuthStore();

// lottie options
const lottieOptions = ref<IlottieOptions>({
  animationData: LottieLoader,
  loop: true,
  autoplay: true,
});

const serverErrorMessage = ref<string>("");
const serverSuccesMessage = ref<string>("");
const isSubmitted = ref<boolean>(false);

// settings for the redirection timer after the user is registered
const { time: timeToHome, startRedirectionTimer: redirectToHome } =
  useRedirectionTimer("/", 5);

// Validation schema with Yup and vee-validate
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

const { handleSubmit } = useForm({ validationSchema: schema });
const { value: username } = useField<string>("username");
const { value: email } = useField<string>("email");
const { value: password } = useField<string>("password");
const { value: confirmPassword } = useField<string>("confirmPassword");

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

  .bloc-register {
    display: flex;
    justify-content: space-around;
    width: 75%;
    margin: 20px auto 0px auto;

    .illustration-container {
      img {
        max-width: 600px;
      }
    }

    .register-form-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 50%;
      margin-top: 50px;

      h1 {
        margin-bottom: 50px;
        span {
          display: inline-block;
        }
      }
    }
  }

  .if-success {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 50px;
    font-size: 1.4em;
    text-align: center;

    span {
      color: var(--blue);
    }
    .lottie {
      width: 300px;
      margin: auto;
    }
  }

  @include media-max(991.98px) {
    .bloc-register {
      flex-direction: column-reverse;
      align-items: center;
      width: 100%;
      margin: 30px 0px 0px 0px;
      margin-top: 20px;

      .illustration-container img {
        max-width: 200px;
        margin: 0;
      }

      .register-form-container {
        margin-top: 0px;

        h1 {
          margin-top: 0px;
        }
      }
    }

    @include media-max(611.98px) {
      .illustration-container img {
        max-width: 100px;
        margin: 0;
      }

      .register-form-container {
        width: 100%;
      }

      .if-success {
        margin-top: 50px;
        font-size: 1em;

        .lottie {
          width: 200px;
        }
      }
    }
  }
}
</style>

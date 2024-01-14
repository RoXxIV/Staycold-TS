<template>
  <section class="register-section">
    <!-- Main bloc that contain form and illustration -->
    <div class="bloc-register" v-if="!isSubmitted">
      <!-- Form container -->
      <div class="register-form-container">
        <h1 class="title">Formulaire d'<span>Inscription</span></h1>

        <!-- Regiser Form -->
        <form @submit="onSubmit" class="custom-form">
          <!-- Username field ----------->
          <CustomTextInput
            fieldId="username"
            fieldName="username"
            placeholder="Entrez votre nom d'utilisateur"
            v-model="username"
            type="text"
          >
            <template v-slot:label
              ><label for="username">Nom d'utilisateur:</label></template
            >
          </CustomTextInput>

          <!-- Email field -->
          <CustomTextInput
            fieldId="email"
            fieldName="email"
            placeholder="Entrez votre email"
            v-model="email"
            type="email"
          >
            <template v-slot:label><label for="email">Email:</label></template>
          </CustomTextInput>

          <!-- Password field -->
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

          <!-- Confirm password field -->
          <CustomTextInput
            fieldId="confirm-password"
            fieldName="confirmPassword"
            placeholder="Confirmez votre mot de passe"
            v-model="confirmPassword"
            type="password"
          >
            <template v-slot:label
              ><label for="confirm-password"
                >Confirmez votre mot de passe:</label
              ></template
            >
          </CustomTextInput>

          <!-- Server error message -->
          <span class="error-feedback">{{ serverErrorMessage }}</span>

          <!-- Submit -->
          <div class="submit">
            <button
              type="submit"
              aria-label="Envoyer le formulaire d'inscription"
            >
              Inscription
            </button>
          </div>
        </form>

        <!-- Redirection link -->
        <div class="redirection-link">
          <router-link to="/login">Déjà inscrit ?</router-link>
        </div>
      </div>
      <!-- Illustration -->
      <div class="illustration-container">
        <img
          id="mountainAnimation"
          src="@/assets/images/inscription.svg"
          alt="Illustration d'une montagne sur fond bleu avec des nuages en arriere plan"
        />
      </div>
    </div>
    <!-- Success message -->

    <div v-if="isSubmitted && serverMessage" class="if-register-success">
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
import { gsap } from "gsap";
import { useAuthStore } from "@/stores/authStore";
import ServerResponses from "../../components/reusable/ServerResponses.vue";
import CustomTextInput from "@/components/forms/CustomTextInput.vue";

const authStore = useAuthStore();
const serverErrorMessage = ref<string>("");
const isSubmitted = ref<boolean>(false);
const serverMessage = ref<string>("");
const redirectionPath = ref<string>("");

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
 * Handles the form submission.
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
      serverMessage.value = response;
      redirectionPath.value = "/login";
    }
    isSubmitted.value = true;
  } catch (error) {
    serverErrorMessage.value =
      (error as any)?.response?.data?.message || "Erreur lors de l'inscription";
  }
});

// Animations
onMounted(() => {
  gsap
    .timeline({ defaults: { duration: 0.1, ease: "linear" } })
    .to("#mountainAnimation", { scaleX: 1.25, scaleY: 0.75 })
    .to("#mountainAnimation", { scaleX: 0.75, scaleY: 1.25 })
    .to("#mountainAnimation", { scaleX: 1.15, scaleY: 0.85 })
    .to("#mountainAnimation", { scaleX: 0.95, scaleY: 1.05 })
    .to("#mountainAnimation", { scaleX: 1.05, scaleY: 0.95 })
    .to("#mountainAnimation", { scaleX: 1, scaleY: 1 });
});
</script>

<style lang="scss" scoped>
/* Register section */
.register-section {
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

    /* Register form container */
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

  /* media queries for register-section */
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
    }
  }
}
</style>

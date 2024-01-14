<template>
  <section class="login-section">
    <!-- Illustration -->
    <div class="illustration-container">
      <img
        src="@/assets/images/login-illustration.png"
        alt="Personnage en méditation"
      />
    </div>

    <!-- Form container -->
    <div class="login-form-container">
      <h1 class="title-block">Formulaire de <span>Connexion</span></h1>

      <!-- Login Form -->
      <form @submit="onSubmit" class="custom-form">
        <!-- Username field -->
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

        <!-- Server error message -->
        <span class="error-feedback">{{ serverErrorMessage }}</span>

        <!-- Submit ----------->
        <div class="submit">
          <button type="submit" aria-label="Se connecter">Connexion</button>
        </div>
      </form>

      <div class="redirection-link">
        <!-- forgot password link -->
        <p>
          <router-link to="/reset-password">Mot de passe oublié ?</router-link>
        </p>
        <!-- Register link -->
        <p>
          <router-link to="/register">Pas encore inscrit ?</router-link>
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, type Ref } from "vue";
import { useForm, useField } from "vee-validate";
import * as yup from "yup";
import { useRouter, RouterLink } from "vue-router";
import { useAuthStore } from "@/stores/authStore";
import CustomTextInput from "@/components/forms/CustomTextInput.vue";

const router = useRouter();
const authStore = useAuthStore();
const serverErrorMessage: Ref<string> = ref("");

// Validation schema with Yup and vee-validate
const schema = yup.object({
  username: yup.string().required("Nom d'utilisateur requis"),
  password: yup.string().required("Mot de passe requis"),
});
const { handleSubmit } = useForm({ validationSchema: schema });
const { value: username } = useField<string>("username");
const { value: password } = useField<string>("password");

/**
 * Handles the form submission.
 * call the login function from the authStore.
 * It validates the form and then attempts to log in the user using the authStore.
 * If the login is successful, the user is redirected to the home page.
 * If the login fails, the error message from the server is displayed.
 * @param {Object} values - The form values.
 */
const onSubmit = handleSubmit(async (values) => {
  try {
    await authStore.login({
      username: values.username,
      password: values.password,
    });
    router.push("/");
  } catch (error) {
    serverErrorMessage.value =
      (error as any)?.response?.data?.message || "Erreur lors de la connexion";
  }
});
</script>

<style lang="scss" scoped>
/* Login page */
.login-section {
  display: flex;
  justify-content: space-around;
  position: relative;
  margin-top: 100px;
  margin-bottom: 50px;

  .illustration-container {
    img {
      margin-top: 50px;
      animation: float 6s ease-in-out infinite;
      @keyframes float {
        0% {
          transform: translatey(0px);
        }
        50% {
          transform: translatey(-20px);
        }
        100% {
          transform: translatey(0px);
        }
      }
    }
  }

  .login-form-container {
    h1 {
      margin-bottom: 50px;
      text-align: center;
    }
  }

  /* media queries for login-section */
  @include media-max(991.98px) {
    flex-direction: column;
    align-items: center;
    margin-top: 50px;

    .illustration-container {
      img {
        max-width: 200px;
        margin: 0;
        text-align: center;
      }
    }

    @include media-max(611.98px) {
      .illustration-container {
        img {
          max-width: 100px;
          margin: 0;
        }
      }

      .login-form-container {
        h1 {
          margin-top: 0;
        }
      }
    }
  }
}
</style>

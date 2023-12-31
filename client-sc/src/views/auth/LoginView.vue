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
    <div id="form-container">
      <h1>Formulaire de <span class="title-span">Connexion</span></h1>

      <!-- Login Form -->
      <form @submit="onSubmit" class="custom-form">
        <!-- Username field -->
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

        <!-- Server error message -->
        <span class="error-feedback">{{ serverErrorMessage }}</span>

        <!-- Submit ----------->
        <div class="submit">
          <button type="submit">Connexion</button>
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
import { useRouter, RouterLink } from "vue-router";
import { useAuthStore } from "@/stores/authStore";
import type { IAuthStore } from "@/types/authStore";
import { useForm, useField } from "vee-validate";
import * as yup from "yup";

const router = useRouter();
const authStore = useAuthStore() as unknown as IAuthStore;
const serverErrorMessage: Ref<string> = ref("");

// Validation schema with Yup
const schema = yup.object({
  username: yup.string().required("Nom d'utilisateur requis"),
  password: yup.string().required("Mot de passe requis"),
});

// Configuring the form validation with vee-validate
const { handleSubmit } = useForm({ validationSchema: schema });
const { value: username, errorMessage: usernameError } =
  useField<string>("username");
const { value: password, errorMessage: passwordError } =
  useField<string>("password");

/**
 * @description Handles the form submission.
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
.login-section {
  display: flex;
  justify-content: space-around;
  position: relative;
  width: 80vw;
  margin: auto;
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

  #form-container {
    h1 {
      margin-bottom: 50px;
      text-align: center;
      font-size: 2em;
    }
  }

  @include media-max(991.98px) {
    flex-direction: column;
    align-items: center;
    width: 100vw;
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

      #form-container {
        h1 {
          margin-top: 0;
        }
      }
    }
  }
}
</style>

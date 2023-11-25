<template>
  <section>
    <!-- Illustration meditation ----------->
    <div>
      <img
        id="illustration-meditation"
        src="@/assets/images/login-illustration.png"
        alt="Illustration d'un personnage qui medite en lévitation"
      />
    </div>

    <!-- Form container ----------->
    <div id="container-form">
      <h1>Formulaire de <span>Connexion</span></h1>
      <!-- Form ----------->
      <form @submit="onSubmit">
        <!-- Username ----------->
        <div>
          <label for="username">Nom d'utilisateur:</label>
          <input
            id="username"
            v-model="username"
            type="text"
            placeholder="Entrez votre nom d'utilisateur"
          />
          <span class="error-feedback">{{ usernameError }}</span>
        </div>

        <!-- Password ----------->
        <div>
          <label for="password">Mot de passe:</label>
          <input
            id="password"
            v-model="password"
            type="password"
            placeholder="Entrez votre mot de passe"
          />
          <span class="error-feedback">{{ passwordError }}</span>
        </div>
        <span class="error-feedback">{{ serverErrorMessage }}</span>
        <!-- Submit ----------->
        <div id="login-form-submit">
          <button type="submit">Connexion</button>
        </div>
      </form>

      <div id="form-links">
        <!-- forgot password link ----------->
        <p>
          <router-link to="/">Mot de passe oublié ?</router-link>
        </p>
        <!-- Register link ----------->
        <p>
          <router-link to="/register">Pas encore inscrit ?</router-link>
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "@/stores/authStore";
import { useForm, useField } from "vee-validate";
import * as yup from "yup";
import { RouterLink } from "vue-router";
import { useRouter } from "vue-router";

// use the router to redirect the user after login
const router = useRouter();

// use the authStore for login and logout
const authStore = useAuthStore();

const serverErrorMessage = ref("");

/**
 * Define the schema for the login form using Yup.
 * It includes validations for username and password fields.
 */
const schema = yup.object({
  username: yup.string().required("Nom d'utilisateur requis"),
  password: yup.string().required("Mot de passe requis"),
});

/**
 * useForm hook from Vee-Validate to handle form submission and validation.
 */
const { handleSubmit } = useForm({
  validationSchema: schema,
});

/**
 * useField hook to manage the state and validation of individual form fields.
 */
const { value: username, errorMessage: usernameError } = useField("username");
const { value: password, errorMessage: passwordError } = useField("password");

/**
 * Handles the form submission.
 * It validates the form and then attempts to log in the user using the authStore.
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
    // display the error message from the server if available
    if ((error as any).response && (error as any).response.data) {
      serverErrorMessage.value = (error as any).response.data.message;
      console.log(serverErrorMessage);
    } else {
      console.error(error);
    }
  }
});
</script>

<style lang="scss" scoped>
section {
  display: flex;
  justify-content: space-around;
  position: relative;
  width: 80vw;
  margin: auto;
  margin-top: 100px;
  margin-bottom: 50px;
  /* Illustration __________*/
  #illustration-meditation {
    margin-top: 50px;
    animation: float 6s ease-in-out infinite;
    /* Illustration Animation__________*/
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
    /* Illustration Media Queries__________*/
    /* Tablet __________*/
    @include media-max(991.98px) {
      max-width: 200px;
      margin: 0;
      /* Smartphone __________*/
      @include media-max(611.98px) {
        max-width: 100px;
        margin: 0;
      }
    }
  }
  /* Form container __________*/
  #container-form {
    h1 {
      margin-bottom: 50px;
      text-align: center;
      font-size: 2em;
      span {
        color: var(--blue);
        display: block;
        font-family: var(--oswald);
      }
      /* Smartphone __________*/
      @include media-max(611.98px) {
        margin-top: 0;
      }
    }
    /* Form __________*/
    form {
      label {
        display: block;
        margin-top: 10px;
        font-size: 1.2em;
      }
      input {
        margin: 35px 0px 15px 20px;
        width: 280px;
        border: none;
        border-bottom: 1px solid var(--color-dark-border);
        background: transparent;
        color: var(--color-text);
        transition: border-color 0.3s;
        &:focus {
          outline: none;
          border-bottom: 1px solid var(--blue);
        }
        /* Smartphone __________*/
        @include media-max(611.98px) {
          margin: 20px 0px;
        }
      }
      /* Error feedback __________*/
      .error-feedback {
        display: block;
        color: var(--red);
        margin-top: 10px;
        text-align: left;
      }
      #login-form-submit {
        margin-top: 15px;
        text-align: center;
      }
      /* media queries form __________*/
      @include media-max(611.98px) {
        text-align: center;
      }
    }
    /* Links - forgot password link - register __________*/
    #form-links {
      margin-top: 30px;
      color: var(--blue);
      text-decoration: underline;
      text-align: center;
      transition: color 0.3s;
      p:hover {
        color: #176cf5;
      }
    }
  }
  /* media queries section __________*/
  /* Tablet __________*/
  @include media-max(991.98px) {
    flex-direction: column;
    align-items: center;
    width: 100vw;
    margin-top: 50px;
  }
}
</style>

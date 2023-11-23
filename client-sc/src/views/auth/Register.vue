<template>
  <section>
    <div id="bloc">
      <!-- Form container ----------->
      <div v-if="!isSubmitted" id="container-form">
        <h1>Formulaire d'<span>Inscription</span></h1>
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

          <!-- Email ----------->
          <div>
            <label for="email">Email:</label>
            <input
              id="email"
              v-model="email"
              type="email"
              placeholder="Entrez votre email"
            />
            <span class="error-feedback">{{ emailError }}</span>
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

          <!-- Confirm password ----------->
          <div>
            <label for="confirm-password">Confirmez votre mot de passe:</label>
            <input
              id="confirm-password"
              v-model="confirmPassword"
              type="password"
              placeholder="Confirmez votre mot de passe"
            />
            <span class="error-feedback">{{ confirmPasswordError }}</span>
          </div>
          <span class="error-feedback">{{ serverErrorMessage }}</span>
          <!-- Submit ----------->
          <div id="register-form-submit">
            <button type="submit">Inscription</button>
          </div>
        </form>
      </div>
      <div v-if="!isSubmitted">
        <img
          id="illustration"
          class="rubberBand"
          src="@/assets/images/inscription.svg"
          alt="Illustration d'une montagne sur fond bleu avec des nuages en arriere plan"
        />
      </div>
    </div>
    <div v-if="isSubmitted && serverSuccesMessage">
      <span>{{ serverSuccesMessage }}</span>
      <p>Redirection dans {{ time }}</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/stores/authStore";
import * as yup from "yup";
import { useForm, useField } from "vee-validate";
import router from "@/router";
import { ref } from "vue";

// use the authStore for the register form
const authStore = useAuthStore();

const serverErrorMessage = ref("");
const serverSuccesMessage = ref("");
const isSubmitted = ref(false);
const time = ref(5);
let redirectionTimerId: number | NodeJS.Timeout | undefined = undefined;

/**
 * Define the Register form schema using Yup.
 * It includes validations for username, email,
 * password and password confirmation fields.
 */
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
  // register the user using the authStore
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
    redirect();
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

/**
 * @description - This function is called when the user is successfully registered.
 * Redirect the user to the login page after 5 seconds.
 * @param {number} time - The time in seconds.
 * @returns {number} - The timer id.
 */

const redirect = () => {
  redirectionTimerId = setInterval(() => {
    time.value--;
    if (time.value === 0) {
      clearInterval(redirectionTimerId);
      router.push("/");
    }
  }, 1000);
};

// Stop the timer when the component is unmounted
const onBeforeUnmount = () => {
  if (redirectionTimerId) clearInterval(redirectionTimerId);
};
</script>

<style lang="scss" scoped>
section {
  position: relative;
  width: 100vw;
  /* bloc __________*/
  #bloc {
    display: flex;
    justify-content: space-around;
    width: 75%;
    margin: 50px auto 0px auto;
    /* illustration __________*/
    #illustration {
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
    /* container form __________*/
    #container-form {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 50%;
      margin-top: 50px;
      h1 {
        margin-bottom: 50px;
        span {
          display: inline-block;
          color: var(--blue);
          font-family: var(--oswald);
        }
        @include media-max(991.98px) {
          margin-top: 0px;
        }
      }
      /* register form __________*/
      form {
        label {
          display: block;
          font-size: 1.2em;
        }
        input {
          width: 280px;
          margin: 10px 0px 35px 30px;
          border: none;
          border-bottom: 2px solid var(--color-dark-border);
          background: transparent;
          color: var(--color-text);
          transition: border-color 0.3s;
          &:focus {
            outline: none;
            border-color: var(--blue);
          }
          @include media-max(611.98px) {
            margin: 20px 0;
          }
        }
        /* register form submit __________*/
        #register-form-submit {
          margin-top: 15px;
          text-align: center;
        }
        .error-feedback {
          display: block;
          color: var(--red);
          margin-bottom: 10px;
          text-align: left;
        }
      }
      /* Responsive form __________*/
      @include media-max(991.98px) {
        margin-top: 0px;
      }
    }
    /* register bloc __________*/
    @include media-max(991.98px) {
      flex-direction: column-reverse;
      align-items: center;
      width: 100%;
      margin: 30px 0px 0px 0px;
      margin-top: 20px;
    }
  }
}
</style>

<template>
  <section>
    <div v-if="!successful">
      <h1>Réinitialisation du <span class="title-span">mot de passe</span></h1>
      <form @submit="onSubmit" class="custom-form">
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
          <label for="confirmPassword">Confirmez votre mot de passe:</label>
          <input
            id="confirmPassword"
            v-model="confirmPassword"
            type="password"
            placeholder="Confirmez votre mot de passe"
          />
          <span class="error-feedback">{{ confirmPasswordError }}</span>
        </div>
        <!-- Submit ----------->
        <div class="submit">
          <button type="submit">Envoyer</button>
        </div>
      </form>
      <!-- Error message ----------->
      <div v-if="errorMessage && !successful" id="error">
        {{ errorMessage }}
      </div>
    </div>

    <div v-else id="succed">
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
import { ref, onMounted } from "vue";
import * as yup from "yup";
import { useForm, useField } from "vee-validate";
import { useRoute } from "vue-router";
import router from "@/router";
import AuthService from "@/services/auth-service";
import { useRedirectionTimer } from "@/helpers/redirectionHelper";
import lottieLoader from "@/assets/lotties/loader.json";

const route = useRoute();

// lottie options
const loaderOptions = ref({
  animationData: lottieLoader,
  loop: true,
  autoplay: true,
});

const successful = ref(false);
const errorMessage = ref("");
const succesMessage = ref("");
const confirmationCode = ref("");

// settings for the redirection timer
const { time: timeToLogin, startRedirectionTimer: redirectToLogin } =
  useRedirectionTimer("/login", 5);

// Validation schema with Yup
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

// Configuring the form validation with vee-validate
const { handleSubmit } = useForm({ validationSchema: schema });
const { value: password, errorMessage: passwordError } = useField("password");
const { value: confirmPassword, errorMessage: confirmPasswordError } =
  useField("confirmPassword");

/**
 * @description - Submit the form and send the new password to the server.
 * If the password is valid and the confirmation code is valid, redirect to the login page.
 * Else display an error message.
 * @param {Event} event
 * @returns {Promise<void>}
 * @throws {Error} - If the confirmation code is not valid.
 * @throws {Error} - If the password is not valid.
 */
const onSubmit = handleSubmit(async () => {
  console.log("Form submitted");
  try {
    const response = await AuthService.resetPassword(
      password.value as string,
      confirmationCode.value as string
    );
    console.log(response);

    if (response.status === 200) {
      succesMessage.value = response.data.message;
      successful.value = true;
      redirectToLogin();
    }
  } catch (error) {
    if ((error as any).response) {
      errorMessage.value = (error as any).response.data.message;
    } else {
      errorMessage.value = (error as any).message;
    }
  }
});

/**
 * @description - This function is called when the component is mounted.
 * it checks if the confirmation code is present in the url and call the sendConfirmationCode function.
 * If the confirmation code is not present, redirect the user to the not found page.
 * @param {string} confirmationCode - The confirmation code.
 * @returns {void} - Nothing.
 */
onMounted(() => {
  confirmationCode.value = route.params.confirmationCode.toString();
  console.log(confirmationCode.value);
  if (!confirmationCode) {
    // router.push("/not-found");
  }
});
</script>

<style lang="scss" scoped>
section {
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
    /* Form __________*/
    form {
      margin: auto;
    }
    #error {
      margin-top: 50px;
      text-align: center;
      color: var(--red);
    }
  }
  #succed {
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
      width: 200px;
      height: 200px;
      margin: auto;
    }
  }
}
</style>

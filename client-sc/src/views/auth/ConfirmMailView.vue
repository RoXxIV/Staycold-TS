<template>
  <section class="confirm-email-section">
    <div>
      <!-- Email comfirmed -->
      <!-- display a success message and a redirection link to the login page -->
      <div v-if="isConfirmed">
        <h2><span>❄</span> {{ confirmationMessage }} <span>❄</span></h2>
        <p>Redirection dans {{ timeToLogin }}</p>
        <!-- Lottie -->
        <vue3-lottie
          :options="loaderOptions"
          class="lottie"
          :animationData="loaderOptions.animationData"
        ></vue3-lottie>

        <!-- Redirection link -->
        <router-link to="/login" tag="a"><p>Se connecter</p></router-link>
      </div>

      <!-- Email not confirmed -->
      <!-- display an error message and a redirection link to the home page -->
      <div v-else class="userNotConfirmed">
        <span>{{ serverErrorMessage }}</span>
        <p>Redirection dans {{ timeToHome }}</p>
        <!-- Lottie -->
        <vue3-lottie
          :options="somethingWentWrongOptions"
          class="lottie"
          :animationData="somethingWentWrongOptions.animationData"
        ></vue3-lottie>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, type Ref } from "vue";
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import router from "@/router";
import AuthService from "@/services/auth-service";
import { useRedirectionTimer } from "@/helpers/redirectionHelper";
import type { IlottieOptions } from "@/types/lottieOptions";
import lottieLoader from "@/assets/lotties/loader.json";
import LottiesomethingWentWrong from "@/assets/lotties/something-went-wrong.json";

// lottie options
const loaderOptions = ref<IlottieOptions>({
  animationData: lottieLoader,
  loop: true,
  autoplay: true,
});
const somethingWentWrongOptions = ref<IlottieOptions>({
  animationData: LottiesomethingWentWrong,
  loop: true,
  autoplay: true,
});

const route = useRoute();
const isConfirmed = ref<boolean>(false);
const confirmationMessage = ref<string>("");
const serverErrorMessage = ref<string>("");
const confirmationCode = ref<string>("");

// settings for the redirection timer after the user is confirmed or not
const { time: timeToLogin, startRedirectionTimer: redirectToLogin } =
  useRedirectionTimer("/login", 5);
const { time: timeToHome, startRedirectionTimer: redirectToHome } =
  useRedirectionTimer("/", 5);

/**
 * @description - This function is called when the component is mounted.
 * it checks if the confirmation code is present in the url and call the sendConfirmationCode function.
 * If the confirmation code is not present, redirect the user to the not found page.
 * @param {string} confirmationCode - The confirmation code.
 * @returns {void} - Nothing.
 */
onMounted(() => {
  const confirmationCode = route.params.confirmationCode;
  if (confirmationCode) {
    sendConfirmationCode(confirmationCode.toString());
  } else {
    router.push("/not-found");
  }
});

/**
 * @description - It send the confirmation code to the server to activate the user account.
 * If the confirmation code is not valid, display an error message.
 * And redirect the user to the home page after 5 seconds.
 * If the confirmation code is valid, display a success message.
 * And redirect the user to the login page after 5 seconds.
 * @param {string} confirmationCode - The confirmation code.
 * @throws {Error} - If the confirmation code is not valid.
 */
const sendConfirmationCode = async (confirmationCode: string) => {
  try {
    const response = await AuthService.confirmUser(confirmationCode);
    if (response.status === 200) {
      confirmationMessage.value = response.data.message;
      isConfirmed.value = true;
      redirectToLogin();
    }
  } catch (error) {
    serverErrorMessage.value =
      (error as any)?.response?.data?.message || "Erreur lors de l'inscription";
    isConfirmed.value = false;
    redirectToHome();
  }
};
</script>

<style lang="scss" scoped>
.confirm-email-section {
  margin-top: 50px;
  text-align: center;

  & div:first-child {
    margin: auto;
    padding: 50px 100px;

    span {
      color: var(--blue);
    }

    .lottie {
      width: 300px;
      margin: auto;
    }

    p {
      text-decoration: underline;
    }

    .userNotConfirmed {
      span {
        color: var(--red);
        font-size: 1.2em;
      }
      p {
        color: (--color-text);
      }
    }
  }

  @include media-max(611.98px) {
    & div:first-child {
      padding: 0;

      .lottie {
        width: 200px;
      }
    }
  }
}
</style>

<template>
  <section class="confirm-email-section">
    <div>
      <!-- Email comfirmed -->
      <!-- display a success message and a redirection link to the login page -->
      <div v-if="isConfirmed">
        <ServerResponses
          :serverMessage="serverMessage"
          :timeBeforeRedirection="3"
          :redirectTo="redirectionPathToLogin"
        />

        <!-- Redirection link -->
        <router-link to="/login" tag="a"><p>Se connecter</p></router-link>
      </div>

      <!-- Email not confirmed -->
      <!-- display an error message and a redirection link to the home page -->
      <div v-else class="userNotConfirmed">
        <ServerResponses
          :serverMessage="serverMessage"
          :timeBeforeRedirection="5"
          :redirectTo="redirectionPathToHome"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import router from "@/router";
import AuthService from "@/services/auth-service";
import ServerResponses from "@/components/reusable/ServerResponses.vue";

const route = useRoute();
const isConfirmed = ref<boolean>(false);
const confirmationCode = ref<string>("");
const redirectionPathToLogin = ref<string>("/login");
const redirectionPathToHome = ref<string>("/");
const serverMessage = ref<string>("");

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
      serverMessage.value = response.data.message;
      isConfirmed.value = true;
    }
  } catch (error) {
    serverMessage.value =
      (error as any)?.response?.data?.message || "Erreur lors de l'inscription";
    isConfirmed.value = false;
  }
};
</script>

<style lang="scss" scoped>
.confirm-email-section {
  margin-top: 50px;
  text-align: center;
}
</style>

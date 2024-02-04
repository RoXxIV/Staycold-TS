<template>
  <section class="contact-section">
    <h1 class="title"><span>CONTACTEZ</span>-MOI</h1>

    <!-- Social networks -->
    <ul class="social-networks">
      <li>
        <a
          href="https://www.linkedin.com/in/evan-hermier-799b48121/"
          target="_blank"
          rel="noopener noreferrer"
          ><img
            src="@/assets/images/reseaux/linkedin.png"
            alt="logo linkedin"
          />
          Linkedin</a
        >
      </li>
      <li>
        <a
          href="https://github.com/RoXxIV"
          target="_blank"
          rel="noopener noreferrer"
          ><img src="@/assets/images/reseaux/github.png" alt="logo github" />
          Github</a
        >
      </li>
    </ul>

    <!-- Contact Form -->
    <div class="contact-form-bloc">
      <form @submit="onSubmit" v-if="!submited">
        <!-- Email field -->
        <CustomTextInput
          fieldId="email"
          fieldName="email"
          placeholder="Entrez votre email"
          v-model="email"
          type="email"
          ><template v-slot:label
            ><label for="email"
              ><font-awesome-icon
                class="font-awesome-icon"
                :icon="['fa', 'at']"
                aria-hidden="true"
              />Email:</label
            ></template
          >
        </CustomTextInput>

        <!-- Subject field -->
        <CustomSelectInput
          class="form-field"
          field-id="subject"
          field-name="subject"
          v-model="subject"
          :options="subjects"
        >
          <template v-slot:label
            ><label for="subject"
              ><font-awesome-icon
                class="font-awesome-icon"
                :icon="['fa', 'hand-point-right']"
                aria-hidden="true"
              />Sujet:</label
            ></template
          >
        </CustomSelectInput>

        <!-- commentary -->
        <CustomTextArea
          class="form-field custom-textarea"
          field-id="commentary"
          field-name="commentary"
          v-model="commentary"
          placeholder="Votre message ici"
        >
          <template v-slot:label
            ><label for="commentary"
              ><font-awesome-icon
                class="font-awesome-icon"
                :icon="['fa', 'pencil-alt']"
                aria-hidden="true"
              />Votre Message:</label
            ></template
          >
        </CustomTextArea>

        <!----- Submit ----->
        <div class="contact-form-submit">
          <button class="btn-blue" aria-label="Soumettre le formulaire">
            Envoyer
          </button>
        </div>
      </form>

      <!-- if succed -->
      <div v-if="serverMessage && submited" class="contact-form-submited">
        <ServerResponses
          :serverMessage="serverMessage"
          :timeBeforeRedirection="5"
          :redirectTo="redirectionPath"
        />
      </div>
    </div>
    <BackLink
      path="/"
      ariaLabel="Retour à la page d'accueil"
      content="Retour à l'accueil"
    />
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useTitle } from "@vueuse/core";
import * as yup from "yup";
import { useForm, useField } from "vee-validate";
import ContactService from "@/services/contact-service";
import ServerResponses from "@/components/Common/ServerResponses.vue";
import CustomTextInput from "@/components/FormInputs/CustomTextInput.vue";
import CustomSelectInput from "@/components/FormInputs/CustomSelectInput.vue";
import CustomTextArea from "@/components/FormInputs/CustomTextArea.vue";
import BackLink from "@/components/Common/BackLink.vue";

// Page title
const title = useTitle("StayCold - Contactez-moi");

const submited = ref<boolean>(false);
const serverMessage = ref<string>("");
const redirectionPath = ref<string>("/");

// selects options
const subjects = [
  "Une idée d'amelioration du site",
  "Signaler un bug",
  "On bosse ensemble ?",
  "Autre",
];

// Validation schema with Yup
const schema = yup.object({
  email: yup
    .string()
    .required("L'email est requis")
    .email("L'email doit être valide")
    .max(320, "L'email doit contenir au maximum 320 caractères"),
  subject: yup.string().nullable().required("Sujet requis!"),
  commentary: yup
    .string()
    .required("Un message est requis")
    .max(500, "Votre message ne doit pas dépasser 500 caractères"),
});

// Configuring the form validation with vee-validate
const { handleSubmit } = useForm({ validationSchema: schema });
const { value: email } = useField<string>("email");
const { value: subject } = useField<string>("subject");
const { value: commentary } = useField<string>("commentary");

/**
 * Send the contact form to the server
 * if the response is 200, the user is redirected to the home page
 * else an error message is displayed
 * @param: values: {email: string, subject: string, commentary: string}
 */
const onSubmit = handleSubmit(async (values) => {
  try {
    const response = await ContactService.sendContactMail({
      email: values.email,
      subject: values.subject,
      commentary: values.commentary,
    });
    if (response.status === 200) {
      serverMessage.value = response.data.message;
      submited.value = true;
    }
  } catch (error) {
    submited.value = true;
    serverMessage.value =
      (error as any)?.response?.data?.message || "Une erreur est survenue";
    console.log(error);
  }
});
</script>

<style lang="scss" scoped>
/* Contact form */
.contact-section {
  h1 {
    text-align: center;
    margin: 50px auto;
  }
  /* Social networks */
  .social-networks {
    display: flex;
    justify-content: center;
    align-items: center;

    li a {
      display: flex;
      align-items: center;
      margin: auto 30px;

      img {
        margin-right: 10px;
      }
    }
  }

  .contact-form-bloc {
    display: flex;
    justify-content: center;
    width: 700px;
    margin: 30px auto;
    padding: 50px 0px 50px 0px;
    border: 1px solid var(--primary-border);
    border-radius: 0.75rem;
    -webkit-box-shadow: 0 30px 33px -60px #000000;
    box-shadow: 0 30px 33px -60px #000000;

    /* Form */
    form {
      label {
        display: block;
        .font-awesome-icon {
          margin-right: 10px;
        }
      }
      .contact-form-submit {
        margin-top: 30px;
        text-align: right;

        @include media-max(611.98px) {
          text-align: center;
        }
      }
    }

    /* media queries for the contact-form-bloc */
    @include media-max(991.98px) {
      width: 80%;

      @include media-max(611.98px) {
        width: 100%;
        border: none;
      }
    }
  }
  /* media queries for the contact-section */
  @include media-max(991.98px) {
    width: 100%;
  }
}
</style>

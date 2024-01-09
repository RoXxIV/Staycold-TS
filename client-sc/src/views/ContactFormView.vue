<template>
  <section class="contact-section">
    <h1><span>CONTACTEZ</span>-MOI</h1>

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
        <div class="contact-form-field">
          <label for="email"
            ><font-awesome-icon
              class="font-awesome-icon"
              :icon="['fa', 'at']"
            />Email:</label
          >
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

        <!-- Subject field -->
        <div class="contact-form-field">
          <label for="subject"
            ><font-awesome-icon
              class="font-awesome-icon"
              :icon="['fa', 'hand-point-right']"
            />Sujet:</label
          >
          <Field as="select" name="subject" id="subject" v-model="subject">
            <option value="" disabled selected>Choisir une option</option>
            <option v-for="option in subjects" :key="option" :value="option">
              {{ option }}
            </option>
          </Field>
          <ErrorMessage name="subject" class="error-feedback" />
        </div>

        <!-- commentary -->
        <div class="contact-form-field">
          <label for="commentary"
            ><font-awesome-icon
              class="font-awesome-icon"
              :icon="['fa', 'pencil-alt']"
            />Votre Message:</label
          >
          <Field
            as="textarea"
            id="commentary"
            name="commentary"
            v-model="commentary"
            type="email"
            placeholder="Votre message ici"
          />
          <ErrorMessage name="commentary" class="error-feedback" />
        </div>
        <!----- Submit ----->
        <div class="contact-form-submit">
          <button class="btn-blue">Envoyer</button>
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
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import * as yup from "yup";
import { useForm, useField, Field, ErrorMessage } from "vee-validate";
import ContactService from "@/services/contact-service";
import ServerResponses from "@/components/reusable/ServerResponses.vue";

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
    .max(500, "Le message ne doit pas dépasser 500 caractères"),
});

// Configuring the form validation with vee-validate
const { handleSubmit } = useForm({ validationSchema: schema });
const { value: email } = useField<string>("email");
const { value: subject } = useField<string>("subject");
const { value: commentary } = useField<string>("commentary");

/**
 * @description: Send the contact form to the server
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
.contact-section {
  h1 {
    text-align: center;
    margin: 50px auto;
    span {
      color: var(--blue);
      font-family: var(--oswald);
    }
  }
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
    padding: 50px 30px 50px 30px;
    border: 2px solid var(--secondary-border);
    border-radius: 0.75rem;
    -webkit-box-shadow: 0 30px 33px -60px #000000;
    box-shadow: 0 30px 33px -60px #000000;

    form {
      label {
        display: block;
        margin-top: 10px;
        font-size: 1.3em;
        .font-awesome-icon {
          margin-right: 10px;
        }
      }
      input {
        margin: 20px 0px 10px 20px;
        border: none;
        border-bottom: 1px solid var(--primary-border);
        background: transparent;
        color: var(--color-text);
        width: 100%;
        transition: border-color 0.3s;
        &:focus {
          border-color: var(--blue);
        }
      }

      select {
        width: 100%;
        margin: 20px 0px 10px 20px;
        padding-bottom: 10px;
        border: none;
        border-bottom: 1px solid var(--primary-border);
        background: var(--primary-background);
        color: var(--color-text);
        font-size: 16px;
        transition: border-color 0.3s;
      }

      textarea {
        width: 100%;
        height: 150px;
        max-height: 300px;
        resize: vertical;
        margin: 20px 0px 10px 20px;
        border: 1px solid var(--primary-border);
        background: var(--primary-background);
        color: var(--color-text);
        transition: border-color 0.3s;
        &:focus {
          border-color: var(--blue);
        }
      }

      .contact-form-submit {
        margin-top: 15px;
        text-align: right;
      }
    }
  }

  @include media-max(991.98px) {
    width: 100%;

    .contact-form-bloc {
      width: 80%;
    }

    @include media-max(611.98px) {
      .contact-form-bloc {
        text-align: center;

        form {
          label {
            text-align: left;
          }
          input,
          select,
          textarea {
            margin: 10px auto;
          }
        }
      }
    }
  }
}
</style>

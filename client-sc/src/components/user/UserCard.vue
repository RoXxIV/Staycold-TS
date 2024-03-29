<template>
  <section class="section-user-profile">
    <div class="user-bloc">
      <div class="profile-picture"></div>
      <ul class="user-link">
        <li><RouterLink to="/">Retour à l'accueil</RouterLink></li>
        <li><RouterLink to="/breath">Réspiration guidée</RouterLink></li>
      </ul>
      <h1 class="pseudo">{{ username }}</h1>
      <p class="timestamp">inscrit depuis le {{ registrationDate }}</p>

      <ul class="statistics">
        <li>
          Baignade enregister: <span>{{ totalBaths }}</span>
        </li>
        <li>
          Temps totale passé dans l'eau:
          <span>{{ convertMinutesToHours(timeInWater) }}</span>
        </li>
        <li>
          Temperature de l'eau la plus froide:
          <span>{{ displayLowestTemperature }}&#8451;</span>
        </li>
      </ul>

      <button>
        <RouterLink to="add-bath">Ajouter une baignade</RouterLink>
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { defineProps, type PropType, computed } from "vue";

const props = defineProps({
  registrationDate: String,
  timeInWater: Number,
  totalBaths: Number,
  lowestTemperature: {
    type: Number as PropType<Number | null>,
    default: null,
  },
  username: String,
});

const displayLowestTemperature = computed(() => {
  return props.lowestTemperature === null
    ? "N/A"
    : props.lowestTemperature.toString();
});

/**
 * convert minutes to hours and minutes
 * @param minutes
 */
function convertMinutesToHours(minutes: number | undefined): string {
  if (typeof minutes !== "number") {
    return "n/a";
  }
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours}h${remainingMinutes}`;
}
</script>

<style lang="scss" scoped>
.section-user-profile {
  display: flex;
  justify-content: center;
  margin: 150px auto 50px auto;
  //height: 100vh;
  width: 60%;

  .user-bloc {
    background-color: var(--secondary-background);
    position: relative;
    width: 100%;
    padding: 10px 100px 50px 100px;
    border: 1px solid var(--primary-border);
    border-radius: 10px;

    .profile-picture {
      position: absolute;
      top: -100px;
      left: calc(50% - 100px);
      height: 200px;
      width: 200px;
      border-radius: 50%;
      background-image: url("../../assets/images/hero-shark.png");
      background-size: 160%;
      background-position-y: 10%;
      background-position-x: 50%;
      border: 2px solid var(--primary-border);

      @include media-max(991.98px) {
        display: none;
      }
    }

    .user-link {
      display: flex;
      justify-content: space-between;
      align-items: center;

      li {
        font-size: 1.1em;
        text-decoration: underline;
        text-underline-offset: 8px;
        text-decoration-color: var(--blue);
        text-decoration-thickness: 1.5px;
        transition: all 0.3s ease-in-out;

        &:hover {
          color: var(--blue);
          text-decoration-color: var(--white);
        }
      }

      @include media-max(991.98px) {
        flex-direction: column;

        li {
          margin-bottom: 20px;
          text-underline-offset: 3px;
        }
      }
    }

    h1 {
      margin-top: 100px;
      margin-bottom: 0;
      text-align: center;
      font-size: 2em;

      @include media-max(991.98px) {
        margin-top: 30px;
        padding-bottom: 10px;
      }
    }
    .timestamp {
      text-align: center;
      font-size: 1.1em;
    }

    .statistics {
      margin-top: 50px;
      margin-bottom: 50px;
      text-align: center;
      li {
        margin-bottom: 10px;
        font-size: 1.2em;

        span {
          font-weight: bold;
          color: var(--blue);
        }
      }
    }
    button {
      display: block;
      margin: auto;
    }

    @include media-max(991.98px) {
      border: none;
    }
  }
  /* Section Responsive __________*/
  @include media-max(1450px) {
    width: 90%;

    @include media-max(991.98px) {
      width: 90%;
      margin-top: 10px;
      margin-bottom: 10px;
      border: none;
    }
  }
  @include media-max(611.98px) {
    min-height: 70vh;
    width: 90%;
  }
}
</style>

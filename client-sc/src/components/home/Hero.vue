<template>
  <section class="hero-section">
    <div class="hero-intro">
      <h2>
        <span>Staycold</span> c’est qui ?<br />
        c’est quoi ?
      </h2>

      <p>
        <strong>Staycold</strong>, votre guide pour explorer les bienfaits de
        l'immersion en eaux froides et découvrir comment cette expérience unique
        peut améliorer votre bien-être.
      </p>

      <router-link :to="loggedIn ? '/add-bath' : '/register'">
        <button>
          {{ loggedIn ? "Ajouter une baignade" : "Commencez votre aventure" }}
        </button>
      </router-link>
    </div>

    <div class="hero-img">
      <img
        src="@/assets/images/hero-shark.png"
        alt="Une illustration de requin souriant, debout et saluant sur fond bleu."
        id="sharkAnimation"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useAuthStore } from "@/stores/authStore";
import { gsap } from "gsap";

// use the authStore to get the loggedIn status
const authStore = useAuthStore();
const loggedIn = computed(() => authStore.status.loggedIn);

onMounted(() => {
  // animate the shark image
  gsap
    .timeline({ defaults: { duration: 1, ease: "ease-out" } })
    .fromTo(
      "#sharkAnimation",
      { xPercent: 100, skewX: -30, opacity: 0 },
      { xPercent: 0, skewX: 20, opacity: 1, duration: 0.6 }
    )
    .to("#sharkAnimation", { skewX: -5, duration: 0.2 })
    .to("#sharkAnimation", { skewX: 0, duration: 0.2 });
});
</script>

<style scoped lang="scss">
/* Hero section */
.hero-section {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 50px auto;

  .hero-intro {
    width: 50%;

    h2 {
      font-size: 2.3em;
      font-weight: 700;
      line-height: 1.5;
      span {
        color: var(--blue);
      }
    }

    p {
      font-size: 1.2em;
    }
  }

  .hero-img {
    width: 50%;
    text-align: center;

    img {
      max-width: 250px;
      margin: auto;
    }
  }

  /* media queries */
  @include media-max(991.98px) {
    padding: 10px;
    .hero-intro {
      h2 {
        font-size: 1.8em;
      }
      p {
        font-size: 1em;
        word-wrap: break-word;
        width: 90%;
      }
    }
    @include media-max(667.98px) {
      flex-direction: column-reverse;

      .hero-intro {
        width: 100%;
      }
      .hero-img img {
        max-width: 150px;
      }
    }
  }
}
</style>

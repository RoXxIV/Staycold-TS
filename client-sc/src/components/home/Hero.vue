<template>
  <section class="hero-section">
    <div id="hero-intro">
      <h2>
        <span>Staycold</span> c’est qui ?<br />
        c’est quoi ?
      </h2>

      <p>
        <strong>Staycold</strong>, votre guide pour explorer les bienfaits de
        l'immersion en eaux froides et découvrir comment cette expérience unique
        peut améliorer votre bien-être.
      </p>

      <button>Commencez votre aventure</button>
    </div>

    <div id="hero-img">
      <img
        src="@/assets/images/hero-shark.png"
        alt="illustration d'un requin"
        class="lightSpeedIn"
      />
    </div>
  </section>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.hero-section {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 80%;
  margin: 50px auto;
  @include media-max(667.98px) {
    flex-direction: column-reverse;
  }

  #hero-intro {
    width: 50%;
    @include media-max(667.98px) {
      width: 100%;
    }
    h2 {
      font-size: 2.3em;
      font-weight: 700;
      line-height: 1.5;
      @include media-max(991.98px) {
        font-size: 1.8em;
      }

      span {
        color: var(--blue);
      }
    }

    p {
      font-size: 1.2em;
      @include media-max(991.98px) {
        font-size: 1em;
      }
    }
  }

  #hero-img {
    width: 50%;
    text-align: center;

    img {
      max-width: 250px;
      margin: auto;
      @include media-max(667.98px) {
        max-width: 150px;
      }
    }
  }
}
</style>

<template>
  <section class="advices-section">
    <h2 class="title">Quelques <span>conseils</span> pour bien débuter</h2>
    <ul>
      <li>
        <h3>Parlez en d'abord à votre médecin</h3>
        <p>
          L'immersion en eau froide affecte la pression artérielle, le rythme
          cardiaque et la circulation du sang, assurez-vous donc de ne pas avoir
          de problèmes cardiaques ou tout autre contre indication.
        </p>
      </li>
      <li>
        <h3>Ne vous baignez pas seul</h3>
        <p>
          Étant donné que votre raisonnement et vos émotions peuvent être
          affectés par des températures d'eaux dangereusement froides,
          assurez-vous que quelqu'un est à portée de main pour surveiller votre
          état, surtout en eau libre.
        </p>
      </li>
      <li class="warm-up-advice">
        <div>
          <h3>Réchauffez-vous immédiatement lorsque vous sortez de l'eau</h3>
          <p>
            La température de votre corps peut continuer à baisser même après
            que vous soyez sorti de l'eau, ce qui augmente le risque
            d'hypothermie.
            <br />
            Habillez-vous en couches chaudes et sèches, en commençant par le
            haut du corps.<br />
            Mettre un bonnet, même dans l’eau limite la perte de chaleur
            corporelle.
            <br />
            Trouvez un endroit chaud pour vous asseoir ou, si vous vous en
            sentez capable, promenez-vous pour augmenter votre température
            corporelle.
            <br />
            Pendant ou après la baignade, le contrôle de la
            <router-link to="/breath"
              ><span class="breath-link">respiration</span></router-link
            >
            est un element clé pour ne pas subir le froid
          </p>
        </div>

        <vue3-lottie
          :options="lottieFireOptions"
          class="lottie lottie-fire"
          :animationData="lottieFireOptions.animationData"
        ></vue3-lottie>
      </li>
      <li class="eat-something-advice">
        <div>
          <h3>Mangez un morceau</h3>
          <p>
            Buvez un thé chaud ou mangez quelque chose de sucré, car le sucre
            augmente votre température corporelle.
          </p>
        </div>
        <vue3-lottie
          :options="lottieSharkEatingOptions"
          class="lottie lottie-coffee"
          :animationData="lottieSharkEatingOptions.animationData"
        ></vue3-lottie>
      </li>
      <li>
        <h3>Faites des immersions brèves</h3>
        <p>
          Pour bénéficier des bienfaits de l'immersion en eau froide, quelques
          minutes peuvent suffire.<br />
          Bien que vous puissiez augmenter progressivement votre tolérance au
          froid, il n'y a aucune raison thérapeutique de rester dans l'eau
          froide plus longtemps que quelques minutes.
        </p>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import { useLottieOptions } from "@/composables/useLottieOptions";
import sharkEatingLottie from "@/assets/lotties/shark-eating.json";
import fireLottie from "@/assets/lotties/fire.json";

const lottieSharkEatingOptions = useLottieOptions(sharkEatingLottie);
const lottieFireOptions = useLottieOptions(fireLottie);
</script>

<style lang="scss" scoped>
.advices-section {
  margin-top: 100px;
  h2 {
    text-align: center;
    margin-bottom: 50px;
  }
  /* Advices */
  ul {
    width: 75%;
    margin: 0 auto;

    li {
      font-size: 1.2em;
      h3 {
        color: var(--blue);
        font-size: 1.3em;
      }
      p {
        margin-bottom: 20px;
        line-height: 1.5em;
      }
      &.warm-up-advice {
        display: flex;
        align-items: center;
        .lottie-fire {
          max-width: 250px;
        }

        @include media-max(991.98px) {
          flex-direction: column;
          .lottie-fire {
            max-width: 250px;
          }
        }

        .breath-link {
          color: var(--blue);
          font-weight: 700;
          text-decoration: underline;
        }
      }
      &.eat-something-advice {
        display: flex;
        flex-direction: row-reverse;
        justify-content: space-around;
        align-items: center;
        .lottie-coffee {
          max-width: 150px;
          margin-right: 50px;
        }
        @include media-max(991.98px) {
          flex-direction: column;
          .lottie-coffee {
            width: 150px;
            margin: auto;
          }
        }
      }
    }

    /* Advices Media Queries __________*/
    @include media-max(991.98px) {
      width: 100%;
      text-align: center;
    }
  }
}
</style>

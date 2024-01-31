<template>
  <section class="section-breathing">
    <!--Header-section-->
    <div class="breathing-header">
      <h1 class="title">Respiration <span>guidée</span></h1>
      <p>Répétez ce cycle 30 à 40 fois</p>
    </div>
    <!--Container-->
    <div class="container" id="container">
      <div class="circle"></div>
      <p>{{ text }}</p>
      <div :class="isActivated ? 'pointer-container' : ''">
        <span :class="isActivated ? 'pointer' : ''"></span>
      </div>
      <div class="gradient-circle"></div>
    </div>
    <!--Launcher-->
    <div class="breathing-launcher">
      <button @click="startAndStop()" class="btn-blue">
        {{ isActivated ? "Arreter" : "Commencer" }}
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";

const text = ref<string>("");
const totalTime = ref<number>(12000);
const breatheTime = ref<number>(6000);
const holdTime = ref<number>(0);
const container = ref<HTMLElement | null>(null);
const isActivated = ref<boolean>(false);
let breathId: number | NodeJS.Timeout;
let animationId: number | NodeJS.Timeout;

const breathAnimation = () => {
  if (container.value) {
    // Assurez-vous que container.value n'est pas null
    text.value = "Inspirez";
    container.value.className = "container grow";
    animationId = setTimeout(() => {
      setTimeout(() => {
        if (container.value) {
          // Vérifiez à nouveau pour éviter des erreurs
          text.value = "Expire";
          container.value.className = "container shrink";
        }
      }, holdTime.value);
    }, breatheTime.value);
  }
};

const startAndStop = () => {
  isActivated.value = !isActivated.value;
  if (isActivated.value && container.value) {
    // Assurez-vous que container.value n'est pas null avant de commencer
    breathAnimation();
    breathId = setInterval(breathAnimation, totalTime.value);
  } else {
    clearInterval(breathId);
    clearInterval(animationId);
    if (container.value) {
      // Vérifiez avant d'accéder à container.value
      container.value.className = "container";
    }
    text.value = "";
  }
};

onMounted(() => {
  container.value = document.getElementById("container");
});

onBeforeUnmount(() => {
  if (breathId) clearInterval(breathId);
  if (animationId) clearInterval(animationId);
});
</script>

<style lang="scss" scoped>
/* section __________*/
.section-breathing {
  display: flex;
  flex-direction: column;
  min-height: 75vh;
  padding: 30px 0px;

  .breathing-header {
    h1 {
      text-align: center;
    }
    p {
      text-align: center;
    }
  }

  /* container __________*/
  .container {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: auto;
    height: 300px;
    width: 300px;
    position: relative;
    transform: scale(1);
    .circle {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      border-radius: 50%;
      background-image: url(../assets/images/camp.png);
      background-size: cover;
      background-repeat: no-repeat;
      z-index: -1;
    }
    p {
      color: white;
    }
    .gradient-circle {
      position: absolute;
      top: -10px;
      left: -10px;
      height: 320px;
      width: 320px;
      border-radius: 50%;
      background: conic-gradient(
        #3b82f6 0%,
        #307cf6 50%,
        #2b5eb1 50%,
        #122749 100%
      );
      z-index: -2;
    }
  }
  .breathing-launcher {
    text-align: center;
  }
  /* Section Responsive __________*/
  @include media-max(611.98px) {
    min-height: 70vh;
    width: 100%;
  }
}
/* Pointer + animation __________*/
.pointer {
  display: block;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background-color: var(--dark-to-light);
}
.pointer-container {
  position: absolute;
  top: -40px;
  left: 140px;
  width: 20px;
  height: 190px;
  animation: rotate 12s linear forwards infinite;
  transform-origin: bottom center;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
/* Circle grow up __________*/
.container.grow {
  animation: grow 6s linear forwards;
}

@keyframes grow {
  from {
    transform: scale(1);
  }

  to {
    transform: scale(1.2);
  }
}
/* Circle shrink __________*/
.container.shrink {
  animation: shrink 6s linear forwards;
}

@keyframes shrink {
  from {
    transform: scale(1.2);
  }

  to {
    transform: scale(1);
  }
}
</style>

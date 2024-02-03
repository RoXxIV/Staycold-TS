<template>
  <!-- back button -->
  <div class="back-button">
    <!-- if link to previous page -->
    <p v-if="isBackAction" @click="goBack" :aria-label="ariaLabel">
      {{ content }}
    </p>
    <!-- if link to home page -->
    <router-link v-else :to="path" :aria-label="ariaLabel">
      {{ content }}
    </router-link>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
import { computed } from "vue";

const props = defineProps({
  path: {
    type: String,
    required: true,
  },
  ariaLabel: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

const router = useRouter();

// Set isBackAction to true if path is "back" and link to previous page
const isBackAction = computed(() => props.path === "back");

// Go back to previous page
function goBack() {
  router.go(-1);
}
</script>

<style lang="scss" scoped>
.back-button {
  text-align: center;
  margin-top: 25px;
  text-decoration: underline;
  font-size: 1.1em;
  cursor: pointer;
  a,
  p {
    display: inline-block;
    padding: 0.5em;
    position: relative;
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);

    &:before,
    &:after {
      position: absolute;
      content: "";
      border-bottom: 2px solid var(--blue);
      border-radius: 1em;
      bottom: 0.3em;
      transition: transform 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
    }

    &:after {
      width: 50%;
      left: 1em;
      transform: translateX(150%);
    }

    &:hover:after {
      transform: translateX(0);
    }
  }
}
</style>

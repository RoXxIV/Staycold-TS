<template>
  <div id="mobile-nav">
    <!-- Nav default ----------->
    <ul>
      <!-- Toggle theme ----------->
      <li
        @click="toggleThemeAndEmit"
        aria-label="Toggle themes"
        id="toggle-theme-mobile"
      >
        <span>{{ themeSwitchText }}</span>
      </li>
      <li @click="closeMenuAndEmit">
        <router-link to="/">Accueil</router-link>
      </li>
      <li @click="closeMenuAndEmit">
        <router-link to="/all-baths">Baignades</router-link>
      </li>
    </ul>
    <!-- Nav auth ----------->
    <ul>
      <li @click="closeMenuAndEmit">
        <router-link to="/login">Connexion</router-link>
      </li>
      <li @click="closeMenuAndEmit">
        <router-link to="/register">Inscription</router-link>
      </li>
    </ul>
    <!-- Nav user ----------->
    <!--Nav User <ul></ul>-->
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

// Define the emitted events for the component.
const emits = defineEmits(["closeMenu", "toggleTheme"]);

const theme = ref<string>("");

// Function to close the menu and emit the "closeMenu" event.
const closeMenuAndEmit = () => {
  emits("closeMenu");
};

// Function to toggle the theme and emit the "toggleTheme" event.
const toggleThemeAndEmit = () => {
  // update theme value
  theme.value = theme.value === "darkMode" ? "" : "darkMode";
  emits("toggleTheme");
};

// Computed property to determine the display of the theme switch icon.
const themeSwitchText = computed(() => {
  return theme.value === "darkMode" ? "Theme 🌞" : "Theme 🌚";
});
</script>

<style lang="scss" scoped>
#mobile-nav {
  position: absolute;
  width: 100%;
  font-size: 1.3em;
  z-index: 1;
  ul {
    margin: 0;
    li {
      padding: 15px 0px 15px 15px;
      background: var(--nav-mobile-background);
      border-bottom: 1px solid var(--color-dark-border);
      cursor: pointer;
    }
  }
}
</style>

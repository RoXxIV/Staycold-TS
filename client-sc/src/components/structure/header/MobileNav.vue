<template>
  <div id="mobile-nav">
    <!-- Nav default ----------->
    <ul>
      <li @click="closeMenu">
        <router-link to="/">Accueil</router-link>
      </li>
      <li @click="closeMenu">
        <router-link to="/all-baths">Baignades</router-link>
      </li>
    </ul>
    <!-- Nav auth ----------->
    <ul>
      <li @click="closeMenu">
        <router-link to="/login">Connexion</router-link>
      </li>
      <li @click="closeMenu">
        <router-link to="/register">Inscription</router-link>
      </li>
    </ul>
    <!-- Nav user ----------->
    <!--Nav User <ul></ul>-->
  </div>
</template>
<script setup lang="ts">
import { defineEmits } from "vue";

// Define the emitted events for the component.
const emits = defineEmits(["closeMenu"]);

const closeMenu = () => {
  // Emits the "closeMenu" event to notify external components.
  emits("closeMenu");
};
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
    }
  }
}
</style>

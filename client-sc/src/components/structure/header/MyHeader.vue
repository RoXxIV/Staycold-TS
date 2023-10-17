<template>
  <div>
    <header>
      <!-- Logo ----------->
      <router-link to="/" id="logo">
        <svg
          width="57px"
          height="57px"
          viewBox="0 0 236 235"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M70.4446 121.967C77.6796 114.732 89.4606 108.044 97.8026 106.436C105.21 105.009 111.063 105.243 119.047 107.285C128.101 109.6 133.214 112.109 145.803 120.413C162.24 131.256 175.612 139.08 183.592 142.523C191.032 145.733 191.743 145.846 203.803 145.745C214.154 145.659 217.731 145.203 224.611 143.095L232.918 140.549L232.232 143.7C229.466 156.391 221.434 173.97 212.837 186.146C189.85 218.705 148.171 237.741 107.464 234.273C97.6046 233.433 82.1566 230.115 78.1856 227.986C76.0726 226.852 76.0736 226.839 79.5666 218.518C82.6626 211.141 83.3076 210.256 85.1836 210.806C96.4006 214.092 103.903 215.498 112.803 215.984C138.775 217.4 164.967 207.911 184.331 190.068C190.714 184.187 201.765 171.012 201.793 169.251C201.799 168.921 197.641 168.374 192.553 168.034C167.617 166.37 149.466 157.127 135.006 138.728C124.233 125.023 115.31 120.339 100.018 120.365C89.8786 120.382 81.5136 122.15 71.5936 126.371C67.6956 128.03 64.3396 129.22 64.1356 129.017C63.9326 128.813 66.7716 125.641 70.4446 121.967Z"
            class="first-path"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M107.803 0.420592C72.7546 3.43159 39.3016 22.9086 20.3266 51.3496C-11.3224 98.7896 -5.54338 160.104 34.3856 200.516C41.2766 207.49 58.3796 220.35 60.7636 220.35C61.2196 220.35 63.1656 216.421 65.0866 211.62L68.5806 202.889L62.5976 198.98C54.9456 193.98 45.7976 185.507 40.3946 178.414C34.1616 170.232 34.1366 170.453 41.0806 172.165C44.7666 173.073 51.9886 173.716 58.8026 173.743C72.1166 173.793 77.8606 172.153 88.3856 165.296C91.8536 163.036 96.8536 160.521 99.4966 159.706C110.775 156.229 125.157 161.921 138.298 175.062C141.358 178.122 144.097 180.389 144.386 180.1C145.23 179.256 140.277 167.899 136.963 163.083C132.687 156.868 127.456 152.554 119.85 148.971C113.812 146.126 112.487 145.889 102.803 145.918C95.1456 145.941 88.6476 146.727 78.8026 148.818C67.7926 151.158 62.7026 151.702 51.2076 151.768L37.1136 151.85L30.2486 148.35C21.0726 143.672 20.4946 141.908 20.4086 118.35C20.3396 99.3876 20.9826 95.6316 26.9476 80.1406C32.6786 65.2576 46.5856 47.6286 60.3026 37.8576C99.3266 10.0586 153.151 14.4706 186.917 48.2356C202.769 64.0886 212.005 83.3746 215.184 107.262L216.303 115.675L225.303 119.427C230.253 121.491 234.684 122.815 235.15 122.368C236.516 121.058 234.031 98.5046 231.361 87.9786C228.602 77.1046 222.302 63.0626 215.381 52.3636C209.347 43.0376 194.565 27.8176 185.359 21.4526C162.286 5.50259 134.947 -1.91141 107.803 0.420592Z"
            class="second-path"
          />
          <ellipse cx="153" cy="92.5" rx="18" ry="17.5" />
        </svg>
        <span>StayCold</span>
      </router-link>
      <!-- Nav default ----------->
      <nav>
        <ul id="default-nav">
          <li><router-link to="/">Accueil </router-link></li>
          <li><router-link to="/all-baths">Baignades</router-link></li>
          <!-- Nav user ----------->
          <!-- profile if User <li></li> -->
        </ul>
        <!-- Nav auth ----------->
        <ul id="auth-nav">
          <li>
            <router-link to="/login">Connexion</router-link>
          </li>
          <li>
            <router-link to="/register">Inscription</router-link>
          </li>
          <!-- Deconnexion if User <li></li> -->
        </ul>
      </nav>
      <!-- Toggle burger ----------->
      <div id="icon-burger">
        <IconBurger @click="toggleBurgerMenu" id="btn-burger" />
      </div>
    </header>
    <!-- Mobile menu ----------->
    <transition name="fade">
      <MobileNav v-if="toggleMobileMenu" @closeMenu="toggleBurgerMenu" />
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import IconBurger from "./IconBurger.vue";
import MobileNav from "./MobileNav.vue";

const toggleMobileMenu = ref(false);

/**
 * Toggles the burger menu and updates the mobile menu state.
 *
 */
const toggleBurgerMenu = () => {
  console.log("Toggle burger menu called"); // Debugging line
  const burger = document.getElementById("btn-burger");

  if (burger) {
    burger.classList.toggle("opened");
    burger.setAttribute(
      "aria-expanded",
      burger.classList.contains("opened").toString()
    );
  }

  toggleMobileMenu.value = !toggleMobileMenu.value;
};
</script>

<style lang="scss">
header {
  display: flex;
  align-items: center;
  position: relative;
  padding: 20px 50px 20px 20px;
  border-bottom: 1px solid var(--color-dark-border);
  font-family: var(--roboto);
  font-weight: bold;
  /* Tablet __________*/
  @include media-max(991.98px) {
    flex-direction: column;
    justify-content: center;
    text-align: center;
    /* Smartphone __________*/
    @include media-max(667.98px) {
      flex-direction: row;
      justify-content: space-between;
    }
  }
  /* Logo __________*/
  #logo {
    display: flex;
    align-items: center;
    margin-right: 100px;
    font-size: 1.5em;
    /* Tablet __________*/
    @include media-max(991.98px) {
      margin-right: 0;
    }
    svg {
      margin-right: 10px;
      .first-path,
      ellipse {
        fill: var(--blue);
      }
      .second-path {
        fill: var(--logo-svg-color);
      }
    }
  }
  /* Nav __________*/
  nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    /* Tablet __________*/
    @include media-max(991.98px) {
      justify-content: space-around;
      /* Smartphone __________*/
      @include media-max(667.98px) {
        display: none;
      }
    }
    /* Default nav__________*/
    #default-nav {
      display: flex;
      li {
        margin-right: 30px;
      }
      li:hover {
        color: var(--blue);
        transition: all 0.2s ease 0s;
      }
    }
    /* Auth __________*/
    #auth-nav {
      display: flex;
      li {
        margin: 0px 10px;
      }
    }
  }
  /* Burger __________*/
  #icon-burger {
    display: none;
    /* Smartphone __________*/
    @include media-max(667.98px) {
      display: block;
    }
  }
}
</style>

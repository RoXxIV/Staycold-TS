<template>
  <!-- Loading -->
  <div class="loading">
    <div class="skeleton" v-for="n in numberOfSkeletons" :key="n"></div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  numberOfSkeletons: {
    type: Number,
    required: true,
  },
});
</script>

<style lang="scss">
/* loading skeleton */
.loading {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-auto-rows: minmax(200px, auto);
  grid-gap: 1rem;
  margin-top: 20px;

  .skeleton {
    background: linear-gradient(
      90deg,
      var(--secondary-background) 25%,
      var(--skeleton-background) 50%,
      var(--secondary-background) 75%
    );
    background-size: 200% 100%;
    border-radius: 0.75rem;
    animation: loading-animation 1.5s infinite;
    @keyframes loading-animation {
      0% {
        background-position: 200% 0;
      }
      100% {
        background-position: -200% 0;
      }
    }
  }
}
</style>

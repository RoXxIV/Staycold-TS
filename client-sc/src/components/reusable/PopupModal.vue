<template>
  <transition name="fade">
    <div class="popup-modal" v-if="isdisplayed">
      <div class="window">
        <slot :close="handleClose"></slot>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
const props = defineProps({
  isdisplayed: Boolean,
});

const emit = defineEmits(["close"]);

const handleClose = () => {
  emit("close");
};
</script>

<style scoped lang="scss">
.popup-modal {
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0.5rem;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
  .window {
    max-width: 480px;
    margin-left: auto;
    margin-right: auto;
    padding: 2rem;
    background: var(--primary-background);
    border-radius: 5px;
    box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.2);
    color: var(--color-text);
  }
}
</style>

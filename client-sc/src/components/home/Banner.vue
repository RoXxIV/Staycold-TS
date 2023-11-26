<template>
  <h1>
    Boostez votre <span>{{ dynamicText }}</span>
    <span id="banner-cusor" :class="{ typing: typeStatus }">&nbsp;</span>
  </h1>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

// Initialize with an empty string
const dynamicText = ref<string>("");
let typeStatus = ref<boolean>(false);
const textArray = ref<string[]>([
  "système cardiovasculaire",
  "métabolisme",
  "humeur",
  "attention",
  "système immunitaire",
  "tolérance au froid",
]);
const typingSpeed = ref<number>(100);
const erasingSpeed = ref<number>(50);
const newTextDelay = ref<number>(1000);
const typeArrayIndex = ref<number>(0);
const charIndex = ref<number>(0);

/**
 * @description Function to type text
 * Check if there are characters left to type in the current text
 * If not currently typing, set typeStatus to true
 * Then append the next character to dynamicText
 * Move to the next character...
 * Schedule the next character typing with a delay
 * Text typing is complete, set typeStatus to false
 * Schedule the text erasing after a delay
 */
const typeText = () => {
  if (charIndex.value < textArray.value[typeArrayIndex.value].length) {
    if (!typeStatus.value) typeStatus.value = true;
    dynamicText.value += textArray.value[typeArrayIndex.value].charAt(
      charIndex.value
    );
    charIndex.value += 1;
    setTimeout(typeText, typingSpeed.value);
  } else {
    typeStatus.value = false;
    setTimeout(eraseText, newTextDelay.value);
  }
};

/**
 * @description Function to erase text
 * Check if there are characters left to erase
 * If not currently typing, set typeStatus to true
 * Remove the last character from dynamicText
 * Move to the previous character
 * Schedule the next character erasing with a delay
 * Text erasing is complete, set typeStatus to false
 * Move to the next text in the array, or loop back to the beginning
 * Schedule the text typing after a delay
 */
const eraseText = () => {
  if (charIndex.value > 0) {
    if (!typeStatus.value) typeStatus.value = true;
    dynamicText.value = textArray.value[typeArrayIndex.value].substring(
      0,
      charIndex.value - 1
    );
    charIndex.value -= 1;
    setTimeout(eraseText, erasingSpeed.value);
  } else {
    typeStatus.value = false;
    typeArrayIndex.value += 1;
    if (typeArrayIndex.value >= textArray.value.length)
      typeArrayIndex.value = 0;
    setTimeout(typeText, typingSpeed.value + 1000);
  }
};

// Start typing on component mount
onMounted(() => {
  setTimeout(typeText, newTextDelay.value + 200);
});
</script>

<style lang="scss" scoped>
h1 {
  font-size: 1.8em;
  color: var(--color-text);
  text-align: center;
  @include media-max(667.98px) {
    display: none;
  }

  span:first-child {
    color: var(--blue);
    font-family: var(--oswald);
  }

  #banner-cusor {
    display: inline-block;
    width: 3px;
    margin-left: 3px;
    background-color: var(--color-dark-border);
    animation: cursorBlink 1s infinite;
    &.typing {
      animation: none;
    }
  }

  @keyframes cursorBlink {
    49% {
      background-color: var(--color-dark-border);
    }
    50% {
      background-color: transparent;
    }
    100% {
      background-color: transparent;
    }
  }
}
</style>

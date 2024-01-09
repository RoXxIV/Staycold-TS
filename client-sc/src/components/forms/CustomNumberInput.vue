<template>
  <div>
    <slot name="label"></slot>
    <div class="custom-number-input">
      <!-- input number -->
      <Field
        :id="fieldId"
        class="number-input"
        :name="fieldName || ''"
        v-model="fieldValue"
        type="number"
        :min="min"
        :max="max"
        :placeholder="placeholder"
      />

      <!-- input range -->
      <input type="range" :min="min" :max="max" v-model="fieldValue" />
    </div>
    <div class="error-field">
      <ErrorMessage :name="fieldName || ''" class="error-feedback" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from "vue";
import { Field, ErrorMessage } from "vee-validate";

const props = defineProps({
  fieldId: String,
  fieldName: String,
  min: Number,
  max: Number,
  placeholder: String,
  value: {
    type: Number,
    default: null,
  },
});

const fieldValue = ref(props.value);

// Update field value when props.value changes
watch(
  () => props.value,
  (newValue) => {
    fieldValue.value = newValue;
  }
);
</script>
<style scoped lang="scss">
.custom-number-input {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: auto;
  text-align: center;

  .number-input {
    border: none;
    background: none;
    font-size: 1.3em;
    text-align: center;
    color: var(--color-text);
    font-family: var(--roboto);
    font-weight: bold;

    &:focus {
      outline: none;
    }
  }

  input[type="range"] {
    -webkit-appearance: none;
    appearance: none;
    background: transparent;
    cursor: pointer;

    &::-webkit-slider-runnable-track {
      height: 1px;
      border-radius: 8px;
      background: var(--primary-border);
    }
    &::-moz-range-track {
      height: 1px;
      border-radius: 8px;
      background: var(--primary-border);
    }

    &::-webkit-slider-thumb {
      height: 1.1rem;
      width: 1.1rem;
      margin-top: -7.5px;
      border: none;
      border-radius: 50%;
      background-color: var(--blue);
    }

    &::-moz-range-thumb {
      height: 1.1rem;
      width: 1.1rem;
      border: none;
      border-radius: 50%;
      background-color: var(--blue);
    }

    &:focus {
      outline: none;
    }

    &:focus::-webkit-slider-thumb {
      border: 1px solid var(--blue);
      outline: 1px solid var(--blue);
      outline-offset: 0.125rem;
    }

    &:focus::-moz-range-thumb {
      border: 1px solid var(--blue);
      outline: 1px solid var(--blue);
      outline-offset: 0.125rem;
    }
  }

  .number-input::-webkit-inner-spin-button,
  .number-input::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input[type="number"] {
    -moz-appearance: textfield;
    appearance: textfield;
  }
  input::placeholder {
    color: var(--color-text);
    opacity: 0.5;
    font-size: 1em;
  }

  @include media-max(611.98px) {
    width: 80%;
  }
}
</style>

<template>
  <div class="custom-select-input">
    <slot name="label"></slot>
    <Field
      as="select"
      :name="fieldName || ''"
      :id="fieldId"
      v-model="selectedValue"
    >
      <option value="" disabled selected>Choisir une option</option>
      <option v-for="option in options" :key="option" :value="option">
        {{ option }}
      </option>
    </Field>
    <div class="error-field">
      <ErrorMessage
        :name="fieldName || ''"
        class="error-feedback error-field"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from "vue";
import { Field, ErrorMessage } from "vee-validate";

const props = defineProps({
  fieldId: String,
  fieldName: String,
  options: Array as () => string[],
  value: {
    type: String,
    default: null,
  },
});

const selectedValue = ref(props.value);

// Update the selected value when the value prop changes
watch(
  () => props.value,
  (newValue) => {
    selectedValue.value = newValue;
  }
);
</script>
<style scoped lang="scss">
.custom-select-input {
  select {
    width: 100%;
    margin: auto;
    padding-bottom: 10px;
    border: none;
    border-bottom: 1px solid var(--primary-border);
    background: var(--primary-background);
    color: var(--color-text);
    font-size: 16px;
    transition: border-color 0.3s;
    &:focus {
      border-color: var(--blue);
    }
    @include media-max(611.98px) {
      display: flex;
      justify-content: center;
      width: 80%;
    }
  }
}
</style>

<template>
  <div>
    <slot name="label"></slot>
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
input[type="number"] {
  width: 280px;
  margin: 10px 0px 25px 30px;
  border: none;
  border-bottom: 1px solid var(--primary-border);
  background: transparent;
  color: var(--color-text);
  transition: border-color 0.3s;
  -moz-appearance: textfield;
  appearance: textfield;
  &:focus {
    outline: none;
    border-color: var(--blue);
  }
  @include media-max(611.98px) {
    margin: 20px 0;
  }
}
</style>

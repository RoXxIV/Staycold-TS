<template>
  <div>
    <slot name="label"></slot>

    <!-- input number -->
    <Field
      :id="fieldId"
      class="text-input"
      :name="fieldName || ''"
      v-model="fieldValue"
      :type="type"
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
  placeholder: String,
  type: String,
  value: {
    type: String,
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
input {
  width: 280px;
  margin: 10px 0px 25px 30px;
  border: none;
  border-bottom: 1px solid var(--primary-border);
  background: transparent;
  color: var(--color-text);
  transition: border-color 0.3s;
  &:focus {
    outline: none;
    border-color: var(--blue);
  }
  @include media-max(611.98px) {
    margin: 20px 0;
  }
}
</style>

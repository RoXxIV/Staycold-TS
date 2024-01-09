<template>
  <div class="custom-textarea">
    <slot name="label"></slot>
    <Field
      :id="fieldId"
      :name="fieldName || ''"
      v-model="fieldValue"
      as="textarea"
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
.custom-textarea {
  textarea {
    width: 100%;
    display: block;
    height: 150px;
    max-height: 300px;
    resize: vertical;
    margin: auto;
    border: 1px solid var(--primary-border);
    background: var(--primary-background);
    color: var(--color-text);
    transition: border-color 0.3s;
    &:focus {
      border-color: var(--blue);
    }

    @include media-max(611.98px) {
      max-height: 200px;
    }
  }
}
</style>

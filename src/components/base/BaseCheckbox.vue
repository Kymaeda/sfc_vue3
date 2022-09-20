<template>
  <div class="flex items-center">
    <label>
      <input
        type="checkbox"
        class="flex-none h-4 w-4 text-indigo-600 border-gray-300 rounded mr-2"
        :checked="modelValue"
        @change="onChange"
      />
      <slot>default</slot>
    </label>
  </div>
</template>

<script setup>
// NOTE: might need to import if created project with vue-cli
//       with vite, you can skip import these methods
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
});

// assign props will lose reactivity
// const nonReactive = props.modelValue;
//
// `toRef` extract props property as reactive data(cf. https://v3.ja.vuejs.org/api/refs-api.html#toref)
// const nonReactive = toRef(props, "modelValue");

const emit = defineEmits(["update:modelValue"]);
const onChange = () => emit("update:modelValue", !props.modelValue);
</script>

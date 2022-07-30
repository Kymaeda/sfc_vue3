<template>
  <div class="flex items-center">
    <label>
      <input
        type="checkbox"
        class="h-4 w-4 text-indigo-600 border-gray-300 rounded mr-2"
        :checked="modelValue"
        @change="onChange"
      />
      <slot>default</slot>
    </label>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
    },
  },
  emits: ["update:modelValue"],
  methods: {
    onChange() {
      this.$emit("update:modelValue", !this.modelValue);
    },
  },
};
</script>

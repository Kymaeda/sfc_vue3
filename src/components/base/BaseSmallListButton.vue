<template>
  <button
    class="py-1 w-full text-left text-base md:text-xs text-gray-500"
    @click="$emit('click')"
  >
    <slot></slot>
  </button>
</template>

<script setup>
import { defineEmits } from "vue";

defineEmits(["click"]);
</script>

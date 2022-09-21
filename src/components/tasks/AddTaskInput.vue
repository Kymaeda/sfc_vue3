<template>
  <input
    type="text"
    ref="input"
    placeholder="enter task"
    @keyup.enter="add"
    v-model="task"
    class="block w-full rounded-md shadow0sm text-lg p-4"
  />
</template>

<script setup>
import { defineEmits, ref, onMounted } from "vue";

const emit = defineEmits(["added"]);
const task = ref("");
const add = () => {
  emit("added", task.value);
  task.value = "";
};
const input = ref(null);
onMounted(() => input.value.focus());
</script>

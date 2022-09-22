<template>
  <div
    class="bg-white shadow-sm rounded-md text-gray-700 flex flex-col"
    :class="{ 'opacity-25 line-through': task.done }"
  >
    <div class="p-4 border-b border-gray-100">{{ task.description }}</div>
    <div class="p-4 bg-white flex-grow">
      <BaseCheckbox
        @update:model-value="$emit('update:done', $event)"
        :model-value="done"
      >
        Done
      </BaseCheckbox>
      <BaseCheckbox
        @update:model-value="$emit('update:priority', $event)"
        :model-value="priority"
      >
        Priority
      </BaseCheckbox>
    </div>
    <TodoListItemMenu></TodoListItemMenu>
  </div>
</template>

<script setup>
import BaseCheckbox from "../base/BaseCheckbox.vue";
import TodoListItemMenu from "./TodoListItemMenu.vue";
import { provide, defineEmits, defineProps } from "vue";

const props = defineProps({
  task: { type: Object, required: true },
  done: Boolean,
  priority: Boolean,
  projectId: Number,
});
defineEmits(["update:done", "update:priority"]);
provide("task", props.task);
provide("projectId", props.projectId);
</script>

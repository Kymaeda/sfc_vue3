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

<script>
import BaseCheckbox from "../base/BaseCheckbox.vue";
import TodoListItemMenu from "./TodoListItemMenu.vue";
import { computed } from "vue";

export default {
  components: {
    BaseCheckbox,
    TodoListItemMenu,
  },
  props: {
    task: { type: Object, required: true },
    done: Boolean,
    priority: Boolean,
    projectId: Number,
  },
  // NOTE: define as method in order to handle reactive data
  provide() {
    return {
      // task: this.task,
      // projectId: this.projectId,
      task: computed(() => this.task),
      projectId: computed(() => this.projectId),
    };
  },
  emits: ["update:done", "update:priority"],
};
</script>

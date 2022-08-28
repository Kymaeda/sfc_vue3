<template>
  <div
    class="bg-white shadow-sm rounded-md text-gray-700"
    :class="{ 'opacity-25 line-through': task.done }"
  >
    {{ task.description }}
    <div class="p-4 bg-white">
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

export default {
  components: {
    BaseCheckbox,
    TodoListItemMenu,
  },
  props: {
    task: { type: Object, required: true },
    done: Boolean,
    priority: Boolean,
  },
  emits: ["update:done", "update:priority"],
};
</script>

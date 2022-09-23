<template>
  <div>
    <div class="uppercase text:lg md:text-xs text-gray-400 mb-2">
      Move where?
    </div>
    <div class="mb-2">
      <div v-for="project in projects" :key="project.id">
        <BaseSmallListButton @click="moveTask(project.id)"
          >→ {{ project.name }}</BaseSmallListButton
        >
      </div>
    </div>
    <div>
      <BaseTextButton @click="$emit('closed')" color="red">
        Cancel
      </BaseTextButton>
    </div>
  </div>
</template>

<script setup>
import BaseTextButton from "../base/BaseTextButton.vue";
import BaseSmallListButton from "../base/BaseSmallListButton.vue";
import { MOVE_TASK } from "./../../store/action-types";
import { useStore } from "vuex";
import { defineEmits, computed, inject } from "vue";

const store = useStore();

const task = inject("task");
const projectId = inject("projectId");
const emit = defineEmits(["closed"]);
const projects = computed(() => {
  return store.state.project.projects.filter(
    (project) => project.id !== projectId
  );
});

const moveTask = (toProjectId) => {
  store.dispatch(`project/${MOVE_TASK}`, {
    taskId: task.id,
    fromProjectId: projectId,
    toProjectId,
  });
  emit("close");
};
</script>

<template>
  <div class="flex flex-col md:flex-row">
    <div
      class="w-full md:w-1/3 xl:w-1/5 mr-4 px-0 md:px-4 mb-4 h-full text-lg md:text-sm"
    >
      <ProjectList :projects="projects" />
    </div>
    <div class="w-full md:w-2/3 xl:w-4/5">
      <div class="mb-4">
        <AddTaskInput @added="taskAdded"></AddTaskInput>
        <BaseCheckbox
          class="mb-4 p-4 text-gray-600 font-weight-100"
          v-model="onlyPending"
        >
          <b>only wip</b>
        </BaseCheckbox>
      </div>
      <div class="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <TodoListItem
          v-for="task in displayedTasks"
          :task="task"
          :key="task.id"
          :done="task.done"
          :priority="task.priority"
          :project-id="currentProjectId"
          @update:done="updateTask(task, { done: $event })"
          @update:priority="updateTask(task, { priority: $event })"
        ></TodoListItem>
      </div>
      <SummaryLine class="mt-8" />
    </div>
  </div>
</template>

<script setup>
import ProjectList from "./components/projects/ProjectList.vue";
import TodoListItem from "./components/tasks/TodoListItem.vue";
import AddTaskInput from "./components/tasks/AddTaskInput.vue";
import BaseCheckbox from "./components/base/BaseCheckbox.vue";
import SummaryLine from "./components/projects/ProjectSummaryLine.vue";
import {
  ADD_TASK,
  UPDATE_TASK,
  SET_ONLY_PENDING,
} from "./store/mutation-types";

import { useStore } from "vuex";
import { computed } from "vue";

const store = useStore();
const currentProjectId = computed(() => store.state.project.currentProjectId);
// NOTE: specify namespace if use
const projects = computed(() => store.getters[`project/projectsWithStats`]);
const tasks = computed(() => store.getters[`project/currentProjectTasks`]);

// NOTE: getter, setter どちらの機能も利用したいときは、get, set を持つオブジェクトを渡す必要がある
const onlyPending = computed({
  get: () => store.state.application.onlyPending,
  set: (newValue) => store.commit(`application/${SET_ONLY_PENDING}`, newValue),
});
const displayedTasks = computed(() =>
  [...tasks.value]
    .sort((a, b) => Number(b.priority) - Number(a.priority))
    .filter((task) => !onlyPending.value || !task.done)
);

const taskAdded = (description) =>
  store.commit(`project/${ADD_TASK}`, {
    projectId: currentProjectId.value,
    task: {
      id: tasks.value.length + 1,
      description,
      done: false,
      priority: false,
    },
  });

const updateTask = (task, changedAttr) =>
  store.commit(`project/${UPDATE_TASK}`, {
    projectId: currentProjectId.value,
    task: Object.assign(task, changedAttr),
  });
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

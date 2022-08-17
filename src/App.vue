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
          class="mb-4 p-4 text-gray-600 text-sm font-weight-100"
          v-model="onlyPending"
        >
          <b>only wip</b>
        </BaseCheckbox>
      </div>
      <div class="grid grid-cols-1 gap-4">
        <TodoListItem
          v-for="task in displayedTasks"
          :task="task"
          :key="task.id"
          :done="task.done"
          :priority="task.priority"
          @update:done="updateTask(task, { done: $event })"
          @update:priority="updateTask(task, { priority: $event })"
        ></TodoListItem>
        <SummaryLine class="mt-8" />
      </div>
    </div>
  </div>
</template>

<script>
import ProjectList from "./components/ProjectList.vue";
import TodoListItem from "./components/TodoListItem.vue";
import AddTaskInput from "./components/AddTaskInput.vue";
import BaseCheckbox from "./components/BaseCheckbox.vue";
import SummaryLine from "./components/SummaryLine.vue";
import {
  ADD_TASK,
  UPDATE_TASK,
  SET_ONLY_PENDING,
} from "./store/mutation-types";
import { mapState, mapGetters, mapMutations } from "vuex";

export default {
  name: "App",
  components: {
    TodoListItem,
    AddTaskInput,
    BaseCheckbox,
    SummaryLine,
    ProjectList,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState(["currentProjectId"]),
    ...mapGetters({
      projects: "projectsWithStats",
      tasks: "currentProjectTasks",
    }),
    displayedTasks() {
      return [...this.tasks]
        .sort((a, b) => Number(b.priority) - Number(a.priority))
        .filter((task) => !this.onlyPending || !task.done);
    },
    onlyPending: {
      get() {
        return this.$store.state.onlyPending;
      },
      set(newValue) {
        this[SET_ONLY_PENDING](newValue);
      },
    },
  },
  methods: {
    ...mapMutations([ADD_TASK, UPDATE_TASK, SET_ONLY_PENDING]),
    taskAdded(task) {
      this[ADD_TASK]({
        projectId: this.currentProjectId,
        task: {
          id: this.tasks.length + 1,
          description: task,
          done: false,
          priority: false,
        },
      });
    },
    updateTask(task, changedAttr) {
      this[UPDATE_TASK]({
        projectId: this.currentProjectId,
        task: Object.assign(task, changedAttr),
      });
    },
  },
};
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

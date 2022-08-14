<template>
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
</template>

<script>
import TodoListItem from "./components/TodoListItem.vue";
import AddTaskInput from "./components/AddTaskInput.vue";
import BaseCheckbox from "./components/BaseCheckbox.vue";
import SummaryLine from "./components/SummaryLine.vue";

export default {
  name: "App",
  components: {
    TodoListItem,
    AddTaskInput,
    BaseCheckbox,
    SummaryLine,
  },
  data() {
    return {};
  },
  computed: {
    tasks() {
      return this.$store.state.tasks;
    },
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
        this.$store.commit("updateOnlyPending", newValue);
      },
    },
  },
  methods: {
    taskAdded(task) {
      this.$store.commit("addTask", {
        id: this.tasks.length + 1,
        description: task,
        done: false,
        priority: false,
      });
    },
    updateTask(task, changedAttr) {
      console.log(changedAttr);
      this.$store.commit("updateTask", Object.assign(task, changedAttr));
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

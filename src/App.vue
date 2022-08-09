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
      v-model:done="task.done"
      v-model:priority="task.priority"
    ></TodoListItem>
  </div>
</template>

<script>
let nextTaskId = 0;
import TodoListItem from "./components/TodoListItem.vue";
import AddTaskInput from "./components/AddTaskInput.vue";
import BaseCheckbox from "./components/BaseCheckbox.vue";

export default {
  name: "App",
  components: {
    TodoListItem,
    AddTaskInput,
    BaseCheckbox,
  },
  data() {
    return {
      onlyPending: false,
    };
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
  },
  methods: {
    taskAdded(task) {
      this.tasks.push({
        id: nextTaskId++,
        description: task,
        done: false,
        priority: false,
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

<template>
  <div
    @click="updateCurrentProjectId(project.id)"
    :class="{ 'bg-gray-200': isActive }"
    class="rounded-md py-2 px-2 text-gray-500 font-semibold flex justify-between cursor-pointer"
  >
    <div>{{ project.id }}: {{ project.name }}</div>
    <div
      class="rounded-lg bg-gray-300 text-gray-800 px-2 font-normal w-8 text-center"
    >
      {{ project.nonDoneCount }}
    </div>
  </div>
</template>

<script>
import { SET_ACTIVE_PROJECT } from "../store/mutation-types";

export default {
  props: { project: Object },
  computed: {
    isActive() {
      return this.$store.state.currentProjectId === this.project.id;
    },
  },
  methods: {
    updateCurrentProjectId(projectId) {
      this.$store.commit(SET_ACTIVE_PROJECT, projectId);
    },
  },
};
</script>

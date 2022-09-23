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

<script setup>
import { SET_ACTIVE_PROJECT } from "../../store/mutation-types";
import { defineProps, computed } from "vue";
import { useStore } from "vuex";

const props = defineProps({ project: Object });
const store = useStore();

const currentProjectId = computed(() => store.state.project.currentProjectId);
const isActive = computed(() => currentProjectId.value == props.project.id);
const updateCurrentProjectId = (project_id) =>
  store.commit(`project/${SET_ACTIVE_PROJECT}`, project_id);
</script>

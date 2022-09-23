<template>
  <ProjectListItem
    v-for="project in projects"
    :project="project"
    :key="project.id"
  />
</template>

<script setup>
import ProjectListItem from "./ProjectListItem.vue";
import { defineProps } from "vue";

defineProps({ projects: Array });
</script>

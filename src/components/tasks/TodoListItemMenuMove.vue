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

<script>
import BaseTextButton from "../base/BaseTextButton.vue";
import BaseSmallListButton from "../base/BaseSmallListButton.vue";
import { MOVE_TASK } from "./../../store/action-types";
import { mapState, mapActions } from "vuex";

export default {
  components: {
    BaseTextButton,
    BaseSmallListButton,
  },
  inject: ["task", "projectId"],
  emits: ["closed"],
  computed: mapState({
    // NOTE: need to be function to access component data or function
    projects(state) {
      return state.projects.filter((project) => project.id !== this.projectId);
    },
  }),
  methods: {
    ...mapActions([MOVE_TASK]),
    // Delete してから Add する＝他のmutationsをcallする必要があるので、actionで定義している
    moveTask(toProjectId) {
      this[MOVE_TASK]({
        taskId: this.task.id,
        fromProjectId: this.projectId,
        toProjectId,
      });
      this.$emit("close");
    },
  },
};
</script>

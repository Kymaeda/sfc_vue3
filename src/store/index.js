import { createStore } from "vuex";
import { localStorage } from "./plugins/localStorage";
import {
  ADD_TASK,
  REMOVE_TASK,
  UPDATE_TASK,
  SET_ONLY_PENDING,
  SET_ACTIVE_PROJECT,
} from "./mutation-types";
import { MOVE_TASK } from "./action-types";

const getProjectById = (state, id) =>
  state.projects.find((project) => project.id === id);

const getProjectAndTaskId = function (state, { projectId, taskId }) {
  const project = getProjectById(state, projectId);

  return {
    project,
    taskIndex: project.tasks.findIndex((task) => task.id == taskId),
  };
};

const store = createStore({
  state() {
    return {
      onlyPending: false,
      currentProjectId: 1,
      projects: [
        {
          id: 1,
          name: "First Project",
          tasks: [
            {
              id: 1,
              description: "Buy food for the dog",
              priority: false,
              done: false,
            },
            {
              id: 2,
              description: "Pay the bills",
              priority: true,
              done: false,
            },
            {
              id: 3,
              description: "Buy some computer games",
              priority: false,
              done: false,
            },
            {
              id: 4,
              description: "Go to the gym",
              priority: false,
              done: false,
            },
          ],
        },
        {
          id: 2,
          name: "Life Project",
          tasks: [
            {
              id: 1,
              description: "Visit parents",
              priority: false,
              done: false,
            },
            {
              id: 2,
              description: "Visit uncles",
              priority: true,
              done: false,
            },
            {
              id: 3,
              description: "Go around the world",
              priority: false,
              done: false,
            },
            {
              id: 4,
              description: "Quit smoking",
              priority: false,
              done: false,
            },
          ],
        },
      ],
    };
  },
  getters: {
    currentProject(state) {
      return getProjectById(state, state.currentProjectId);
    },
    currentProjectTasks(_state, getters) {
      return getters.currentProject?.tasks ?? [];
    },
    projectsWithStats(state) {
      return state.projects.map((project) => ({
        ...project,
        nonDoneCount: project.tasks.filter((task) => !task.done).length,
      }));
    },
  },
  mutations: {
    [ADD_TASK](state, payload) {
      const project = getProjectById(state, payload.projectId);
      project.tasks.push(payload.task);
    },
    [REMOVE_TASK](state, payload) {
      const { project, taskIndex } = getProjectAndTaskId(state, payload);
      if (taskIndex !== undefined && taskIndex >= 0) {
        project.tasks.splice(taskIndex, 1);
      }
    },
    [UPDATE_TASK](state, payload) {
      const { project, taskIndex } = getProjectAndTaskId(state, payload);
      if (taskIndex !== undefined && taskIndex >= 0) {
        project.tasks[taskIndex] = payload.task;
      }
    },
    [SET_ONLY_PENDING](state, payload) {
      state.onlyPending = payload;
    },
    [SET_ACTIVE_PROJECT](state, payload) {
      state.currentProjectId = payload;
    },
  },
  actions: {
    [MOVE_TASK]({ commit, state }, { taskId, fromProjectId, toProjectId }) {
      const { project, taskIndex } = getProjectAndTaskId(state, {
        fromProjectId,
        taskId,
      });
      commit(ADD_TASK, {
        task: project.tasks.findIndex(taskIndex),
        projectId: toProjectId,
      });
      commit(REMOVE_TASK, {
        taskId,
        projectId: fromProjectId,
      });
    },
  },
  plugins: [localStorage],
});

export default store;

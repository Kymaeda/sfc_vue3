import { createStore } from "vuex";
import { localStorage } from "./plugins/localStorage";
import {
  ADD_TASK,
  UPDATE_TASK,
  SET_ONLY_PENDING,
  SET_ACTIVE_PROJECT,
} from "./mutation-types";

const getProjectById = (state, id) =>
  state.projects.find((project) => project.id === id);

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
    [UPDATE_TASK](state, payload) {
      const project = getProjectById(state, payload.projectId);
      const taskIndex = project.tasks.findIndex(
        (task) => task.id == payload.task.id
      );
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
  plugins: [localStorage],
});

export default store;

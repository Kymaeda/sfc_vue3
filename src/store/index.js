import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      onlyPending: false,
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
    };
  },
  getters: {},
  mutations: {
    addTask(state, payload) {
      state.tasks.push(payload);
    },
    updateTask(state, payload) {
      const taskIndex = state.tasks.findIndex((task) => task.id == payload.id);
      if (taskIndex !== undefined && taskIndex > 0) {
        state.tasks[taskIndex] = payload;
      }
    },
    updateOnlyPending(state, payload) {
      state.onlyPending = payload;
    },
  },
});

export default store;

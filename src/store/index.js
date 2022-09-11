import { createStore } from "vuex";
// import { localStorage } from "./plugins/localStorage";
import application from "./modules/application";
import project from "./modules/project";

const store = createStore({
  modules: {
    project,
    application,
  },
  state() {
    return {};
  },
  getters: {},
  mutations: {},
  actions: {},
  // plugins: [localStorage],
});

export default store;

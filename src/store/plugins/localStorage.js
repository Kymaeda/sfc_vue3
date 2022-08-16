const localStorageKey = "vuex-storage";

export const localStorage = (store) => {
  store.replaceState(
    Object.assign(
      store.state,
      JSON.parse(window.localStorage.getItem(localStorageKey))
    )
  );

  store.subscribe((_mutation, state) => {
    window.localStorage.setItem(localStorageKey, JSON.stringify(state));
  });
};

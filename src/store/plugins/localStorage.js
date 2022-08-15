export const LocalStorage = (store) => {
  console.log("localStorage was initialized");

  store.subscribe((mutation) => {
    console.log(mutation);
  });
};

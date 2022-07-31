const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === "production" ? "/app" : "/",
  pages: {
    index: {
      title: "Top Page",
      entry: "src/main.js",
    },
  },
});

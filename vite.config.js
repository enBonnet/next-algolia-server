const path = require("path");

module.exports = {
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/main.ts"),
      name: "next-algolia-server",
    },
    rollupOptions: {
      external: [],
      output: {},
    },
  },
};

import path from "path";

export default {
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/main.ts"),
      name: "main",
    },
    rollupOptions: {
      external: [],
      output: {},
    },
  },
};

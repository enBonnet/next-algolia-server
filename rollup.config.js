import path from "path";
import typescript from "rollup-plugin-typescript2";
import { name } from "./package.json";

export default {
  input: path.resolve(__dirname, "src/main.ts"),
  output: {
    file: path.resolve(__dirname, `dist/${name}.dts.js`),
    format: "es",
    externalLiveBindings: false,
  },
  external: [],
  plugins: [
    typescript({
      check: true,
      tsconfig: path.resolve(__dirname, "tsconfig.json"),
      tsconfigOverride: {
        compilerOptions: {
          sourceMap: false,
          declaration: true,
          declarationMap: true,
        },
        exclude: ["node_modules"],
      },
    }),
  ],
};

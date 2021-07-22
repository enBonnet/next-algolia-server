const fs = require("fs-extra");
const path = require("path");
const execa = require("execa");
const name = fs.readFile("./package.json").name;

main();

async function main() {
  await execa("vite", ["build"], { stdio: "inherit" });
  await execa("rollup", ["-c"], { stdio: "inherit" });
  await fs.remove(path.resolve(__dirname, `dist/main.dts.js`));
}

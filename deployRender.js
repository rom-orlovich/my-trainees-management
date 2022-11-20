const { execSync } = require("child_process");
const { existsSync, rmSync, writeFileSync } = require("fs");
const { copySync } = require("fs-extra");
const packageJson = {
    name: "My Trainees Management",
    version: "2.0.0",
    description: "",
    scripts: {
      start: "node ./server/*.js",
      keywords: [],
      author: "",
      license: "ISC",
    },
  };
const path = require("path");
export const cwd = path.resolve(".", "deploy-render");

console.log("Start building the app...");
execSync("npm run build");
console.log("Copy the client build folder to the deploy folder.");
const clientBuildPath = path.resolve(".", "src", "client", "build");
copySync(clientBuildPath, path.resolve(cwd, "server", "client"));
rmSync(clientBuildPath, { recursive: true, force: true });
console.log("Write new package.json");
const packageJsonPath = path.resolve(cwd, "package.json");
writeFileSync(packageJsonPath, JSON.stringify(packageJson));
console.log("The building was finished successfully");


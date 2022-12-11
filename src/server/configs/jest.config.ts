import type { Config } from "@jest/types";

// Sync object
const config: Config.InitialOptions = {
  verbose: true,

  globals: {
    "ts-jest": {
      useESM: true,
    },
  },
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  preset: "ts-jest",
};
export default config;

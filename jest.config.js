module.exports = {
  testEnvironment: "jsdom",
  modulePathIgnorePatterns: ["node_modules", "jest-test-results.json"],
  setupFiles: ["./.test/jest.setup.js"],
  setupFilesAfterEnv: ["./.test/setupTests.ts"],
  moduleDirectories: ["node_modules", "utils", __dirname],
};

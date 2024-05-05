module.exports = {
  testEnvironment: "jsdom", // Set the test environment to 'jsdom'
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy", // Mock styles
    "\\.(gif|ttf|eot)$": "<rootDir>/__mocks__/fileMock.js", // Mock file imports
    "\\.(jpg|jpeg|png|gif|webp|svg)$": "<rootDir>/__mocks__/fileMock.js",
  },
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest", // Transform JS and JSX files
  },
  transformIgnorePatterns: ["/node_modules/"], // Ignore transformations on node_modules
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"], // Location of setup file for additional configurations
};

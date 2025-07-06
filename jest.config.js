// jest.config.js
/** @type {import('jest').Config} */
const config = {
  clearMocks: true,
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  transform: {
    '^.+\\.(js|jsx|mjs|cjs|ts|tsx)$': 'babel-jest'},
    testEnvironment: 'jsdom',
};

module.exports = config;
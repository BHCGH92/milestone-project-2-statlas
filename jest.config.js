// jest.config.js
/** @type {import('jest').Config} */
const config = {
  clearMocks: true,
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
};

module.exports = config;
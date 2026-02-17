const extensionFiles = ['ts', 'tsx', 'js', 'jsx', 'json', 'node'];
const reactNativeEsModules = [];
const externalLibsEsModules = [];

const esModules = [...reactNativeEsModules, ...externalLibsEsModules].join('|');

/** @type {import('jest').Config} */
const config = {
  projects: [
    './src/core/jest.config.js',
    './src/web/jest.config.js',
    './src/react-native/jest.config.js',
  ],
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/**/*.{ts,tsx}'],
  moduleFileExtensions: extensionFiles,
  testTimeout: 20000,
  coverageDirectory: '<rootDir>/coverage',
  transformIgnorePatterns: [`node_modules/(?!${esModules})`],
  modulePathIgnorePatterns: ['/dist/'],
  testPathIgnorePatterns: ['setup.test.tsx'],
};

module.exports = config;

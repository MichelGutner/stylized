const extensionFiles = ['ts', 'tsx', 'js', 'jsx', 'json', 'node'];
const reactNativeEsModules = [];
const externalLibsEsModules = [];

const esModules = [...reactNativeEsModules, ...externalLibsEsModules].join('|');

/** @type {import('jest').Config} */
const config = {
  projects: [
    './packages/core/jest.config.js',
    './packages/web/jest.config.js',
    './packages/react-native/jest.config.js',
  ],
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/packages/**/*.{ts,tsx}'],
  moduleFileExtensions: extensionFiles,
  testTimeout: 20000,
  coverageDirectory: '<rootDir>/coverage',
  transformIgnorePatterns: [`node_modules/(?!${esModules})`],
  modulePathIgnorePatterns: ['/dist/'],
  testPathIgnorePatterns: ['setup.test.tsx'],
};

module.exports = config;

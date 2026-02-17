/** @type {import('jest').Config} */
const config = {
  preset: 'react-native',
  testEnvironment: 'node',
  transform: {
    '\\.[jt]sx?$': 'babel-jest',
  },
};

module.exports = config;

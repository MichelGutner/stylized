const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '..');

const config = getDefaultConfig(projectRoot);

// Add watch folders for local packages
config.watchFolders = [workspaceRoot];

// Add resolver for local packages using extraNodeModules
config.resolver.extraNodeModules = {
  'stylized': path.resolve(workspaceRoot, 'dist'),
};

// Add alias as fallback
config.resolver.alias = {
  'stylized': path.resolve(workspaceRoot, 'dist/index.js'),
};

module.exports = config;

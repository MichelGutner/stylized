const path = require('path');

module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            '@': path.resolve(__dirname, './packages'),
          },
          extensions: ['.js', '.ts', '.tsx', '.json'],
        },
      ],
    ],
  };
};

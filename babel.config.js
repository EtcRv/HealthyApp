module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        alias: {
          '@screens': './src/screens',
          '@assets': './src/assets',
          '@components': './src/components',
          '@core': './src/core',
          '@utils': './src/utils',
          '@models': './src/models',
          '@navigation': './src/navigation',
        },
      },
    ],
  ],
};

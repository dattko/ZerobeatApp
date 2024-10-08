module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ['@babel/plugin-proposal-private-methods', { loose: true }],
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json', '.svg'],
        alias: {
          '@': './src',
          '@components': './src/components',
          '@text': './src/components/typography/Typography', 
          '@screens': './src/screens',
          '@navigation': './src/navigation',
          '@services': './src/services',
          '@utils': './src/utils',
          '@hooks': './src/hooks',
          '@contexts': './src/contexts',
          '@assets': './src/assets',
          '@styles': './src/styles',
          '@constants': './src/constants',
        },
      },
    ],
    'babel-plugin-styled-components',
    'react-native-reanimated/plugin', 
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: '.env',
				"blocklist": null,
				"allowlist": null,
				"blacklist": null, 
				"whitelist": null, 
				"safe": false,
				"allowUndefined": true,
				"verbose": false
      },
    ],
  ],
};

module.exports = {
  dependencies: {
    'react-native-vector-icons': {
      platforms: {
        ios: null,
      },
    },
  },
  project: {
    ios: {},
    android: {},
  },
  assets: ['./src/Assets/Fonts'],
  plugins: [
    '@react-native-google-signin/google-signin',
  ],
};

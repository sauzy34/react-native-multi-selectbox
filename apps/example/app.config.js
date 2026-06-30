// Dynamic Expo config so GitHub Pages can use a subpath base URL without breaking local `expo start --web`.
// CI sets EXPO_BASE_URL=/react-native-multi-selectbox when exporting for Pages.
const appJson = require('./app.json')

/** @type {import('expo/config').ExpoConfig} */
const expo = {
  ...appJson.expo,
  experiments: {
    ...(appJson.expo.experiments ?? {}),
    ...(process.env.EXPO_BASE_URL ? { baseUrl: process.env.EXPO_BASE_URL.replace(/\/$/, '') } : {}),
  },
}

module.exports = { expo }

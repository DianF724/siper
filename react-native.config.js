module.exports = {
    dependencies: {
      // React Native Firebase Modules
      '@react-native-firebase/app': {
        platforms: {
          ios: null, // Menonaktifkan di iOS jika tidak digunakan
        },
      },
      '@react-native-firebase/auth': {
        platforms: {
          ios: null, // Menonaktifkan di iOS jika tidak digunakan
        },
      },
      '@react-native-firebase/database': {
        platforms: {
          ios: null, // Menonaktifkan di iOS jika tidak digunakan
        },
      },
      // React Navigation
      '@react-navigation/native': {},
      '@react-navigation/stack': {},
      '@react-navigation/bottom-tabs': {},
      // React Native Gesture Handler
      'react-native-gesture-handler': {},
      // React Native Reanimated
      'react-native-reanimated': {},
      // Other Libraries
      '@react-native-picker/picker': {},
      'react-native-document-picker': {},
      'expo-image-picker': {},
      'expo-document-picker': {},
    },
    android: {
      packageName: 'com.example.siper', // Nama paket untuk Android
    },
  };
  
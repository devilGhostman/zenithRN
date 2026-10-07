module.exports = {
  preset: '@react-native/jest-preset',
  setupFiles: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|react-redux|@reduxjs|immer|reselect|@tanstack|@legendapp|redux-persist|@react-navigation|react-native-screens|react-native-gesture-handler)/)',
  ],
};

module.exports = {
  testEnvironment: 'node',
  preset: 'react-native',
  transform: {
    '^.+.tsx?$': ['ts-jest', {}],
  },
  coverageReporters: ['lcov', 'text'],
  coverageThreshold: {
    './src/': {
      statements: 95,
      branches: 95,
      functions: 95,
      lines: 95,
    },
  },
};

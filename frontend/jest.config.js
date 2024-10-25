module.exports = {
  testEnvironment: 'node',
  preset: 'react-native',
  transform: {
    '^.+.tsx?$': ['ts-jest', {}],
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  coverageReporters: ['lcov', 'text'],
  coverageThreshold: {
    './src/': {
      statements: 100,
      branches: 100,
      functions: 100,
      lines: 100,
    },
  },
};

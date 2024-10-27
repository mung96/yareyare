module.exports = {
  root: true,
  extends: ['@react-native'],
  plugins: ['import'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'import/no-restricted-paths': [
      'error',
      {
        zones: [
          {
            target: './ui/**',
            from: './ui/**',
          },
        ],
      },
    ],
  },

  settings: {
    'import/resolver': {
      node: {
        moduleDirectory: ['node_modules', 'src/'],
        extensions: ['.ts', '.tsx'],
      },
    },
  },
};

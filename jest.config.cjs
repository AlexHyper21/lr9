module.exports = {
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/src'],
  testMatch: ['**/*.test.{js,jsx}'],
  setupFilesAfterEnv: ['<rootDir>/test/setupTests.js'],
  moduleNameMapper: {
    '\\.(css)$': 'identity-obj-proxy',
    '\\.(svg|webp|png|jpg|jpeg)$': '<rootDir>/test/fileMock.cjs',
  },
};

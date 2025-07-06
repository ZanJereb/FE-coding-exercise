module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  moduleFileExtensions: ['ts','tsx','js','jsx','json'],
  testMatch: ['**/?(*.)+(test).[tj]s?(x)'],  
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy',  
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};
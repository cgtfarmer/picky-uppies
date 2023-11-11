// const { pathsToModuleNameMapper } = require('ts-jest');
// const { compilerOptions } = require('./tsconfig');

module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  // moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: 'src/' })
  // moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: "src/" })
  roots: ["<rootDir>/src/"],
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/assets/app/$1'
  },
  testMatch: [
    "**/__tests__/**/*.[jt]s?(x)",
    "**/?(*.)+(spec|test).[tj]s?(x)"
  ],
};

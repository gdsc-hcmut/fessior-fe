import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const config = {
  // Add more setup options before each test is run
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  testRegex: '/src/.*\\.(test|spec).(ts|tsx|js)$',
  collectCoverageFrom: [
    'src/**/*.{js,jsx,tsx,ts}',
    '!**/node_modules/**',
    '!**/vendor/**',
  ],
  testEnvironment: 'jest-environment-jsdom',
  coverageReporters: ['json', 'lcov'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config);

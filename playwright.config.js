const { defineConfig, devices } = require('@playwright/test');
const os = require('os');
const { storageStatePath } = require('./src/config/authPaths');

module.exports = defineConfig({
  testDir: './tests',

  use: {
    baseURL: 'https://www.saucedemo.com',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  reporter: [
    ['list'],
    ['html'],
    [
      'allure-playwright',
      {
        resultsDir: 'allure-results',
        detail: true,
        suiteTitle: true,
        environmentInfo: {
          os_platform: os.platform(),
          os_release: os.release(),
          node_version: process.version,
        },
      },
    ],
  ],

  projects: [
    {
      name: 'setup',
      testDir: './tests/ui/setup',
      testMatch: /.*\.setup\.spec\.js/,
      use: { storageState: undefined },
    },

    {
      name: 'e2e-chromium',
      dependencies: ['setup'],
      testDir: './tests/ui/e2e',
      testMatch: /.*\.spec\.js/,
      use: {
        ...devices['Desktop Chrome'],
        storageState: storageStatePath,
      },
    },

    {
      name: 'public',
      testDir: './tests/ui/public',
      testMatch: /.*\.spec\.js/,
      use: { storageState: undefined },
    },

    // Uncomment if you want to run e2e tests in Firefox as well
    // {
    //   name: 'е2e-firefox',
    //   dependencies: ['setup'],
    //   testDir: './tests/ui/e2e',
    //   testMatch: /.*\.spec\.js/,
    //   use: {
    //     ...devices['Desktop Firefox'],
    //     storageState: storageStatePath,
    //   },
    // },

    // Uncomment if you want to run e2e tests in WebKit / Safari engine
    // {
    //   name: 'e2e-webkit',
    //   dependencies: ['setup'],
    //   testDir: './tests/ui/e2e',
    //   testMatch: /.*\.spec\.js/,
    //   use: {
    //     ...devices['Desktop Safari'],
    //     storageState: storageStatePath,
    //   },
    // },
  ],
});
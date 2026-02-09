import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: '.',
  testMatch: ['tests/**/*.spec.ts', 'tests-K/**/*.spec.ts'],
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 0 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */

  timeout: 500000,    //设置每个测试用例的超时时间=350s

  expect: {timeout: 50000},     //設置expect檢測語句的超時時間=50s

  use: {
    // Emulates the browser locale.
    locale: 'zh-TW',

    // Emulates the browser timezone.
    timezoneId: 'Asia/Taipei',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on',   // 預設為on-first-retry

    testIdAttribute: 'data-testid',   //前端元件都有建立testid,可加以利用

    //全局延时
    launchOptions: {
      slowMo: parseInt(process.env.PLAYWRIGHT_SLOW_MO || '500'), //每个操作增加500ms延时
    },
  },

  /* Configure projects for major browsers */
  projects: [
    // Setup project
    { 
      name: 'setup', 
      testMatch: /.*\.setup\.ts/,
      use: {
        baseURL: 'http://localhost/SunFusion/',
      },
    },

    {
      name: 'Google Chrome - Localhost',
      use: { 
        ...devices['Desktop Chrome'], 
        channel: 'chrome', 
        baseURL: 'http://localhost/SunFusion/',
        storageState: 'playwright/.auth/user.json', 
        viewport: { width: 1500, height: 720 } 
      },
      dependencies: ['setup'],
    },
    
    {
      name: 'Google Chrome - Other',
      use: { 
        ...devices['Desktop Chrome'], 
        channel: 'chrome', 
        baseURL: 'http://localhost/SunFusion365K/',
        storageState: 'playwright/.auth/user-other.json',  // 不同的 auth 檔案
        viewport: { width: 1500, height: 720 } 
      },
      dependencies: ['setup'],
    },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});

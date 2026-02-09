import { defineConfig, devices } from '@playwright/test';
import path from 'path';

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
  testDir: './',
  testMatch: ['tests/**/*.spec.ts', 'tests-K/**/*.spec.ts', 'tests/**/*.setup.ts'],
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

  timeout: 500000,    //設置每個測試用例的超時時間=500s

  expect: {timeout: 50000},     //設置expect檢測語句的超時時間=50s

  use: {
    // Emulates the browser locale.
    locale: 'zh-TW',

    // Emulates the browser timezone.
    timezoneId: 'Asia/Taipei',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on',   // 預設為on-first-retry

    testIdAttribute: 'data-testid',   //前端元件都有建立testid,可加以利用

    //全局延遲時間
    launchOptions: {
      slowMo: parseInt(process.env.PLAYWRIGHT_SLOW_MO || '500'), //每個操作增加500ms延遲
    },
  },

  /* Configure projects for major browsers */
  projects: [
    // Setup project01 for tests of SunFusion I1088
    { 
      name: 'setup', 
      testDir: 'tests',
      testMatch: ['**/*.setup.ts'],
      use: {
        baseURL: 'http://localhost/SunFusion/',
      },
    },



    // Setup project02 for tests-K of SunFusionK' ADMIN
    { 
      name: 'setup-k', 
      testDir: 'tests-K',
      testMatch: /.*auth1\.setup\.ts/,
      use: {
        baseURL: 'http://192.168.55.117/SunFusionK/',
      },
    },

    // Setup project03 for tests-K of SunFusionK' 001
    { 
      name: 'setup-k_001', 
      testDir: 'tests-K',
      testMatch: /.*auth2\.setup\.ts/,
      use: {
        baseURL: 'http://192.168.55.117/SunFusionK/',
      },
    },

    {
      name: 'Google Chrome - Localhost',
      use: { 
        ...devices['Desktop Chrome'], 
        channel: 'chrome', 
        baseURL: 'http://localhost/SunFusion/',
        storageState: path.join(process.cwd(), 'tests', 'playwright', '.auth', 'user.json'), 
        viewport: { width: 1500, height: 720 } 
      },
      dependencies: ['setup'],
    },
    
    {
      name: 'Google Chrome - Test-K_001',
      use: { 
        ...devices['Desktop Chrome'], 
        channel: 'chrome', 
        baseURL: 'http://192.168.55.117/SunFusion365K/',
        storageState: path.join(process.cwd(), 'tests-K', 'playwright', '.auth', 'user-k_001.json'),  // tests-K 001專用的 auth 檔案
        viewport: { width: 1500, height: 720 } 
      },
      dependencies: ['setup-k_001'],
    },
    {
      name: 'Google Chrome - Tests-K',
      use: { 
        ...devices['Desktop Chrome'], 
        channel: 'chrome', 
        baseURL: 'http://192.168.55.117/SunFusionK/',
        storageState: path.join(process.cwd(), 'tests-K', 'playwright', '.auth', 'user-k.json'),  // tests-K ADMIN專用的 auth 檔案
        viewport: { width: 1500, height: 720 } 
      },
      dependencies: ['setup-k'],
    },


  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});

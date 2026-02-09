import { test as setup, expect } from '@playwright/test';
import path from 'path';

const authFile = path.join(__dirname, '../tests-K/playwright/.auth/user-k_001.json');

setup('authenticate-k_001', async ({ page }) => {
  //await page.goto('http://192.168.55.117/sunfusionK/erp/#/login');
  //await page.goto('#/#/login');
  await page.waitForTimeout(3000);  
  await page.waitForLoadState('networkidle');
  await expect(page).toHaveTitle('SunFusion ERP');

  // 選擇公司別 - 等待元素可見再操作
  await page.getByText('帳套選擇').waitFor({ state: 'visible', timeout: 10000 });
await page.getByTestId('default-compno-icon').click();
await page.getByTestId('default-compno-option-0000/A0').click();

  // 填入使用者名稱
  await page.getByTestId('default-username-prefix-inner').click();
  await page.getByTestId('default-username').fill('001');
  await page.getByTestId('default-username').press('Enter');
  await page.waitForLoadState('networkidle');
  
  // 填入密碼
  await page.getByRole('textbox',{ name: '請輸入密碼'}).fill('');
  
  // 點擊登入按鈕
  await page.getByTestId('登入-btn').click();
  await page.waitForTimeout(1000);  
  await page.locator('.index').click();
  await expect(page).toHaveURL('http://192.168.55.117/sunfusionK/erp/#/home');
  
  // 登入資料儲存
  await page.context().storageState({ path: authFile }); 
  await page.waitForTimeout(500);
});

import { test, expect } from '@playwright/test';
//設定wait和click時的等待時間,執行時取用,節省重複程式碼,減少因系統執行逾時出現錯誤訊息而失敗

async function waitAndClick(locator: any, timeout = 30000) {
  await locator.waitFor({ state: 'visible', timeout });
  await locator.click();
}

test('購買本期39電子發票-YY-第一冊', async ({ page }) => {
  //購買本期39電子第一冊發票  
  await page.goto('#/basic/invcn/list');
  await page.waitForLoadState('networkidle');
  await expect(page.getByRole('dialog', { name: '進入購買發票頁面時錯誤' })).not.toBeVisible();
  
  await waitAndClick(page.getByTestId('DRPINVCN-add-btn'));
  await waitAndClick(page.getByTestId('DRPINVCN-radio-button-1'));
  await waitAndClick(page.getByTestId('DRPINVCN-H-YYMM'));
  await page.getByTestId('DRPINVCN-H-YYMM').press('Enter');
  await waitAndClick(page.getByTestId('DRPINVCN-H-INV_ID-input-inner'));
  await waitAndClick(page.getByTestId('DRPINVCN-H-INV_ID-option-7'));
  await page.getByTestId('DRPINVCN-H-INV_ID-input-inner').press('Enter');
  await page.getByTestId('DRPINVCN-H-TRACK_ID').fill('YY');
  await page.getByTestId('DRPINVCN-H-TRACK_ID').press('Enter');
  await waitAndClick(page.getByTestId('DRPINVCN-H-F_SEQ_NO'));
  await page.getByTestId('DRPINVCN-H-F_SEQ_NO').fill('00000000');
  await page.getByTestId('DRPINVCN-H-F_SEQ_NO').press('Enter');
  await waitAndClick(page.getByTestId('DRPINVCN-save-btn'));
  await expect(page.getByText('存檔成功')).toBeVisible();
  await page.waitForTimeout(500);

  /*test('購買本期二聯第一冊發票', async ({ page }) => {
  //購買本期二聯第一冊發票  
  await page.goto('#/basic/invcn/list');
  await page.waitForTimeout(1000);
  await page.getByTestId('DRPINVCN-add-btn').click();
  await page.getByTestId('DRPINVCN-radio-button-1').click();
  await page.getByTestId('DRPINVCN-H-YYMM').click();
  await page.getByTestId('DRPINVCN-H-YYMM').press('Enter');
  await page.getByTestId('DRPINVCN-H-INV_ID-input-inner').click();
  await page.getByTestId('DRPINVCN-H-INV_ID-option-2').click();
  await page.getByTestId('DRPINVCN-H-INV_ID-input-inner').press('Enter');
  await page.getByTestId('DRPINVCN-H-TRACK_ID').fill('TT');
  await page.getByTestId('DRPINVCN-H-TRACK_ID').press('Enter');
  await page.getByTestId('DRPINVCN-H-F_SEQ_NO').click();
  await page.getByTestId('DRPINVCN-H-F_SEQ_NO').fill('00000000');
  await page.getByTestId('DRPINVCN-H-F_SEQ_NO').press('Enter');
  await page.getByTestId('DRPINVCN-save-btn').click();
  await expect(page.getByText('存檔成功')).toBeVisible();
  await page.waitForTimeout(500);
  */
});
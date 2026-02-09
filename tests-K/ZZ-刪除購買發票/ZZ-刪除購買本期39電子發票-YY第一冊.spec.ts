import { test, expect } from '@playwright/test';
//設定wait和click時的等待時間,執行時取用,節省重複程式碼,減少因系統執行逾時出現錯誤訊息而失敗

async function waitAndClick(locator: any, timeout = 30000) {
  await locator.waitFor({ state: 'visible', timeout });
  await locator.click();
}

test('刪除購買本期39電子發票-YY第一冊', async ({ page }) => {
  // 先改當前號碼後,存檔再刪除
  await page.goto(`#/basic/invcn/list`); 
  await page.waitForTimeout(1000);
  await page.waitForLoadState('networkidle');
  await waitAndClick(page.getByTestId('search-form-DRPINVCN-本期-btn'));
  await waitAndClick(page.getByTestId('search-form-DRPINVCN-Search-btn'));
  await waitAndClick(page.getByTestId('DRPINVCN-INV_ID-B-INV_ID-row_0-cell-wrapper'));
  await waitAndClick(page.getByTestId('DRPINVCN-H-SEQ_NO'));
  await page.getByTestId('DRPINVCN-H-SEQ_NO').fill('00000000');
  await page.getByTestId('DRPINVCN-H-SEQ_NO').press('Enter');
  await waitAndClick(page.getByTestId('DRPINVCN-save-btn'));
  await expect(page.getByText('存檔成功')).toBeVisible();
  await waitAndClick(page.getByTestId('DRPINVCN-delete-btn'));
  await waitAndClick(page.locator('div').filter({ hasText: '提示' }).nth(4));
  await waitAndClick(page.getByRole('button', { name: '確定' }));
  await expect(page.getByText('刪除成功')).toBeVisible({ timeout: 10000 });

  await page.waitForLoadState('networkidle');
  // 離開關閉購買發票作業與關閉購買發票查詢
  await waitAndClick(page.getByTestId('DRPINVCN-exit2-btn'));
  await page.getByText('購買發票查詢').click();
  await waitAndClick(page.getByTestId('DRPINVCN-exit2-btn')); 
});
import { test, expect } from '@playwright/test';


//設定wait和click時的等待時間,執行時取用,節省重複程式碼,減少因系統執行逾時出現錯誤訊息而失敗
async function waitAndClick(locator: any, timeout = 30000) {
  await locator.waitFor({ state: 'visible', timeout });
  await locator.click();
}

//821->刪除購買本期39電子發票-YY第一冊&第二、三冊---20260211-K版

test('刪除購買本期39電子發票-YY第一冊&第二、三冊', async ({ page }) => {
  //說明:新增本期39電子第一冊發票-YY:新增->修改->刪除->再新增,再速設二冊-第二冊、第三冊  
  await page.goto('#/basic/invcn/list');
//3.檢測進入頁面錯誤  
  //await page.waitForLoadState('networkidle');
  await expect(page.getByRole('dialog', { name: '進入購買發票頁面時錯誤' })).not.toBeVisible();
//***********************************************刪除本期39電子發票-YY-第一冊************************
//先查詢出剛新增的XX第一冊
  await waitAndClick(page.getByTestId('search-form-DRPINVCN-本期-btn'));
  await waitAndClick(page.getByTestId('search-name-DRPINVCN-DEP-1-input-inner'));
  await waitAndClick(page.getByTestId('search-name-DRPINVCN-DEP-1-option-TRACK_ID-text'));
  await waitAndClick(page.getByTestId('search-operator-DRPINVCN-TRACK_ID-1-input-inner'));
  await waitAndClick(page.getByTestId('search-operator-DRPINVCN-DEP-1-option-contain-text'));
  await waitAndClick(page.getByTestId('search-input-DRPINVCN-TRACK_ID-1-value1'));
  await page.getByTestId('search-input-DRPINVCN-TRACK_ID-1-value1').fill('XX');
  await page.getByTestId('search-input-DRPINVCN-TRACK_ID-1-value1').press('Enter');
  await waitAndClick(page.getByTestId('search-form-DRPINVCN-Search-btn'));
//1.修改XX第一冊當前號碼為00000000,以利後續刪除
  await waitAndClick(page.getByTestId('DRPINVCN-INV_ID-B-INV_ID-row_0-cell-wrapper').locator('a'));
  await waitAndClick(page.getByTestId('DRPINVCN-H-SEQ_NO'));
  await page.getByTestId('DRPINVCN-H-SEQ_NO').fill('00000000');
  await page.getByTestId('DRPINVCN-H-SEQ_NO').press('Enter');
  await waitAndClick(page.getByTestId('DRPINVCN-save-btn'));
  await expect(page.getByText('存檔成功')).toBeVisible();
  await waitAndClick(page.getByTestId('DRPINVCN-delete-btn'));
  await waitAndClick(page.locator('div').filter({ hasText: '提示' }).nth(4));
  await waitAndClick(page.getByRole('button', { name: '確定' }));
  await expect(page.getByText('刪除成功')).toBeVisible({ timeout: 10000 });
  //await page.waitForLoadState('networkidle');
  // 關閉"購買發票作業"分頁並開啟"購買發票查詢"
  await waitAndClick(page.getByTestId('DRPINVCN-exit2-btn')); 
//2.修改YY第二冊當前號碼為00000050,以利後續刪除
  await waitAndClick(page.getByTestId('DRPINVCN-INV_ID-B-INV_ID-row_0-cell-wrapper').locator('a'));
  await waitAndClick(page.getByTestId('DRPINVCN-H-SEQ_NO'));
  await page.getByTestId('DRPINVCN-H-SEQ_NO').fill('00000050');
  await page.getByTestId('DRPINVCN-H-SEQ_NO').press('Enter');
  await waitAndClick(page.getByTestId('DRPINVCN-save-btn'));
  await expect(page.getByText('存檔成功')).toBeVisible();
  await waitAndClick(page.getByTestId('DRPINVCN-delete-btn'));
  await waitAndClick(page.locator('div').filter({ hasText: '提示' }).nth(4));
  await waitAndClick(page.getByRole('button', { name: '確定' }));
  await expect(page.getByText('刪除成功')).toBeVisible({ timeout: 10000 });
  //await page.waitForLoadState('networkidle');
  // 關閉"購買發票作業"分頁並開啟"購買發票查詢"
  await waitAndClick(page.getByTestId('DRPINVCN-exit2-btn')); 
//3.修改YY第三冊當前號碼為00000100,以利後續刪除
  await waitAndClick(page.getByTestId('DRPINVCN-INV_ID-B-INV_ID-row_0-cell-wrapper').locator('a'));
  await waitAndClick(page.getByTestId('DRPINVCN-H-SEQ_NO'));
  await page.getByTestId('DRPINVCN-H-SEQ_NO').fill('00000100');
  await page.getByTestId('DRPINVCN-H-SEQ_NO').press('Enter');
  await waitAndClick(page.getByTestId('DRPINVCN-save-btn'));
  await expect(page.getByText('存檔成功')).toBeVisible();
  await waitAndClick(page.getByTestId('DRPINVCN-delete-btn'));
  await waitAndClick(page.locator('div').filter({ hasText: '提示' }).nth(4));
  await waitAndClick(page.getByRole('button', { name: '確定' }));
  await expect(page.getByText('刪除成功')).toBeVisible({ timeout: 10000 });
  //await page.waitForLoadState('networkidle');
  // 關閉"購買發票作業"分頁並開啟"購買發票查詢"
  await waitAndClick(page.getByTestId('DRPINVCN-exit2-btn')); 
  // 關閉"購買發票查詢"分頁
  await waitAndClick(page.getByTestId('DRPINVCN-exit2-btn')); 
});
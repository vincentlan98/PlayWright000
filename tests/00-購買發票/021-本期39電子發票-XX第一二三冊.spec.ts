import { test, expect } from '@playwright/test';
//引入path模組以處理認證與路徑
import path from 'path';
// 使用已儲存的認證狀態user.json 放在tests/playwright/.auth/底下
test.use({ storageState: path.join(__dirname, '../../../../playwright/.auth/user.json') });


//1.設定wait和click時的等待時間,執行時取用,節省重複程式碼,減少因系統執行逾時出現錯誤訊息而失敗
async function waitAndClick(locator: any, timeout = 30000) {
  await locator.waitFor({ state: 'visible', timeout });
  await locator.click();
}


//BX001->BXINVNO0060&0061新增&修改&檢測發票號碼---20260204版
// 1.playwrightconfig.ts為3個setup project加上testDir限制;
// 2.認證user.json 指向存放在tests/playwright/.auth/下;


test('購買本期39電子發票-XX-第一冊&速設第二、三冊', async ({ page }) => {
  //說明:新增本期39電子第一冊發票-XX:新增->修改->刪除->再新增,再速設二冊-第二冊、第三冊  
  await page.goto('#/basic/invcn/list');
//3.檢測進入頁面錯誤  
  await page.waitForLoadState('networkidle');
  await expect(page.getByRole('dialog', { name: '進入購買發票頁面時錯誤' })).not.toBeVisible();
  //新增本期39電子發票-XX-第一冊
  await waitAndClick(page.getByTestId('DRPINVCN-add-btn'));
  await waitAndClick(page.getByTestId('DRPINVCN-radio-button-1'));
  await waitAndClick(page.getByTestId('DRPINVCN-H-YYMM'));
  await page.getByTestId('DRPINVCN-H-YYMM').press('Enter');
  await waitAndClick(page.getByTestId('DRPINVCN-H-INV_ID-input-inner'));
  await waitAndClick(page.getByTestId('DRPINVCN-H-INV_ID-option-7'));
  await page.getByTestId('DRPINVCN-H-INV_ID-input-inner').press('Enter');
  await page.getByTestId('DRPINVCN-H-TRACK_ID').fill('XX');
  await page.getByTestId('DRPINVCN-H-TRACK_ID').press('Enter');
  await waitAndClick(page.getByTestId('DRPINVCN-H-F_SEQ_NO'));
  await page.getByTestId('DRPINVCN-H-F_SEQ_NO').fill('00000000');
  await page.getByTestId('DRPINVCN-H-F_SEQ_NO').press('Enter');
  await waitAndClick(page.getByTestId('DRPINVCN-save-btn'));
  await expect(page.getByText('存檔成功')).toBeVisible();
  await page.waitForTimeout(500);
  await waitAndClick(page.getByTestId('DRPINVCN-exit2-btn'));
//查詢->修改->刪除->再新增  
  await page.goto('#/basic/invcn/list');
//3.檢測進入頁面錯誤  
  await page.waitForLoadState('networkidle');
  await expect(page.getByRole('dialog', { name: '進入購買發票頁面時錯誤' })).not.toBeVisible();
  //修改本期39電子發票-XX-第一冊-
  await waitAndClick(page.getByTestId('DRPINVCN-INV_ID-B-INV_ID-row_0-cell-wrapper').locator('a'));
await page.getByTestId('DRPINVCN-H-MATH_NO').click();
await page.getByTestId('DRPINVCN-H-MATH_NO').fill('A01');
await page.getByTestId('DRPINVCN-H-MATH_NO').press('Enter');
await page.getByTestId('DRPINVCN-H-BUYUSER').click();
await page.getByTestId('DRPINVCN-H-BUYUSER-icon-svg').click();
await waitAndClick(page.getByTestId('DRPINVCN-gridOptions-B-column_0-row_0-checkbox-icon'));
await waitAndClick(page.getByRole('button', { name: '確定' }));
await page.getByTestId('DRPINVCN-H-BUYUSER').press('Enter');
await waitAndClick(page.getByTestId('DRPINVCN-H-USEDEP'));
await waitAndClick(page.getByTestId('DRPINVCN-H-USEDEP-icon-svg'));
await waitAndClick(page.getByTestId('DEPT-resize').getByTestId('DRPINVCN-gridOptions-B-column_0-row_0-checkbox-icon'));
await waitAndClick(page.getByTestId('dialog-DRPINVCN-確定-btn'));
await waitAndClick(page.getByTestId('DRPINVCN-H-ISELINV-inner'));
await waitAndClick(page.getByTestId('DRPINVCN-save-btn'));
await expect(page.getByText('存檔成功')).toBeVisible();
await waitAndClick(page.getByTestId('DRPINVCN-exit2-btn'));

 //刪除->再新增  
  await page.goto('#/basic/invcn/list');
//3.檢測進入頁面錯誤  
  await page.waitForLoadState('networkidle');
  await expect(page.getByRole('dialog', { name: '進入購買發票頁面時錯誤' })).not.toBeVisible();
  //刪除
  await waitAndClick(page.getByTestId('DRPINVCN-INV_ID-B-column_0-row_0-checkbox-icon'));
  await waitAndClick(page.getByTestId('DRPINVCN-delete-btn'));
  await waitAndClick(page.getByRole('button', { name: '確定' }));
  await expect(page.getByText('刪除成功')).toBeVisible();
//再新增 
  await page.goto('#/basic/invcn/list');
//3.檢測進入頁面錯誤  
  await page.waitForLoadState('networkidle');
  await expect(page.getByRole('dialog', { name: '進入購買發票頁面時錯誤' })).not.toBeVisible();
  //新增本期39電子發票-XX-第一冊
  await waitAndClick(page.getByTestId('DRPINVCN-add-btn'));
  await waitAndClick(page.getByTestId('DRPINVCN-radio-button-1'));
  await waitAndClick(page.getByTestId('DRPINVCN-H-YYMM'));
  await page.getByTestId('DRPINVCN-H-YYMM').press('Enter');
  await waitAndClick(page.getByTestId('DRPINVCN-H-INV_ID-input-inner'));
  await waitAndClick(page.getByTestId('DRPINVCN-H-INV_ID-option-7'));
  await page.getByTestId('DRPINVCN-H-INV_ID-input-inner').press('Enter');
  await page.getByTestId('DRPINVCN-H-TRACK_ID').fill('XX');
  await page.getByTestId('DRPINVCN-H-TRACK_ID').press('Enter');
  await page.getByTestId('DRPINVCN-H-F_SEQ_NO').fill('00000000');
  await page.getByTestId('DRPINVCN-H-F_SEQ_NO').press('Enter');
  await waitAndClick(page.getByTestId('DRPINVCN-H-F_SEQ_NO'));
  await waitAndClick(page.getByTestId('DRPINVCN-save-btn'));
  await expect(page.getByText('存檔成功')).toBeVisible();
  await page.waitForTimeout(500);
  await waitAndClick(page.getByTestId('DRPINVCN-exit2-btn'));

  //速設二冊
  await waitAndClick(page.getByRole('button', { name: ' 速設' }));
  await waitAndClick(page.getByTestId('dialog-DRPINVCN-H-INV_ID-7-inner'));
  await waitAndClick(page.getByTestId('dialog-DRPINVCN-H-TRACK_ID'));
  await page.getByTestId('dialog-DRPINVCN-H-TRACK_ID').fill('XX');
  await page.getByTestId('dialog-DRPINVCN-H-TRACK_ID').press('Enter');
  await waitAndClick(page.getByTestId('dialog-DRPINVCN-H-MATH_NO'));
  await page.getByTestId('dialog-DRPINVCN-H-MATH_NO').fill('A02');
  await page.getByTestId('dialog-DRPINVCN-H-MATH_NO').press('Enter');
  await waitAndClick(page.getByTestId('dialog-DRPINVCN-H-BOOK_CNT'));
  await page.getByTestId('dialog-DRPINVCN-H-BOOK_CNT').fill('2');
  await waitAndClick(page.getByTestId('dialog-DRPINVCN-H-F_SEQ_NO'));
  await page.getByTestId('dialog-DRPINVCN-H-F_SEQ_NO').fill('00000050');
  await page.getByTestId('dialog-DRPINVCN-H-F_SEQ_NO').press('Enter');
  await waitAndClick(page.getByTestId('dialog-DRPINVCN-確定-btn'));
  await waitAndClick(page.getByTestId('DRPINVCN-exit2-btn'));
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
   
  await page.waitForLoadState('networkidle');
  // 離開關閉購買發票作業與關閉購買發票查詢
  await waitAndClick(page.getByTestId('DRPINVCN-exit2-btn'));
  await page.getByText('購買發票查詢').click();
  await waitAndClick(page.getByTestId('DRPINVCN-exit2-btn')); 
  */
});
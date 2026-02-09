import { test, expect } from '@playwright/test';
//引入path模組以處理認證與路徑
import path from 'path';


//設定wait和click時的等待時間,執行時取用,節省重複程式碼,減少因系統執行逾時出現錯誤訊息而失敗
async function waitAndClick(locator: any, timeout = 30000) {
  await locator.waitFor({ state: 'visible', timeout });
  await locator.click();
}

// 使用已儲存的認證狀態-User-K_001.json 放在tests-K/playwright/.auth/底下
test.use({ storageState: path.join(__dirname, '../../tests-K/playwright/.auth/user-k_001.json') });

test('購買本期39電子發票-YY-第一冊&速設第二三冊', async ({ page }) => {
  //說明:新增本期39電子第一冊發票-YY:新增->修改->刪除->再新增,再速設二冊-第二冊、第三冊  
  await page.goto('http://192.168.55.117/sunfusionK/erp/#/basic/invcn/list');
//3.檢測進入頁面錯誤  
  //await page.waitForLoadState('networkidle');
  await expect(page.getByRole('dialog', { name: '進入購買發票頁面時錯誤' })).not.toBeVisible();
//***********************************************新增本期39電子發票-YY-第一冊************************
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
  // 關閉購買發票作業
  await waitAndClick(page.getByTestId('DRPINVCN-exit2-btn'));
  await page.waitForTimeout(500);
  // 關閉購買發票查詢
  await page.getByText('購買發票查詢').click();
  await waitAndClick(page.getByTestId('DRPINVCN-exit2-btn')); 


//***********************************************查詢本期39電子發票-YY-第一冊-->修改->刪除->再新增************************
  await page.goto('http://192.168.55.117/sunfusionK/erp/#/basic/invcn/list');
//3.檢測進入頁面錯誤  
  //await page.waitForLoadState('networkidle');
  await expect(page.getByRole('dialog', { name: '進入購買發票頁面時錯誤' })).not.toBeVisible();
//先查詢出剛新增的YY第一冊
  await waitAndClick(page.getByTestId('search-form-DRPINVCN-本期-btn'));
  await waitAndClick(page.getByTestId('search-name-DRPINVCN-DEP-1-input-inner'));
  await waitAndClick(page.getByTestId('search-name-DRPINVCN-DEP-1-option-TRACK_ID-text'));
  await waitAndClick(page.getByTestId('search-operator-DRPINVCN-TRACK_ID-1-input-inner'));
  await waitAndClick(page.getByTestId('search-operator-DRPINVCN-DEP-1-option-contain-text'));
  await waitAndClick(page.getByTestId('search-input-DRPINVCN-TRACK_ID-1-value1'));
  await page.getByTestId('search-input-DRPINVCN-TRACK_ID-1-value1').fill('YY');
  await page.getByTestId('search-input-DRPINVCN-TRACK_ID-1-value1').press('Enter');
  await waitAndClick(page.getByTestId('search-form-DRPINVCN-Search-btn'));
//修改剛新增的YY第一冊
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
  await page.waitForTimeout(500);
  // 關閉購買發票作業
  await waitAndClick(page.getByTestId('DRPINVCN-exit2-btn'));
  await page.waitForTimeout(500);

//***************************************刪除YY第一冊  ********************************
  await page.goto('http://192.168.55.117/sunfusionK/erp/#/basic/invcn/list');
//3.檢測進入頁面錯誤  
  //await page.waitForLoadState('networkidle');
  await expect(page.getByRole('dialog', { name: '進入購買發票頁面時錯誤' })).not.toBeVisible();
//先查詢出剛新增的YY第一冊後再刪除
await waitAndClick(page.locator('div').filter({ hasText: /^查詢方案$/ }));
await waitAndClick(page.getByTestId('search-form-DRPINVCN-本期-btn'));
await waitAndClick(page.locator('div').filter({ hasText: /^快速過濾$/ }).first());
await waitAndClick(page.getByTestId('search-name-DRPINVCN-TRACK_ID-1-input-wrapper'));
await waitAndClick(page.getByTestId('search-name-DRPINVCN-DEP-1-option-TRACK_ID-text'));
await waitAndClick(page.getByTestId('search-operator-DRPINVCN-TRACK_ID-1-input-inner'));
await waitAndClick(page.getByTestId('search-operator-DRPINVCN-DEP-1-option-contain-text'));
await waitAndClick(page.getByTestId('search-input-DRPINVCN-TRACK_ID-1-value1'));
await page.getByTestId('search-input-DRPINVCN-TRACK_ID-1-value1').fill('YY');
await page.getByTestId('search-input-DRPINVCN-TRACK_ID-1-value1').press('Enter');
await waitAndClick(page.getByTestId('search-form-DRPINVCN-Search-btn'));

await waitAndClick(page.getByTestId('DRPINVCN-INV_ID-B-checkbox-icon').nth(1));
await waitAndClick(page.getByTestId('DRPINVCN-delete-btn'));
await waitAndClick(page.getByText('提示確定要刪除嗎？取消確定'));
  await waitAndClick(page.getByRole('button', { name: '確定' }));
  await expect(page.getByText('刪除成功')).toBeVisible();
  await page.waitForTimeout(500);
  // 關閉購買發票作業
  await waitAndClick(page.getByTestId('DRPINVCN-exit2-btn'));
  await page.waitForTimeout(500);


//***************************************再重新新增YY第一冊與速設第二、三冊 ********************************
  await page.goto('http://192.168.55.117/sunfusionK/erp/#/basic/invcn/list');
//3.檢測進入頁面錯誤  
  //await page.waitForLoadState('networkidle');
  await expect(page.getByRole('dialog', { name: '進入購買發票頁面時錯誤' })).not.toBeVisible();
  //新增本期39電子發票-YY-第一冊
  await waitAndClick(page.getByTestId('DRPINVCN-add-btn'));
  await waitAndClick(page.getByTestId('DRPINVCN-radio-button-1'));
  await waitAndClick(page.getByTestId('DRPINVCN-H-YYMM'));
  await page.getByTestId('DRPINVCN-H-YYMM').press('Enter');
  await waitAndClick(page.getByTestId('DRPINVCN-H-INV_ID-input-inner'));
  await waitAndClick(page.getByTestId('DRPINVCN-H-INV_ID-option-7'));
  await page.getByTestId('DRPINVCN-H-INV_ID-input-inner').press('Enter');
  await page.getByTestId('DRPINVCN-H-TRACK_ID').fill('YY');
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
  await page.getByTestId('dialog-DRPINVCN-H-TRACK_ID').fill('YY');
  await page.getByTestId('dialog-DRPINVCN-H-TRACK_ID').press('Enter');
  await waitAndClick(page.getByTestId('dialog-DRPINVCN-H-MATH_NO'));
  await page.getByTestId('dialog-DRPINVCN-H-MATH_NO').fill('A02');
  await page.getByTestId('dialog-DRPINVCN-H-MATH_NO').press('Enter');
  await waitAndClick(page.getByTestId('dialog-DRPINVCN-H-BOOK_CNT'));
  await page.getByTestId('dialog-DRPINVCN-H-BOOK_CNT').fill('2');
  await waitAndClick(page.getByTestId('dialog-DRPINVCN-H-F_SEQ_NO'));
  await page.getByTestId('dialog-DRPINVCN-H-F_SEQ_NO').fill('00000050');
  await page.getByTestId('dialog-DRPINVCN-H-F_SEQ_NO').press('Enter');
  await waitAndClick(page.locator('footer').getByRole('button', { name: '確定' }));
//速設確定後視窗即關閉(無提示視窗),回購買發票查詢畫面,再關閉"購買發票查詢"分頁
  await page.waitForTimeout(500);
  // 關閉"購買發票查詢"分頁
  await waitAndClick(page.getByTestId('DRPINVCN-exit2-btn'));
  await page.waitForTimeout(500);


});
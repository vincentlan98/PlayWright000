import { test, expect } from '@playwright/test';
import { dataStorage } from '@playwright/test-utils/dataStorage';


//1.設定wait和click時的等待時間,執行時取用,節省重複程式碼,減少因系統執行逾時出現錯誤訊息而失敗
async function waitAndClick(locator: any, timeout = 30000) {
  await locator.waitFor({ state: 'visible', timeout });
  await locator.click();
}
//SANOB01->SANOB01_INVNO新增&修改&作廢&刪除---20260120版

test('SA393-受訂單01-轉入銷貨單01-INV001', async ({ page }) => {
  try {
//2.設定變量:a. 單號 b. 今天日期-TODAY_NOW c. 發票期別 - invymstr
    let SONO001 = '';
    let SANO001 = '';
    let SANO001_INVNO = '';
    let TODAY = new Date();
    let YYYY = TODAY.getFullYear().toString().slice(-4);
    let MM = (TODAY.getMonth() + 1).toString().padStart(2, '0');
    let DD = TODAY.getDate().toString().padStart(2, '0');
    let TODAY_NOW: string;
    TODAY_NOW = `${YYYY}-${MM}-${DD}`;
    let invmm:number=parseInt(MM)%2===0?parseInt(MM):parseInt(MM)+1;
    let invymstr:string=invmm<10?`${YYYY}0${invmm.toString()}`:`${YYYY}${invmm.toString()}`;  
//****************************************************新增受訂單001***********************************************
  await page.goto('#/inv/invso');
//3.檢測進入頁面錯誤  
  await page.waitForLoadState('networkidle');
  await expect(page.getByRole('dialog', { name: '進入受訂單頁面時錯誤' })).not.toBeVisible();
  //表頭欄位填寫&檢測含搜尋欄位(關閉搜尋視窗)
  await page.getByTestId('DRPSO-add-btn').click();
  await page.getByTestId('DRPSO-H-OS_DD').click();
  await page.getByTestId('DRPSO-H-OS_DD-icon-svg').click();
  await page.getByTestId('DRPSO-H-OS_DD').press('Enter');
  await page.getByTestId('DRPSO-H-OS_NO').press('Enter');
  await page.getByTestId('DRPSO-H-BIL_TYPE-icon-svg').click();
  //await page.getByTestId('dialog-DRPSO-關閉-btn').click();
  await page.getByTestId('BIL_TYPE_SA-resize').getByRole('button', { name: '關閉' }).click();
  await page.getByTestId('DRPSO-H-CAS_NO').click();
  await page.getByTestId('DRPSO-H-CAS_NO-icon-svg').click();
  await page.getByTestId('dialog-DRPSO-關閉-btn').click();
  await page.getByTestId('DRPSO-H-CUS_NO').click();
  await page.getByTestId('DRPSO-H-CUS_NO-icon-svg').click();
  await page.getByTestId('dialog-search-input-DRPSO-CUS_NO-1-value1').click();
  await page.getByTestId('dialog-search-input-DRPSO-CUS_NO-1-value1').fill('BTOB');
  await page.getByTestId('dialog-search-input-DRPSO-CUS_NO-1-value1').press('Enter');
  await page.getByTestId('CUST_KH-resize').getByTestId('dialog-DRPSO-Search-btn').click();
  await page.getByTestId('DRPSO-gridOptions-B-column_0-row_0-btn').click();
  await page.getByTestId('DRPSO-H-CUS_NO').press('Enter');
  await page.getByTestId('DRPSO-H-QT_NO-icon').click();
  await page.getByTestId('DRPSO-H-QT_NO-QC').click();
  await page.locator('.vxe-icon-close').first().click();
  await page.getByTestId('DRPSO-H-SAL_NO').click();
  await page.getByTestId('DRPSO-H-SAL_NO-icon-svg').click();
  await page.getByTestId('MF_YG-resize').getByTestId('DRPSO-gridOptions-B-column_0-row_0-btn').click();
  await page.getByTestId('DRPSO-H-SAL_NO').press('Enter');
  await page.getByTestId('DRPSO-H-PO_DEP').click();
  await page.getByTestId('DRPSO-H-PO_DEP-icon-svg').click();
  await page.getByTestId('DEPT-resize').getByTestId('DRPSO-gridOptions-B-column_0-row_0-btn').click();
  await page.getByTestId('DRPSO-H-PO_DEP').press('Enter');
  await page.getByTestId('DRPSO-H-CUR_ID-icon-svg').click();
  await page.getByTestId('DRPSO-幣別設定-dialog').locator('header').click();
  await page.getByTestId('dialog-DRPSO-CUR_ID').click();
  await page.getByTestId('dialog-DRPSO-CUR_ID-icon-svg').click();
  await page.getByTestId('CUR_ID-resize').getByTestId('dialog-DRPSO-關閉-btn').click();
  await page.getByTestId('dialog-DRPSO-確定-btn').click();
  await page.getByTestId('DRPSO-H-TAX_ID-input-inner').click();
  await page.getByTestId('DRPSO-H-TAX_ID-option-3-text').click();
  await page.getByTestId('DRPSO-H-TAX_ID-input-inner').press('Enter');
  await page.getByTestId('DRPSO-H-ZHANG_ID-input-inner').click();
  await page.getByTestId('DRPSO-H-ZHANG_ID-option-1').click();
  await page.getByTestId('DRPSO-H-ZHANG_ID-input-inner').press('Enter');
  await page.getByTestId('DRPSO-H-EST_DD').click();
  await page.getByTestId('DRPSO-H-EST_DD-icon-svg').click();
  await page.getByTestId('DRPSO-H-EST_DD').press('Enter');
  await page.getByTestId('DRPSO-H-FILE_LIST-icon-svg').click();
  await page.getByTestId('dialog-DRPSO-確定-btn').click();
  await page.getByTestId('DRPSO-invso_tab1').getByTestId('DRPSO-H-REM').click();
  await page.getByTestId('DRPSO-invso_tab1').getByTestId('DRPSO-H-REM').fill('簡繁體測試-帳目、變更、報表、日曆');
  await page.getByTestId('DRPSO-invso_tab1').getByTestId('DRPSO-H-REM').press('Enter');
  await page.getByTestId('DRPSO-invso_tab2').getByTestId('DRPSO-radio-button-1').click();
    // 等待後端處理與畫面更新
    await page.waitForLoadState('networkidle');
//4.表頭重要欄位檢測-客戶名稱、備註顯示簡繁字體
    await expect(page.getByTestId('DRPSO-H-CUS_NO')).toHaveValue('B2B 有限公司', { timeout: 15000 });
    await expect(page.getByTestId('DRPSO-invso_tab1').getByTestId('DRPSO-H-REM')).toHaveValue('簡繁體測試-帳目、變更、報表、日曆', { timeout: 15000 });
    // 有些元素不是 input，改用包含或文本檢查
    await expect(page.getByTestId('DRPSO-H-TAX_ID-input-inner')).toHaveValue('3.應稅外加', { timeout: 15000 });
    await expect(page.getByTestId('DRPSO-H-ZHANG_ID-input-inner')).toHaveValue('1.單張立帳', { timeout: 15000 });

  await page.waitForLoadState('networkidle');
  // ******進入表身之前,需先點擊表身第一欄的某個欄位
  await page.locator('div').filter({ hasText: /^1$/ }).nth(2).click();
  await page.getByTestId('DRPSO-TF_POS-B-PRD_NO-row_0-input').click();
  await page.getByTestId('DRPSO-TF_POS-B-PRD_NO-row_0-suffix-icon-svg').click();
  await page.getByTestId('DRPSO-gridOptions-B-column_0-row_0-checkbox-icon').click();
  await page.getByTestId('DRPSO-gridOptions-B-column_0-row_1-checkbox-icon').click();
  await page.getByTestId('DRPSO-gridOptions-B-column_0-row_2-checkbox-icon').click();
  await page.getByTestId('dialog-DRPSO-確定-btn').click();
  await page.getByTestId('DRPSO-TF_POS-B-PRD_NO-row_0-input').press('Enter');
  await page.getByTestId('DRPSO-TF_POS-B-WH-row_0-input').click();
  await page.getByTestId('DRPSO-TF_POS-B-WH-row_0-suffix-icon-svg').click();
  await page.getByTestId('MY_WH-resize').getByTestId('DRPSO-gridOptions-B-column_0-row_4-btn').click();
  await page.getByTestId('DRPSO-TF_POS-B-WH-row_0-input').press('Enter');
  await page.getByTestId('DRPSO-TF_POS-B-QTY-row_0-input').click();
  await page.getByTestId('DRPSO-TF_POS-B-QTY-row_0-input-wrapper').click();
  await page.getByTestId('DRPSO-TF_POS-B-QTY-row_0-input').click();
  await page.getByTestId('DRPSO-TF_POS-B-QTY-row_0-input').fill('100.00');
  await page.getByTestId('DRPSO-TF_POS-B-QTY-row_0-input').press('Enter');
  await page.getByTestId('DRPSO-TF_POS-B-UP-row_0-input').fill('10,000.00');
  await page.getByTestId('DRPSO-TF_POS-B-UP-row_0-input').press('Enter');
  //第一列增加輸入測試欄位-摘要(簡繁體測試)、批號、單位、包裝單位
await page.getByTestId('DRPSO-TF_POS-B-REM-row_0-cell-wrapper').click();
await page.getByTestId('DRPSO-TF_POS-B-REM-row_0-input').click();
await page.getByTestId('DRPSO-TF_POS-B-REM-row_0-input').fill('簡繁體測試-帳目、變更、報表、日曆');
await page.getByTestId('DRPSO-TF_POS-B-REM-row_0-input').press('Enter');
await page.getByTestId('DRPSO-TF_POS-B-BAT_NO-row_0-cell-wrapper').click();
await page.getByTestId('DRPSO-TF_POS-B-BAT_NO-row_0-suffix-icon-svg').click();
//await page.getByTestId('dialog-DRPSO-關閉-btn').click();
await page.getByTestId('BAT_NO-resize').getByRole('button', { name: '關閉' }).click();
await page.getByTestId('DRPSO-TF_POS-B-BAT_NO-row_0-input').click();
await page.getByTestId('DRPSO-TF_POS-B-BAT_NO-row_0-input').fill('20260120');
await page.getByTestId('DRPSO-TF_POS-B-BAT_NO-row_0-input').press('Enter');
await page.getByTestId('DRPSO-TF_POS-B-UNIT-row_0-input-wrapper').click();
await page.getByTestId('DRPSO-TF_POS-B-UNIT-row_0-icon-svg').click();
//await page.getByTestId('DRPSO-TF_POS-B-UNIT-row_1-cell-wrapper').click();
await page.getByTestId('DRPSO-TF_POS-B-PAK_UNIT-row_0').click();
await page.getByTestId('DRPSO-TF_POS-B-PAK_UNIT-row_0-input').click();
await page.getByTestId('DRPSO-TF_POS-B-PAK_UNIT-row_0-input').fill('箱');
await page.getByTestId('DRPSO-TF_POS-B-PAK_UNIT-row_0-input').press('Enter');
    // 等待後端處理與畫面更新
await page.waitForLoadState('networkidle');
//4-2.表身第一列重要欄位檢測-摘要顯示簡繁字體
//await page.getByTestId('DRPSO-TF_POS-B-REM-row_0').click();
//await page.getByTestId('DRPSO-TF_POS-B-REM-row_0-input').click();
//await page.getByTestId('DRPSO-TF_POS-B-REM-row_0-cell').click();
    await expect(page.getByTestId('DRPSO-TF_POS-B-REM-row_0-input')).toHaveValue('簡繁體測試-帳目、變更、報表、日曆', { timeout: 15000 });
    await expect(page.getByTestId('DRPSO-TF_POS-B-BAT_NO-row_0-input')).toHaveValue('20260120', { timeout: 15000 });
    await expect(page.getByTestId('DRPSO-TF_POS-B-UNIT-row_0-input')).toHaveValue('台', { timeout: 15000 });
    await expect(page.getByTestId('DRPSO-TF_POS-B-PAK_UNIT-row_0-input')).toHaveValue('箱', { timeout: 15000 });

//第二列增加輸入-先訂位置
  await page.locator('div').filter({ hasText: /^2$/ }).first().click();
  await page.getByTestId('DRPSO-TF_POS-B-WH-row_1-cell').click();
  await page.getByTestId('DRPSO-TF_POS-B-WH-row_1-suffix-icon-svg').click();
  await page.getByTestId('MY_WH-resize').getByTestId('DRPSO-gridOptions-B-column_0-row_4-btn').click();
  await page.getByTestId('DRPSO-TF_POS-B-WH-row_1-input').press('Enter');
  await page.getByTestId('DRPSO-TF_POS-B-QTY-row_1-input').click();
  await page.getByTestId('DRPSO-TF_POS-B-QTY-row_1-input').fill('100.00');
  await page.getByTestId('DRPSO-TF_POS-B-QTY-row_1-input').press('Enter');
  await page.getByTestId('DRPSO-TF_POS-B-UP-row_1-cell-wrapper').click();
  await page.getByTestId('DRPSO-TF_POS-B-UP-row_1-input').fill('15,000.00');
  await page.getByTestId('DRPSO-TF_POS-B-UP-row_1-input').press('Enter');
  await page.locator('div').filter({ hasText: /^3$/ }).first().click();
  await page.getByTestId('DRPSO-TF_POS-B-WH-row_2-cell').click();
  await page.getByTestId('DRPSO-TF_POS-B-WH-row_2-suffix-icon-svg').click();
  await page.getByTestId('MY_WH-resize').getByTestId('DRPSO-gridOptions-B-column_0-row_4-btn').click();
  await page.getByTestId('DRPSO-TF_POS-B-WH-row_2-input').press('Enter');
  await page.getByTestId('DRPSO-TF_POS-B-QTY-row_2-input').click();
  await page.getByTestId('DRPSO-TF_POS-B-QTY-row_2-input').fill('100.00');
  await page.getByTestId('DRPSO-TF_POS-B-QTY-row_2-input').press('Enter');
  await page.getByTestId('DRPSO-TF_POS-B-UP-row_2-input').fill('20,000.00');
  await page.getByTestId('DRPSO-TF_POS-B-UP-row_2-input').press('Enter');
  await page.getByTestId('DRPSO-save-btn').click();

  await page.waitForLoadState('networkidle');
  // 等待成功訊息出現再導航
  await expect(page.getByText('存檔成功')).toBeVisible({ timeout: 30000 });
  SONO001 = await page.getByTestId('DRPSO-H-OS_NO').inputValue();  // 儲存單號到SONO001
  if (!SONO001) throw new Error('Failed to get SONO001');
  dataStorage.setValue('SONO001', SONO001); // 存到dataStorage以便其他測試案例使用
  await page.waitForLoadState('networkidle');

  // 離開受訂單單頁面
  await page.getByTestId('DRPSO-exit2-btn').click();


  //********************************************************修改受訂單001***********************************************
  await page.goto(`#/inv/invso/${SONO001}`);
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1000);
  await expect(page.getByRole('dialog', { name: '錯誤' }), '檢測進入受訂單頁面沒有報錯').not.toBeVisible();
await page.getByTestId('DRPSO-invso_tab2').getByTestId('DRPSO-radio-button-1').click();
await page.locator('div').filter({ hasText: /^2$/ }).nth(2).click();
await page.getByTestId('DRPSO-TF_POS-B-TABLE_ID-row_1-add-icon-svg').click();
await page.getByTestId('DRPSO-TF_POS-B-PRD_NO-row_1-input').click();
await page.getByTestId('DRPSO-TF_POS-B-PRD_NO-row_1-suffix-icon-svg').click();
await page.getByTestId('DRPSO-gridOptions-B-column_0-row_3-checkbox-icon').click();
await page.getByTestId('dialog-DRPSO-確定-btn').click();
await page.getByTestId('DRPSO-TF_POS-B-PRD_NO-row_1-input').press('Enter');
await page.getByTestId('DRPSO-TF_POS-B-WH-row_1-input').click();
await page.getByTestId('DRPSO-TF_POS-B-WH-row_1-suffix-icon-svg').click();
await page.getByTestId('DRPSO-gridOptions-B-column_0-row_4-btn').click();
await page.getByTestId('DRPSO-TF_POS-B-WH-row_2-input').press('Enter');
await page.getByTestId('DRPSO-TF_POS-B-QTY-row_1-cell-wrapper').click();
await page.getByTestId('DRPSO-TF_POS-B-QTY-row_1-cell-wrapper').click();
await page.getByTestId('DRPSO-TF_POS-B-QTY-row_1-input').fill('100.00');
await page.getByTestId('DRPSO-TF_POS-B-QTY-row_1-input').press('Enter');
await page.getByTestId('DRPSO-TF_POS-B-UP-row_1-input').fill('25,000.00');
await page.getByTestId('DRPSO-TF_POS-B-UP-row_1-input').press('Enter');
await page.getByTestId('DRPSO-save-btn').click();














  await page.waitForLoadState('networkidle');
  // 離開受訂單頁面
  await page.getByTestId('DRPSO-exit2-btn').click();


   }
     catch (err) {
    // 截圖與頁面內容以便診斷
    try {
       await page.screenshot({ path: `error-PA213-${Date.now()}.png`, fullPage: true }); 
      } catch(e) {}
    console.error('Test failed - saved screenshot (if possible).', err);
    throw err;
  }

});
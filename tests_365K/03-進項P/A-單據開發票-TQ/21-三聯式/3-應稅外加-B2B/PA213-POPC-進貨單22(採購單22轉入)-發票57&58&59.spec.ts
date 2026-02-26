import { test, expect } from '@playwright/test';
import { dataStorage } from '@playwright/test-utils/dataStorage';

//const BASE = 'http://localhost/sunfusion';
//設定wait和click時的等待時間,執行時取用,節省重複程式碼,減少因系統執行逾時出現錯誤訊息而失敗
async function waitAndClick(locator: any, timeout = 15000) {
  await locator.waitFor({ state: 'visible', timeout });
  await locator.click();
}
//PO22PC22->INVNOTQ57&58&59新增修改刪除---20260130K版
//20260206K版 186行等待成功訊息出現再導航-加長等待時間await page.waitForTimeout(5000);
//20260130K版-1.取消按"新增"步驟 2.欄位開啟時間延長 3.轉入單號後再選表頭業務員與部門,各改為選取第1列 4.存檔成功後等待時間延長(->15秒) 5.刪除成功後等待時間延長(->30秒)


//test.use({ storageState: 'playwright/.auth/user.json' }); //使用已登入狀態

test('POPC進貨單22採購單22轉入-發票TQ57&58&59新增修改刪除', async ({ page }) => {
  try {
// 設定檢測發票時用日期變量--->當日
    let TODAY = new Date();
    let YYYY = TODAY.getFullYear().toString().slice(-4);
    let MM = (TODAY.getMonth() + 1).toString().padStart(2, '0');
    let DD = TODAY.getDate().toString().padStart(2, '0');
    let TODAY_NOW: string;
    TODAY_NOW = `${YYYY}-${MM}-${DD}`;
    let PONO22 = '';
    let PCNO22 = '';

//****************************************************新增採購單******************************************************************/
    await page.goto(`#/inv/invpo`);
//3.檢測進入頁面錯誤  
    await page.waitForLoadState('networkidle');
    await expect(page.getByRole('dialog', { name: '進入採購單時錯誤' })).not.toBeVisible();
    await page.waitForLoadState('networkidle');

    //await waitAndClick(page.getByTestId('DRPPO-add-btn'));  //取消新增按鈕
    await page.getByTestId('DRPPO-H-OS_DD').press('Enter');
    await page.getByTestId('DRPPO-H-OS_NO').press('Enter');

    // 選客戶
    await waitAndClick(page.getByTestId('DRPPO-H-CUS_NO'));
    await waitAndClick(page.getByTestId('DRPPO-H-CUS_NO-icon-svg'));
    // 等待後端處理與畫面更新
    await page.waitForLoadState('networkidle');
    await page.getByTestId('dialog-search-input-DRPPO-CUS_NO-1-value1').waitFor({ state: 'visible', timeout: 30000 });
    // 等待後端處理與畫面更新
    await page.waitForLoadState('networkidle');
    await page.getByTestId('dialog-search-input-DRPPO-CUS_NO-1-value1').fill('BtoB');
    // 等待後端處理與畫面更新
    await page.waitForLoadState('networkidle');
    await page.getByTestId('dialog-search-input-DRPPO-CUS_NO-1-value1').press('Enter');
    // 等待後端處理與畫面更新
    await page.waitForLoadState('networkidle');
    await waitAndClick(page.getByTestId('dialog-DRPPO-Search-btn'));
    await page.waitForLoadState('networkidle');
    await waitAndClick(page.getByTestId('DRPPO-gridOptions-B-column_0-row_0-btn'));
    // 等待後端處理與畫面更新
    await page.waitForLoadState('networkidle');
    await page.getByTestId('DRPPO-H-CUS_NO').press('Enter');
    // 等待後端處理與畫面更新
    await page.waitForLoadState('networkidle');
    // 表頭重要欄位檢測
    await expect(page.getByTestId('DRPPO-H-CUS_NO')).toHaveValue('B2B 有限公司', { timeout: 15000 });

    // 有些元素不是 input，改用包含或文本檢查
    await expect(page.getByTestId('DRPPO-H-TAX_ID-input-inner')).toHaveValue('3.應稅外加', { timeout: 15000 });
    await expect(page.getByTestId('DRPPO-H-ZHANG_ID-input-inner')).toHaveValue('1.單張立帳', { timeout: 15000 });
    // 業務/部門/備註等
    await waitAndClick(page.getByTestId('DRPPO-H-SAL_NO'));
    await waitAndClick(page.getByTestId('DRPPO-H-SAL_NO-icon-svg'));
    await waitAndClick(page.getByTestId('MF_YG-resize').getByTestId('DRPPO-gridOptions-B-column_0-row_0-btn'));
    await page.getByTestId('DRPPO-H-SAL_NO').press('Enter');
    await page.waitForLoadState('networkidle');
    await waitAndClick(page.getByTestId('DRPPO-H-PO_DEP'));
    await waitAndClick(page.getByTestId('DRPPO-H-PO_DEP-icon-svg'));

    //部門選擇第十列-20260130K版
    await waitAndClick(page.getByTestId('DEPT-resize').getByTestId('DRPPO-gridOptions-B-column_0-row_9-cell-wrapper'));
    await page.waitForLoadState('networkidle');
    await waitAndClick(page.getByTestId('DRPPO-invsa_tab1').getByTestId('DRPPO-H-REM'));
    await page.getByTestId('DRPPO-invsa_tab1').getByTestId('DRPPO-H-REM').fill('PlayWright-進項-單據開發票TQ-三聯式-應稅外加-B2B-進貨單由採購單轉入');
    await page.getByTestId('DRPPO-invsa_tab1').getByTestId('DRPPO-H-REM').press('Enter');
    await page.waitForLoadState('networkidle');
    // 進入表身之前,需先點擊表身第一欄的某個欄位
    await waitAndClick(page.getByTestId('DRPPO-TF_POS-B-SPC-row_0-cell-wrapper'));
    await page.waitForLoadState('networkidle');
    await waitAndClick(page.getByTestId('DRPPO-TF_POS-B-PRD_NO-row_0-cell-wrapper'));
    await waitAndClick(page.getByTestId('DRPPO-TF_POS-B-PRD_NO-row_0-suffix-icon-svg'));
    await waitAndClick(page.getByTestId('DRPPO-gridOptions-B-column_0-row_0-checkbox-icon'));
    await waitAndClick(page.getByTestId('dialog-DRPPO-確定-btn'));
    await page.waitForLoadState('networkidle');
    await page.getByTestId('DRPPO-TF_POS-B-PRD_NO-row_0-input').press('Enter');
    await page.waitForLoadState('networkidle');
    await waitAndClick(page.getByTestId('DRPPO-TF_POS-B-WH-row_0-input'));
    await waitAndClick(page.getByTestId('DRPPO-TF_POS-B-WH-row_0-suffix-icon-svg'));
    await waitAndClick(page.getByTestId('MY_WH-resize').getByTestId('DRPPO-gridOptions-B-column_0-row_4-btn'));
    await page.getByTestId('DRPPO-TF_POS-B-WH-row_0-input').press('Enter');
    await page.waitForLoadState('networkidle');
// 數量
    await page.getByTestId('DRPPO-TF_POS-B-QTY-row_0-input').click();
    await page.getByTestId('DRPPO-TF_POS-B-QTY-row_0-input').fill('1481333.00');
    await page.getByTestId('DRPPO-TF_POS-B-QTY-row_0-input').press('Enter');
    await page.waitForLoadState('networkidle');
// 單價
    await page.getByTestId('DRPPO-TF_POS-B-UP-row_0-input').click();
    await page.getByTestId('DRPPO-TF_POS-B-UP-row_0-input').fill('0.60');
    await page.getByTestId('DRPPO-TF_POS-B-UP-row_0-input').press('Enter');
    await page.waitForLoadState('networkidle');
    // 檢查總金額
    await expect(page.getByTestId('DRPPO-H-AMTN_WITHTAX_H')).toHaveValue('933,240', { timeout: 15000 });
    await page.waitForLoadState('networkidle');
    // 儲存採購單
    await waitAndClick(page.getByTestId('DRPPO-save-btn'));
    // 等待成功訊息出現再導航
    await page.waitForLoadState('networkidle');
    await expect(page.getByText('存檔成功')).toBeVisible({ timeout: 30000 });
    await page.waitForLoadState('networkidle');
    // 儲存單號到PONO22,存到dataStorage以便其他測試案例使用
    PONO22 = await page.getByTestId('DRPPO-H-OS_NO').inputValue(); 
    if (!PONO22) throw new Error('Failed to get PONO22');
    dataStorage.setValue('PONO22', PONO22); 
    await page.waitForTimeout(5000);
    
      // 離開採購單頁面
    await waitAndClick(page.getByTestId('DRPPO-exit2-btn'));
    await page.waitForLoadState('networkidle');
        
    //***************************************新增進貨單-由採購單PONO22轉入*******************************************************
    await page.goto(`#/inv/invpc`);
    await page.waitForLoadState('networkidle');
    await expect(page.getByRole('dialog', { name: '進入進貨單時錯誤' })).not.toBeVisible();
    //await waitAndClick(page.getByTestId('DRPPC-add-btn'));  //取消新增按鈕
    // 避免 press('Enter') 立即導致狀態改變，改用 Tab 或其他方式
    //const psDD = page.getByTestId('DRPPC-H-PS_DD');
    //await psDD.waitFor({ state: 'visible', timeout: 15000 });
    //await psDD.press('Enter');
    //await page.waitForLoadState('networkidle');
    //const psNo = page.getByTestId('DRPPC-H-PS_NO');
    //await psNo.waitFor({ state: 'visible', timeout: 15000 });
    //await psNo.press('Enter');
    //await page.waitForLoadState('networkidle');
    //await waitAndClick(page.getByTestId('DRPPO-add-btn'));  //取消新增按鈕
    await page.getByTestId('DRPPC-H-PS_DD').press('Enter');
    await page.getByTestId('DRPPC-H-PS_NO').press('Enter');
    // 由採購單轉入
    await waitAndClick(page.getByTestId('DRPPC-H-OS_NO'));
    await page.waitForLoadState('networkidle');
    await waitAndClick(page.getByTestId('DRPPC-H-OS_NO-icon'));
    await page.waitForLoadState('networkidle');    
    await waitAndClick(page.getByTestId('DRPPC-H-OS_NO-PO'));
    await page.waitForLoadState('networkidle');    
    await page.getByTestId('dialog-search-input-DRPPC-OS_NO-1-value1').waitFor({ state: 'visible', timeout: 15000 });
    await page.getByTestId('dialog-search-input-DRPPC-OS_NO-1-value1').fill(PONO22);
    await page.waitForLoadState('networkidle');    
    await waitAndClick(page.getByTestId('dialog-DRPPC-Search-btn'));
    await page.waitForLoadState('networkidle');

    await waitAndClick(page.getByTestId('DRPPC-UNKNOWN_TABLE-B-column_0-row_0-checkbox-icon'));
    await page.waitForLoadState('networkidle');
    
    await waitAndClick(page.getByTestId('DRPPC-UNKNOWN_TABLE-B-column_0-row_0-checkbox-icon'));
    await page.waitForLoadState('networkidle');
    
    await waitAndClick(page.getByTestId('dialog-DRPPC-確定-btn'));
    await page.waitForLoadState('networkidle');

    //await waitAndClick(page.getByTestId('DRPPC-save-btn'));
    //await page.waitForLoadState('networkidle');

    await waitAndClick(page.getByTestId('DRPPC-H-SAL_NO'));
    await page.waitForLoadState('networkidle');
    
    await waitAndClick(page.getByTestId('DRPPC-H-SAL_NO-icon-svg'));
    await page.waitForLoadState('networkidle');
    
    await waitAndClick(page.getByTestId('DRPPC-gridOptions-B-column_0-row_0-btn'));
    await page.waitForLoadState('networkidle');
    
    const salNo = page.getByTestId('DRPPC-H-SAL_NO');
    await salNo.waitFor({ state: 'visible', timeout: 15000 });
    await salNo.press('Enter');
    await page.waitForLoadState('networkidle');

    await waitAndClick(page.getByTestId('DRPPC-H-DEP'));
    await page.waitForLoadState('networkidle');
    
    await waitAndClick(page.getByTestId('DRPPC-H-DEP-icon-svg'));
    await page.waitForLoadState('networkidle');
    
    await waitAndClick(page.getByTestId('DEPT-resize').getByTestId('DRPPC-gridOptions-B-column_0-row_0-btn'));
    await page.waitForLoadState('networkidle');
    
    const dep = page.getByTestId('DRPPC-H-DEP');
    await dep.waitFor({ state: 'visible', timeout: 15000 });
    await dep.press('Tab');
    await page.waitForLoadState('networkidle');

    await waitAndClick(page.getByTestId('DRPPC-save-btn'));
    
    // 等待成功訊息出現再導航---20260206K版-加長等待時間await page.waitForTimeout(5000);
    await expect(page.getByText('存檔成功')).toBeVisible({ timeout: 30000 });
    //await expect(page.getByText('存檔成功')).toBeVisible({ timeout: 15000 });
    // 儲存單號到PONO22,存到dataStorage以便其他測試案例使用
    PCNO22 = await page.getByTestId('DRPPC-H-PS_NO').inputValue(); 
    if (!PCNO22) throw new Error('Failed to get PCNO22');
    dataStorage.setValue('PCNO22', PCNO22); 
    await page.waitForTimeout(5000);
    //await page.waitForLoadState('networkidle');
  // 離開進貨單頁面
    await waitAndClick(page.getByTestId('DRPPC-exit2-btn'));
    await page.waitForLoadState('networkidle');


//************************************************刪除進貨單PCNO22*****************************************************
  await page.goto(`#/inv/invpc/${PCNO22}`);
  await page.waitForLoadState('networkidle');
  await expect(page.getByRole('dialog', { name: '錯誤' }), '檢測進入"進貨單"頁面沒有報錯').not.toBeVisible();
  await waitAndClick(page.getByTestId('DRPPC-tabset').getByTestId('DRPPC-radio-button-1'));
  await waitAndClick(page.getByTestId('DRPPC-delete-btn'));
  await waitAndClick(page.locator('div').filter({ hasText: '提示' }).nth(3));
  await waitAndClick(page.getByRole('button', { name: '確定' }));
  await expect(page.getByText('刪除成功')).toBeVisible({ timeout: 100000 });  
  await page.waitForTimeout(3000);
  await page.waitForLoadState('networkidle');
  // 離開進貨單頁面
  await waitAndClick(page.getByTestId('DRPPC-exit2-btn'));
  await page.waitForLoadState('networkidle');


//************************************************刪除採購單PONO22*****************************************************
  await page.goto(`#/inv/invpo/${PONO22}`);
  await page.waitForLoadState('networkidle');
  await expect(page.getByRole('dialog', { name: '錯誤' }), '檢測進入"採購單"頁面沒有報錯').not.toBeVisible();
  await waitAndClick(page.getByTestId('DRPPO-tabset').getByTestId('DRPPO-radio-button-1'));
  await waitAndClick(page.getByTestId('DRPPO-delete-btn'));
  await waitAndClick(page.locator('div').filter({ hasText: '提示' }).nth(3));
  await waitAndClick(page.getByRole('button', { name: '確定' }));
  await expect(page.getByText('刪除成功')).toBeVisible({ timeout: 100000 });  
  await page.waitForTimeout(3000);
  await page.waitForLoadState('networkidle');
  // 離開採購單頁面
  await waitAndClick(page.getByTestId('DRPPO-exit2-btn'));
  await page.waitForLoadState('networkidle');

  } catch (err) {
    try { 
      // 檢查 page 是否仍然有效
      if (page && !page.isClosed?.()) {
        await page.screenshot({ path: `error-POPC-${Date.now()}.png`, fullPage: true }); 
      } else {
        console.error('Page already closed, cannot take screenshot');
      }
    } catch(e) {
      console.error('Screenshot or page check failed:', e);
    }
    console.error('Test failed', err);
    throw err;
  }
});
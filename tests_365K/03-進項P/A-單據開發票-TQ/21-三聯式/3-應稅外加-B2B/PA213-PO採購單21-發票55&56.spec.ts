import { test, expect } from '@playwright/test';
import { dataStorage } from '@playwright/test-utils/dataStorage';

//const BASE = 'http://localhost/sunfusion';
//設定wait和click時的等待時間,執行時取用,節省重複程式碼,減少因系統執行逾時出現錯誤訊息而失敗

async function waitAndClick(locator: any, timeout = 30000) {
  await locator.waitFor({ state: 'visible', timeout });
  await locator.click();
}
//PONO21->INVNOTQ55&56新增修改刪除---20260130K版
//20260130K版-1.取消按"新增"步驟 2.欄位開啟時間延長 3.表頭部門改為選取第10列 4.因表身單價自動帶出,故輸入數量以單價0.60計算 5.訂金現金帳戶改成選取第一列 6. 進項發票公司名稱須修正為 ATTN Technology Co., Ltd.


test('PO採購單21-發票TQ55&56新增修改刪除', async ({ page }) => {
  try {
    let PONO21 = ''
    let TODAY = new Date();
    let YYYY = TODAY.getFullYear().toString().slice(-4);
    let MM = (TODAY.getMonth() + 1).toString().padStart(2, '0');
    let DD = TODAY.getDate().toString().padStart(2, '0');
    let TODAY_NOW: string;
    TODAY_NOW = `${YYYY}-${MM}-${DD}`;
    let invmm:number=parseInt(MM)%2===0?parseInt(MM):parseInt(MM)+1;
    let invymstr:string=invmm<10?`${YYYY}0${invmm.toString()}`:`${YYYY}${invmm.toString()}`;

//****************************************************新增採購單******************************************************************/
    await page.goto(`#/inv/invpo`);
//3.檢測進入頁面錯誤  
    await page.waitForLoadState('networkidle');
    await expect(page.getByRole('dialog', { name: '進入進貨單時錯誤' })).not.toBeVisible();

    //await waitAndClick(page.getByTestId('DRPPO-add-btn')); //取消按"新增"步驟
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
    // 等待後端處理與畫面更新
    await page.waitForLoadState('networkidle');
    await waitAndClick(page.getByTestId('DRPPO-gridOptions-B-column_0-row_0-btn'));
    // 等待後端處理與畫面更新
    await page.waitForLoadState('networkidle');
    await page.getByTestId('DRPPO-H-CUS_NO').press('Enter');

    // 等待後端處理與畫面更新
    await page.waitForLoadState('networkidle');

//3.1 表頭重要欄位檢測
    await expect(page.getByTestId('DRPPO-H-CUS_NO')).toHaveValue('B2B 有限公司', { timeout: 100000 }); //20260213 
//3.2 檢測客戶扣稅類別與立帳方式 ---有些元素不是 input，改用包含或文本檢查
    await expect(page.getByTestId('DRPPO-H-TAX_ID-input-inner')).toHaveValue('3.應稅外加', { timeout: 15000 });
    await expect(page.getByTestId('DRPPO-H-ZHANG_ID-input-inner')).toHaveValue('1.單張立帳', { timeout: 15000 });

    // 業務/部門/備註等
    await waitAndClick(page.getByTestId('DRPPO-H-SAL_NO'));
    await waitAndClick(page.getByTestId('DRPPO-H-SAL_NO-icon-svg'));
    await waitAndClick(page.getByTestId('MF_YG-resize').getByTestId('DRPPO-gridOptions-B-column_0-row_0-btn'));
    await page.getByTestId('DRPPO-H-SAL_NO').press('Enter');

    await waitAndClick(page.getByTestId('DRPPO-H-PO_DEP'));
    await waitAndClick(page.getByTestId('DRPPO-H-PO_DEP-icon-svg'));
    //部門選擇第十列
    await page.getByTestId('DEPT-resize').getByTestId('DRPPO-gridOptions-B-column_0-row_9-cell-wrapper').click();
    //await waitAndClick(page.getByTestId('DRPPO-gridOptions-B-column_0-row_9-btn'));
    //await page.getByTestId('DRPPO-H-PO_DEP').press('Enter');
    await waitAndClick(page.getByTestId('DRPPO-invsa_tab1').getByTestId('DRPPO-H-REM'));
    await page.getByTestId('DRPPO-invsa_tab1').getByTestId('DRPPO-H-REM').fill('PlayWright-進項-單據開發票TQ-三聯式-應稅外加-採購單');
    await page.getByTestId('DRPPO-invsa_tab1').getByTestId('DRPPO-H-REM').press('Enter');

    // 進入表身並選商品
    await page.waitForLoadState('networkidle');
    // *進入表身之前,需先點擊表身第一欄的某個欄位
    await waitAndClick(page.locator('div').filter({ hasText: /^1$/ }).nth(2));
    await waitAndClick(page.getByTestId('DRPPO-TF_POS-B-SPC-row_0-cell-wrapper'));
    await page.waitForLoadState('networkidle');

    await waitAndClick(page.getByTestId('DRPPO-TF_POS-B-PRD_NO-row_0-cell-wrapper'));
    await waitAndClick(page.getByTestId('DRPPO-TF_POS-B-PRD_NO-row_0-suffix-icon-svg'));
    await waitAndClick(page.getByTestId('DRPPO-gridOptions-B-column_0-row_0-checkbox-icon'));
    await waitAndClick(page.getByTestId('dialog-DRPPO-確定-btn'));

    await page.waitForLoadState('networkidle');
    await page.getByTestId('DRPPO-TF_POS-B-PRD_NO-row_0-input').press('Enter');

    // 倉別
    await waitAndClick(page.getByTestId('DRPPO-TF_POS-B-WH-row_0-input'));
    await waitAndClick(page.getByTestId('DRPPO-TF_POS-B-WH-row_0-suffix-icon-svg'));
    await waitAndClick(page.getByTestId('MY_WH-resize').getByTestId('DRPPO-gridOptions-B-column_0-row_4-btn'));
    await page.getByTestId('DRPPO-TF_POS-B-WH-row_0-input').press('Enter');

    // 數量與單價
    await page.getByTestId('DRPPO-TF_POS-B-QTY-row_0-input').click();
    await page.getByTestId('DRPPO-TF_POS-B-QTY-row_0-input').fill('1481333.00');
    await page.getByTestId('DRPPO-TF_POS-B-QTY-row_0-input').press('Enter');

    await page.getByTestId('DRPPO-TF_POS-B-UP-row_0-input').click();
    // 移除千分符，確保欄位接受
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
  await expect(page.getByText('存檔成功')).toBeVisible({ timeout: 100000 });
    await page.waitForLoadState('networkidle');
  //await expect(page.getByText('存檔成功')).toBeVisible({ timeout: 10000 });
  // 儲存單號到PONO21,存到dataStorage以便其他測試案例使用
  PONO21 = await page.getByTestId('DRPPO-H-OS_NO').inputValue(); 
  if (!PONO21) throw new Error('Failed to get PONO21');
  dataStorage.setValue('PONO21', PONO21); 
  await page.waitForTimeout(10000);

  // 離開採購單頁面
  await waitAndClick(page.getByTestId('DRPPO-exit2-btn'));
    
//***************************************修改採購單-新增訂金與發票TQ055&056*******************************************************
  await page.goto(`#/inv/invpo/${PONO21}`);
//3.檢測進入頁面錯誤  
  await page.waitForLoadState('networkidle');
  await expect(page.getByRole('dialog', { name: '進入進貨單時錯誤' })).not.toBeVisible();
  await page.waitForTimeout(5000);

await waitAndClick(page.getByTestId('DRPPO-radio-button-5'));
await waitAndClick(page.getByRole('tab', { name: '訂金 預付款明細' }));
await waitAndClick(page.getByTestId('DRPPO-invsa_tab6').getByTestId('DRPPO-H-AMTN_BC-input-wrapper'));
await page.getByTestId('DRPPO-invsa_tab6').getByTestId('DRPPO-H-AMTN_BC').fill('100,000');
await page.getByTestId('DRPPO-invsa_tab6').getByTestId('DRPPO-H-AMTN_BC').press('Enter');
    //20260129-"現金帳戶"更改為選取第一列
await waitAndClick(page.getByTestId('DRPPO-invsa_tab6').getByTestId('DRPPO-H-CACC_NO-input-wrapper'));
await waitAndClick(page.getByTestId('DRPPO-invsa_tab6').getByTestId('DRPPO-H-CACC_NO-icon-svg'));
await waitAndClick(page.getByTestId('DRPPO-gridOptions-B-column_0-row_0-cell-wrapper'));
await page.getByTestId('DRPPO-invsa_tab6').getByTestId('DRPPO-H-CACC_NO').press('Enter');
    //含稅訂金1000元
    await waitAndClick(page.getByTestId('DRPPO-H-HS_ID-inner'));
    // 開發票元件操作
    await waitAndClick(page.getByTestId('DRPPO-H-INV_NO-input-wrapper'));
    await waitAndClick(page.getByTestId('DRPPO-H-INV_NO-form-item-inner').getByTestId('DRPPO-...-btn'));
    await waitAndClick(page.getByTestId('dialog-DRPPO-H-INV_ID-icon-svg'));
    await waitAndClick(page.getByTestId('dialog-DRPPO-H-INV_NO'));
    await page.getByTestId('dialog-DRPPO-H-INV_NO').fill('TQ00000056');
    // 用 press 可能會觸發導航或關閉對話框，改為點擊其他可見元素以確保變更被提交
    await page.keyboard.press('Tab');
    await page.waitForTimeout(500); // 微小等待以讓前端處理輸入（短暫）

    // 等待對話框內欄位就緒，再檢查值
    await page.getByTestId('dialog-DRPPO-H-INV_DD').waitFor({ state: 'visible', timeout: 15000 });

    // =====================================驗證發票對話框必填欄位（更長 timeout:15000）
    // 1.發票日期
    await expect(page.getByTestId('dialog-DRPPO-H-INV_DD')).toHaveValue(TODAY_NOW, { timeout: 15000 });
    // 2.發票期別
    //console.log('invymstr=',invymstr)
    await expect(page.getByTestId('dialog-DRPPO-H-INV_YM')).toHaveValue(invymstr, { timeout: 15000 });
    // 3.買受人統編
    await expect(page.getByTestId('dialog-DRPPO-H-UNI_NO_BUY')).toHaveValue('23724230', { timeout: 15000 });
    // 4.買受人抬頭
    await expect(page.getByTestId('dialog-DRPPO-H-TITLE_BUY')).toHaveValue('ATTN Technology Co., Ltd.', { timeout: 15000 });
    // 5.營業人統編
    await expect(page.getByTestId('dialog-DRPPO-H-UNI_NO_PAY')).toHaveValue('87654322', { timeout: 15000 });
    // 6.營業人抬頭
    await expect(page.getByTestId('dialog-DRPPO-H-TITLE_PAY')).toHaveValue('B2B 有限公司', { timeout: 15000 });
    // 7.發票別
    await expect(page.getByTestId('dialog-DRPPO-H-METH_ID-input-inner')).toHaveValue('21.統一開票扣抵聯(進貨及費用)', { timeout: 15000 });
    // 8.扣抵別 
    await expect(page.getByTestId('dialog-DRPPO-H-TAX_ID2-1-inner')).toHaveValue('1', { timeout: 15000 });
    // 9.稅別
    await expect(page.getByTestId('dialog-DRPPO-H-TAX_ID1-1-inner')).toHaveValue('1', { timeout: 15000 });
    // 10.銷售金額---->檢查金額欄位（以字串為主）
    await expect(page.getByTestId('dialog-DRPPO-H-AMT')).toHaveValue('95,238', { timeout: 15000 });
    // 11.稅額
    await expect(page.getByTestId('dialog-DRPPO-H-TAX')).toHaveValue('4,762', { timeout: 15000 });
    // 12.合計
    await expect(page.getByTestId('dialog-DRPPO-H-SUM_AMT')).toHaveValue('100,000', { timeout: 15000 });
    // 確定並存檔
    await page.getByTestId('dialog-DRPPO-確定-btn').waitFor({ state: 'visible', timeout: 15000 });
    await waitAndClick(page.getByTestId('dialog-DRPPO-確定-btn'));
    await waitAndClick(page.getByTestId('DRPPO-save-btn'));
    await page.waitForLoadState('networkidle');
    await expect(page.getByText('存檔成功')).toBeVisible({ timeout: 100000 });
    await page.waitForLoadState('networkidle');
    //await expect(page.getByText('存檔成功')).toBeVisible({ timeout: 20000 });
    //--->更健壯地檢查稅別選項：基於 input.checked 或 aria-checked，而不是直接比 value 字串
    //await expect(page.locator('[data-testid="dialog-DRPPO-H-TAX_ID2-1-inner"] input')).toBeChecked({ timeout: 15000 });
  await page.waitForTimeout(10000);

  // 離開採購單頁面
  await waitAndClick(page.getByTestId('DRPPO-exit2-btn'));
      
//修改採購單***************************************修改訂金1/2&發票55
    await page.goto(`#/inv/invpo/${PONO21}`);
    await page.waitForLoadState('networkidle');
    await expect(page.getByRole('dialog', { name: '進入進貨單時錯誤' })).not.toBeVisible();
       // 修改訂金為一半
    await page.getByTestId('DRPPO-radio-button-5').click();
    await page.getByTestId('DRPPO-invsa_tab6').getByTestId('DRPPO-H-AMTN_BC').click();
    await page.getByTestId('DRPPO-invsa_tab6').getByTestId('DRPPO-H-AMTN_BC').fill('50,000');
    await page.getByTestId('DRPPO-invsa_tab6').getByTestId('DRPPO-H-AMTN_BC').press('Enter');
    await page.getByTestId('DRPPO-H-INV_NO-form-item-inner').getByTestId('DRPPO-...-btn').click();
    await page.getByTestId('dialog-DRPPO-H-INV_NO').waitFor({ state: 'visible', timeout: 15000 });
    await page.getByTestId('dialog-DRPPO-H-INV_NO').press('Enter');
    await page.getByTestId('dialog-DRPPO-H-AMT').waitFor({ state: 'visible', timeout: 15000 });
    await page.getByTestId('dialog-DRPPO-H-AMT').click();
    await page.getByTestId('dialog-DRPPO-H-AMT').fill('47,619');
    await page.getByTestId('dialog-DRPPO-H-AMT').press('Enter');
    await page.getByTestId('dialog-DRPPO-H-TAX').click();
    await page.getByTestId('dialog-DRPPO-H-TAX').fill('2,381');
    await page.getByTestId('dialog-DRPPO-H-TAX').press('Enter');
    // 用 press 可能會觸發導航或關閉對話框，改為點擊其他可見元素以確保變更被提交
    await page.keyboard.press('Tab');
    await page.waitForTimeout(500); // 微小等待以讓前端處理輸入（短暫）
    // 確定後返回採購單再次進入發票視窗檢測
    await page.getByTestId('dialog-DRPPO-確定-btn').waitFor({ state: 'visible', timeout: 15000 });
    await waitAndClick(page.getByTestId('dialog-DRPPO-確定-btn'));
    await page.waitForLoadState('networkidle');
    await waitAndClick(page.getByTestId('DRPPO-H-INV_NO-form-item-inner').getByTestId('DRPPO-...-btn'));

    // 等待對話框內欄位就緒，再檢查值
    await page.getByTestId('dialog-DRPPO-H-INV_DD').waitFor({ state: 'visible', timeout: 15000 });

    // =====================================驗證發票對話框必填欄位（更長 timeout:15000）
    // 1.發票日期
    await expect(page.getByTestId('dialog-DRPPO-H-INV_DD')).toHaveValue(TODAY_NOW, { timeout: 15000 });
    // 2.發票期別
    await expect(page.getByTestId('dialog-DRPPO-H-INV_YM')).toHaveValue(invymstr, { timeout: 15000 });
    // 3.買受人統編
    await expect(page.getByTestId('dialog-DRPPO-H-UNI_NO_BUY')).toHaveValue('23724230', { timeout: 15000 });
    // 4.買受人抬頭
    await expect(page.getByTestId('dialog-DRPPO-H-TITLE_BUY')).toHaveValue('ATTN Technology Co., Ltd.', { timeout: 15000 });
    // 5.營業人統編
    await expect(page.getByTestId('dialog-DRPPO-H-UNI_NO_PAY')).toHaveValue('87654322', { timeout: 15000 });
    // 6.營業人抬頭
    await expect(page.getByTestId('dialog-DRPPO-H-TITLE_PAY')).toHaveValue('B2B 有限公司', { timeout: 15000 });
    // 7.發票別
    await expect(page.getByTestId('dialog-DRPPO-H-METH_ID-input-inner')).toHaveValue('21.統一開票扣抵聯(進貨及費用)', { timeout: 15000 });
    // 8.扣抵別 
    await expect(page.getByTestId('dialog-DRPPO-H-TAX_ID2-1-inner')).toHaveValue('1', { timeout: 15000 });
    //--->更健壯地檢查稅別選項：基於 input.checked 或 aria-checked，而不是直接比 value 字串
    //await expect(page.locator('[data-testid="dialog-DRPPO-H-TAX_ID2-1-inner"] input')).toBeChecked({ timeout: 15000 });
    //await expect(page.locator('[data-testid="dialog-DRPPO-H-TAX_ID2-2-inner"] input')).not.toBeChecked({ timeout: 15000 });
    //await expect(page.locator('[data-testid="dialog-DRPPO-H-TAX_ID2-3-inner"] input')).not.toBeChecked({ timeout: 15000 });
    //await expect(page.locator('[data-testid="dialog-DRPPO-H-TAX_ID2-4-inner"] input')).not.toBeChecked({ timeout: 15000 });
    
    // 9.稅別
    await expect(page.getByTestId('dialog-DRPPO-H-TAX_ID1-1-inner')).toHaveValue('1', { timeout: 15000 });
    // 10.銷售金額---->檢查金額欄位（以字串為主）
    //await expect(page.getByTestId('dialog-DRPPO-H-AMT')).toHaveValue('47,619', { timeout: 15000 });
    // 11.稅額
    //await expect(page.getByTestId('dialog-DRPPO-H-TAX')).toHaveValue('2,381', { timeout: 15000 });
    // 12.合計
    await expect(page.getByTestId('dialog-DRPPO-H-SUM_AMT')).toHaveValue('50,000', { timeout: 15000 });

    // 確定退出發票視窗後並存檔採購單
    await page.getByTestId('dialog-DRPPO-確定-btn').waitFor({ state: 'visible', timeout: 15000 });
    await waitAndClick(page.getByTestId('dialog-DRPPO-確定-btn'));
    await waitAndClick(page.getByTestId('DRPPO-save-btn'));
  await page.waitForLoadState('networkidle');
    await expect(page.getByText('存檔成功')).toBeVisible({ timeout: 100000 });
  await page.waitForLoadState('networkidle');

//************************************************刪除採購單PONO21*****************************************************
  await page.goto(`#/inv/invpo/${PONO21}`);
  await page.waitForLoadState('networkidle');
  await expect(page.getByRole('dialog', { name: '錯誤' }), '檢測進入"銷貨單"頁面沒有報錯').not.toBeVisible();
  await waitAndClick(page.getByTestId('DRPPO-tabset').getByTestId('DRPPO-radio-button-1'));
  await waitAndClick(page.getByTestId('DRPPO-delete-btn'));
  await waitAndClick(page.locator('div').filter({ hasText: '提示' }).nth(3));
  await waitAndClick(page.getByRole('button', { name: '確定' }));
  await expect(page.getByText('刪除成功')).toBeVisible({ timeout: 30000 });  
  await page.waitForTimeout(3000);
  // 離開採購單頁面
  await waitAndClick(page.getByTestId('DRPPO-exit2-btn'));

    }
     catch (err) {
    // 截圖與頁面內容以便診斷
    try {
       //await page.screenshot({ path: `error-PA213-${Date.now()}.png`, fullPage: true }); 
      } catch(e) {}
    //console.error('Test failed - saved screenshot (if possible).', err);
    throw err;
  
  }
});
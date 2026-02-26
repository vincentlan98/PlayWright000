import { test, expect } from '@playwright/test';
import { dataStorage } from '@playwright/test-utils/dataStorage';


//1.設定wait和click時的等待時間,執行時取用,節省重複程式碼,減少因系統執行逾時出現錯誤訊息而失敗
async function waitAndClick(locator: any, timeout = 30000) {
  await locator.waitFor({ state: 'visible', timeout });
  await locator.click();
}
//強制點擊隱藏元素（例如被遮蓋或CSS隱藏的元素）
async function forceClick(locator: any) {
  await locator.click({ force: true });
}
//SANOB01->SANOB01_INVNO新增&修改&作廢&刪除---20260120版

test('銷貨單-SANOB01-發票新增修改作廢後刪除', async ({ page }) => {
  try {
//2.設定變量:a. 單號 b. 今天日期-TODAY_NOW c. 發票期別 - invymstr
    let SANOB01 = '';
    let SANOB01_INVNO = '';
    let TODAY = new Date();
    let YYYY = TODAY.getFullYear().toString().slice(-4);
    let MM = (TODAY.getMonth() + 1).toString().padStart(2, '0');
    let DD = TODAY.getDate().toString().padStart(2, '0');
    let TODAY_NOW: string;
    TODAY_NOW = `${YYYY}-${MM}-${DD}`;
    let invmm:number=parseInt(MM)%2===0?parseInt(MM):parseInt(MM)+1;
    let invymstr:string=invmm<10?`${YYYY}0${invmm.toString()}`:`${YYYY}${invmm.toString()}`;
  
//****************************************************新增銷貨單B01
  await page.goto('#/inv/invsa');
//3.檢測進入頁面錯誤  
  await page.waitForLoadState('networkidle');
  await expect(page.getByRole('dialog', { name: '進入銷貨單頁面時錯誤' })).not.toBeVisible();
  await waitAndClick(page.getByTestId('DRPSA-add-btn'));
  await waitAndClick(page.getByTestId('DRPSA-H-PS_DD'));
  await page.getByTestId('DRPSA-H-PS_DD').press('Enter');
  await page.getByTestId('DRPSA-H-PS_NO').press('Enter');
  await waitAndClick(page.getByTestId('DRPSA-H-CUS_NO-icon-svg'));
  await waitAndClick(page.getByTestId('dialog-search-input-DRPSA-CUS_NO-1-value1'));
  await page.getByTestId('dialog-search-input-DRPSA-CUS_NO-1-value1').fill('BTOB');
  await waitAndClick(page.getByTestId('dialog-DRPSA-Search-btn'));
  await waitAndClick(page.getByTestId('DRPSA-gridOptions-B-column_0-row_0-btn'));
  await page.getByTestId('DRPSA-H-CUS_NO').press('Tab');
  await waitAndClick(page.getByTestId('DRPSA-H-SAL_NO'));
  await waitAndClick(page.getByTestId('DRPSA-H-SAL_NO-icon-svg'));
  await waitAndClick(page.getByTestId('MF_YG-resize').getByTestId('DRPSA-gridOptions-B-column_0-row_0-btn'));
  await page.getByTestId('DRPSA-H-SAL_NO').press('Tab');
  await waitAndClick(page.getByTestId('DRPSA-H-DEP'));
  await waitAndClick(page.getByTestId('DRPSA-H-DEP-icon-svg'));
  await waitAndClick(page.getByTestId('DEPT-resize').getByTestId('DRPSA-gridOptions-B-column_0-row_0-btn'));
  await page.getByTestId('DRPSA-H-DEP').press('Tab');
  await waitAndClick(page.getByTestId('DRPSA-invsa_tab1').getByTestId('DRPSA-H-REM'));
  await page.getByTestId('DRPSA-invsa_tab1').getByTestId('DRPSA-H-REM').press('ControlOrMeta+V');
  await page.getByTestId('DRPSA-invsa_tab1').getByTestId('DRPSA-H-REM').fill('PLAYWRIRHT-銷項-39電子發票-BtoB-應稅外加-銷項開票-新增銷貨單');
  await page.getByTestId('DRPSA-invsa_tab1').getByTestId('DRPSA-H-REM').press('Tab');
  //新增第一行先定位
  await waitAndClick(page.locator('div').filter({ hasText: /^1$/ }).nth(2));
  await waitAndClick(page.getByTestId('DRPSA-TF_PSS-B-PRD_NO-row_0-cell-wrapper'));
  await waitAndClick(page.getByTestId('DRPSA-TF_PSS-B-PRD_NO-row_0-suffix-icon-svg'));
  await waitAndClick(page.getByTestId('DRPSA-gridOptions-B-column_0-row_0-checkbox-icon'));
  await waitAndClick(page.getByTestId('dialog-DRPSA-確定-btn'));
  await page.getByTestId('DRPSA-TF_PSS-B-PRD_NO-row_0-input').press('Tab');
  await waitAndClick(page.getByTestId('DRPSA-TF_PSS-B-WH-row_0-input'));
  await waitAndClick(page.getByTestId('DRPSA-TF_PSS-B-WH-row_0-suffix-icon-svg'));
  await waitAndClick(page.getByTestId('MY_WH_NOWMS-resize').getByTestId('DRPSA-gridOptions-B-column_0-row_2-btn'));
  await waitAndClick(page.getByTestId('DRPSA-TF_PSS-B-WH-row_0-input'));
  await page.getByTestId('DRPSA-TF_PSS-B-WH-row_0-input').press('Tab');
  await waitAndClick(page.getByTestId('DRPSA-TF_PSS-B-QTY-row_0-input'));
  await page.getByTestId('DRPSA-TF_PSS-B-QTY-row_0-input').fill('1.00');
  await page.getByTestId('DRPSA-TF_PSS-B-QTY-row_0-input').press('Tab');
  await page.getByTestId('DRPSA-TF_PSS-B-UP-row_0-input').fill('10,000.00');
  await page.getByTestId('DRPSA-TF_PSS-B-UP-row_0-input').press('Tab');
    // 新增第二行-->先等待第一行商品完全新增完成
  await page.waitForLoadState('networkidle');
  await waitAndClick(page.locator('div').filter({ hasText: /^2$/ }).first());
  await waitAndClick(page.getByTestId('DRPSA-TF_PSS-B-PRD_NO-row_1-cell-wrapper'));
  await waitAndClick(page.getByTestId('DRPSA-TF_PSS-B-PRD_NO-row_1-suffix-icon-svg'));
  await waitAndClick(page.getByTestId('DRPSA-gridOptions-B-column_0-row_1-checkbox-icon'));
  await waitAndClick(page.getByTestId('dialog-DRPSA-確定-btn'));
  await page.getByTestId('DRPSA-TF_PSS-B-PRD_NO-row_1-input').press('Tab');
  await waitAndClick(page.getByTestId('DRPSA-TF_PSS-B-WH-row_1-input'));
  await waitAndClick(page.getByTestId('DRPSA-TF_PSS-B-WH-row_1-suffix-icon-svg'));
  await waitAndClick(page.getByTestId('MY_WH_NOWMS-resize').getByTestId('DRPSA-gridOptions-B-column_0-row_2-btn'));
  await page.getByTestId('DRPSA-TF_PSS-B-WH-row_1-input').press('Tab');
  await waitAndClick(page.getByTestId('DRPSA-TF_PSS-B-QTY-row_1-input'));
  await page.getByTestId('DRPSA-TF_PSS-B-QTY-row_1-input').fill('1.00');
  await page.getByTestId('DRPSA-TF_PSS-B-QTY-row_1-input').press('Tab');
  await page.getByTestId('DRPSA-TF_PSS-B-UP-row_1-input').fill('15,000.00');
  await page.getByTestId('DRPSA-TF_PSS-B-UP-row_1-input').press('Tab');
  await waitAndClick(page.getByTestId('DRPSA-save-btn'));
  
  // 等待成功訊息出現再導航
  await page.waitForLoadState('networkidle');
  await expect(page.getByText('存檔成功')).toBeVisible({ timeout: 150000 });
  await page.waitForLoadState('networkidle');
  
  SANOB01 = await page.getByTestId('DRPSA-H-PS_NO').inputValue();  // 儲存單號到SANOB01
  if (!SANOB01) throw new Error('Failed to get SANOB01');
  dataStorage.setValue('SANOB01', SANOB01); // 存到dataStorage以便其他測試案例使用
  await page.waitForLoadState('networkidle');

  //********************************************************修改銷貨單B01*******************新增發票
  await page.goto(`#/inv/invsa/${SANOB01}`);
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1000);
  await expect(page.getByRole('dialog', { name: '錯誤' }), '檢測進入頁面沒有報錯').not.toBeVisible();
  await waitAndClick(page.getByTestId('DRPSA-radio-button-5'));
  await waitAndClick(page.getByTestId('DRPSA-發票-btn'));
  await waitAndClick(page.getByTestId('dialog-DRPSA-H-INV_ID-icon-svg'));
  await waitAndClick(page.getByTestId('dialog-DRPSA-H-INV_ID-option-39-text'));
    
  //因確定後才可檢測發票欄位值,且系統發票視窗關閉反應快,故再開啟後檢測
    await waitAndClick(page.getByTestId('dialog-DRPSA-確定-btn'));
    await waitAndClick(page.getByTestId('DRPSA-發票-btn'));

   // 等待對話框內欄位就緒，再檢查值
    await page.getByTestId('dialog-DRPSA-H-INV_DD').waitFor({ state: 'visible', timeout: 15000 });

    // ============驗證發票對話框必填欄位（更長 timeout:15000）
    // 1.發票日期
    await expect(page.getByTestId('dialog-DRPSA-H-INV_DD')).toHaveValue(TODAY_NOW, { timeout: 15000 });
    // 2.發票期別
    //console.log('invymstr=',invymstr)
    await expect(page.getByTestId('dialog-DRPSA-H-INV_YM')).toHaveValue(invymstr, { timeout: 15000 });
    // 3.買受人統編
    await expect(page.getByTestId('dialog-DRPSA-H-UNI_NO_BUY')).toHaveValue('87654322', { timeout: 15000 });
    // 4.買受人抬頭
    await expect(page.getByTestId('dialog-DRPSA-H-TITLE_BUY')).toHaveValue('B2B 有限公司', { timeout: 15000 });
    // 5.營業人統編
    await expect(page.getByTestId('dialog-DRPSA-H-UNI_NO_PAY')).toHaveValue('23724230', { timeout: 15000 });
    // 6.營業人抬頭
    await expect(page.getByTestId('dialog-DRPSA-H-TITLE_PAY')).toHaveValue('ATTN Technology Co., Ltd.', { timeout: 15000 });
    // 7.發票別
    await expect(page.getByTestId('dialog-DRPSA-H-METH_ID-input-inner')).toHaveValue('', { timeout: 15000 });
    // 8.扣抵別 
    await expect(page.getByTestId('dialog-DRPSA-H-TAX_ID2-1-inner')).toHaveValue('1', { timeout: 15000 });
    // 9.稅別
    await expect(page.getByTestId('dialog-DRPSA-H-TAX_ID1-1-inner')).toHaveValue('1', { timeout: 15000 });
    // 10.銷售金額---->檢查金額欄位（以字串為主）
    await expect(page.getByTestId('dialog-DRPSA-H-AMT')).toHaveValue('25,000', { timeout: 15000 });
    // 11.稅額
    await expect(page.getByTestId('dialog-DRPSA-H-TAX')).toHaveValue('1,250', { timeout: 15000 });
    // 12.合計
    await expect(page.getByTestId('dialog-DRPSA-H-SUM_AMT')).toHaveValue('26,250', { timeout: 15000 });
    // 13.防偽隨機碼 (應為 4 碼數字)
    await expect(page.getByTestId('dialog-DRPSA-H-RAND_NO')).toHaveValue(/^\d{4}$/, { timeout: 15000 });
   
    // 確定並存檔
    await page.getByTestId('dialog-DRPSA-確定-btn').waitFor({ state: 'visible', timeout: 15000 });
    await waitAndClick(page.getByTestId('dialog-DRPSA-確定-btn'));
    await waitAndClick(page.getByTestId('DRPSA-save-btn'));
    await expect(page.getByText('存檔成功')).toBeVisible({ timeout: 150000 });
    await page.waitForLoadState('networkidle');

  //********************************************************修改銷貨單B01*******************修改表身與發票
  await page.goto(`#/inv/invsa/${SANOB01}`);
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1000);
  await expect(page.getByRole('dialog', { name: '錯誤' }), '檢測進入頁面沒有報錯').not.toBeVisible();
  await waitAndClick(page.getByTestId('DRPSA-tabset').getByTestId('DRPSA-radio-button-1'));
  // 指向第二行後再刪除
  await page.waitForLoadState('networkidle');
  const row2Locator = page.locator('div').filter({ hasText: /^2$/ }).first();
  await row2Locator.click();
  await page.waitForLoadState('networkidle');
  
  // 懸停到該行以顯示刪除按鈕
  const delIconLocator = page.getByTestId('DRPSA-TF_PSS-B-TABLE_ID-row_1-del-icon-svg');
  const rowContainer = delIconLocator.locator('xpath=ancestor::tr');
  await rowContainer.hover();
  await page.waitForTimeout(500);
  // 使用 forceClick 來點擊隱藏的刪除按鈕
  await delIconLocator.click({ force: true });
//20260202K版-修改表頭未稅本未必金額-------------下3列BUG修正後刪除
await waitAndClick(page.getByTestId('DRPSA-H-AMTN_NET_H-input-wrapper'));
await page.getByTestId('DRPSA-H-AMTN_NET_H').fill('10,000');
await page.getByTestId('DRPSA-H-AMTN_NET_H').press('Enter');
  //await waitAndClick(page.getByTestId('DRPSA-save-btn'));
  //await expect(page.getByText('存檔成功')).toBeVisible({ timeout: 30000 });
  //await page.waitForLoadState('networkidle');
  await waitAndClick(page.getByTestId('DRPSA-radio-button-5'));
  await waitAndClick(page.getByTestId('DRPSA-INV_NO_LIST-B-INV_NO-row_0-cell-wrapper').locator('a'));
  await waitAndClick(page.getByTestId('dialog-DRPSA-H-AMT'));
  await page.getByTestId('dialog-DRPSA-H-AMT').fill('10,000');
  await page.getByTestId('dialog-DRPSA-H-AMT').press('Tab');
  await waitAndClick(page.getByTestId('dialog-DRPSA-H-TAX'));
  await page.getByTestId('dialog-DRPSA-H-TAX').fill('500');
  await page.getByTestId('dialog-DRPSA-H-TAX').press('Tab');
  await waitAndClick(page.getByTestId('dialog-DRPSA-確定-btn'));
  await page.getByTestId('DRPSA-發票-btn').click();
  
  // 等待對話框內欄位就緒，再檢查值
    //await page.getByTestId('dialog-DRPSA-H-INV_DD').waitFor({ state: 'visible', timeout: 15000 });

    // ============驗證發票對話框必填欄位（更長 timeout:15000）
    // 1.發票日期
    await expect(page.getByTestId('dialog-DRPSA-H-INV_DD')).toHaveValue(TODAY_NOW, { timeout: 15000 });
    // 2.發票期別
    //console.log('invymstr=',invymstr)
    await expect(page.getByTestId('dialog-DRPSA-H-INV_YM')).toHaveValue(invymstr, { timeout: 15000 });
    // 3.買受人統編
    await expect(page.getByTestId('dialog-DRPSA-H-UNI_NO_BUY')).toHaveValue('87654322', { timeout: 15000 });
    // 4.買受人抬頭
    await expect(page.getByTestId('dialog-DRPSA-H-TITLE_BUY')).toHaveValue('B2B 有限公司', { timeout: 15000 });
    // 5.營業人統編
    await expect(page.getByTestId('dialog-DRPSA-H-UNI_NO_PAY')).toHaveValue('23724230', { timeout: 15000 });
    // 6.營業人抬頭
    await expect(page.getByTestId('dialog-DRPSA-H-TITLE_PAY')).toHaveValue('ATTN Technology Co., Ltd.', { timeout: 15000 });
    // 7.發票別
    await expect(page.getByTestId('dialog-DRPSA-H-METH_ID-input-inner')).toHaveValue('', { timeout: 15000 });
    // 8.扣抵別 
    await expect(page.getByTestId('dialog-DRPSA-H-TAX_ID2-1-inner')).toHaveValue('1', { timeout: 15000 });
    // 9.稅別
    await expect(page.getByTestId('dialog-DRPSA-H-TAX_ID1-1-inner')).toHaveValue('1', { timeout: 15000 });
    // 10.銷售金額---->檢查金額欄位（以字串為主）
    await expect(page.getByTestId('dialog-DRPSA-H-AMT')).toHaveValue('10,000', { timeout: 15000 });
    // 11.稅額
    await expect(page.getByTestId('dialog-DRPSA-H-TAX')).toHaveValue('500', { timeout: 15000 });
    // 12.合計
    await expect(page.getByTestId('dialog-DRPSA-H-SUM_AMT')).toHaveValue('10,500', { timeout: 15000 });
    // 13.防偽隨機碼 (應為 4 碼數字)
    await expect(page.getByTestId('dialog-DRPSA-H-RAND_NO')).toHaveValue(/^\d{4}$/, { timeout: 15000 });
    // 確定並存檔
    await waitAndClick(page.getByTestId('dialog-DRPSA-確定-btn'));
    await waitAndClick(page.getByTestId('DRPSA-save-btn'));
    await expect(page.getByText('存檔成功')).toBeVisible({ timeout: 150000 });
    await page.waitForLoadState('networkidle');

  //********************************************************修改銷貨單B01*******************作廢發票
  await page.goto(`#/inv/invsa/${SANOB01}`);
  await page.waitForTimeout(1000);
  await expect(page.getByRole('dialog', { name: '錯誤' }), '檢測進入頁面沒有報錯').not.toBeVisible();
  await waitAndClick(page.getByTestId('DRPSA-tabset').getByTestId('DRPSA-radio-button-1'));
  await waitAndClick(page.getByTestId('DRPSA-radio-button-5'));
  await waitAndClick(page.getByTestId('DRPSA-發票-btn'));
  await waitAndClick(page.getByTestId('dialog-DRPSA-作廢-btn'));
  await waitAndClick(page.locator('div').filter({ hasText: '詢問' }).nth(3));
  await waitAndClick(page.getByRole('button', { name: '確定' }).nth(1));
  await waitAndClick(page.getByTestId('dialog-DRPSA-H-PRJ_NO'));
  await page.getByTestId('dialog-DRPSA-H-PRJ_NO').press('Enter');
  await page.getByTestId('dialog-DRPSA-H-PRJ_NO').fill('SAINVCANCEL');
  await waitAndClick(page.getByTestId('dialog-DRPSA-H-CANCEL_REM'));
  await page.getByTestId('dialog-DRPSA-H-CANCEL_REM').fill('SA01');
  await waitAndClick(page.getByRole('dialog', { name: '發票作廢畫面' }).getByTestId('dialog-DRPSA-確定-btn'));
  await waitAndClick(page.getByTestId('DRPSA-save-btn'));
  await expect(page.getByText('存檔成功')).toBeVisible({ timeout: 150000 });
    await page.waitForLoadState('networkidle');

 
  //********************************************************修改銷貨單B01*******************新增發票
  await page.goto(`#/inv/invsa/${SANOB01}`);
  await page.waitForTimeout(1000);
  await expect(page.getByRole('dialog', { name: '錯誤' }), '檢測進入頁面沒有報錯').not.toBeVisible();
  await waitAndClick(page.getByTestId('DRPSA-radio-button-5'));
  await waitAndClick(page.getByTestId('DRPSA-發票-btn'));
  await waitAndClick(page.getByTestId('dialog-DRPSA-H-INV_ID-icon-svg'));
  await waitAndClick(page.getByTestId('dialog-DRPSA-H-INV_ID-option-39-text'));
  //因確定後才可檢測發票欄位值,且系統發票視窗關閉反應快,故再開啟後檢測
  await waitAndClick(page.getByTestId('dialog-DRPSA-確定-btn'));
  await waitAndClick(page.getByTestId('DRPSA-發票-btn'));
   // 等待對話框內欄位就緒，再檢查值
    await page.getByTestId('dialog-DRPSA-H-INV_DD').waitFor({ state: 'visible', timeout: 15000 });

    // ============驗證發票對話框必填欄位（更長 timeout:15000）
    // 1.發票日期
    await expect(page.getByTestId('dialog-DRPSA-H-INV_DD')).toHaveValue(TODAY_NOW, { timeout: 15000 });
    // 2.發票期別
    //console.log('invymstr=',invymstr)
    await expect(page.getByTestId('dialog-DRPSA-H-INV_YM')).toHaveValue(invymstr, { timeout: 15000 });
    // 3.買受人統編
    await expect(page.getByTestId('dialog-DRPSA-H-UNI_NO_BUY')).toHaveValue('87654322', { timeout: 15000 });
    // 4.買受人抬頭
    await expect(page.getByTestId('dialog-DRPSA-H-TITLE_BUY')).toHaveValue('B2B 有限公司', { timeout: 15000 });
    // 5.營業人統編
    await expect(page.getByTestId('dialog-DRPSA-H-UNI_NO_PAY')).toHaveValue('23724230', { timeout: 15000 });
    // 6.營業人抬頭
    await expect(page.getByTestId('dialog-DRPSA-H-TITLE_PAY')).toHaveValue('ATTN Technology Co., Ltd.', { timeout: 15000 });
    // 7.發票別
    await expect(page.getByTestId('dialog-DRPSA-H-METH_ID-input-inner')).toHaveValue('', { timeout: 15000 });
    // 8.扣抵別 
    await expect(page.getByTestId('dialog-DRPSA-H-TAX_ID2-1-inner')).toHaveValue('1', { timeout: 15000 });
    // 9.稅別
    await expect(page.getByTestId('dialog-DRPSA-H-TAX_ID1-1-inner')).toHaveValue('1', { timeout: 15000 });
    // 10.銷售金額---->檢查金額欄位（以字串為主）
    await expect(page.getByTestId('dialog-DRPSA-H-AMT')).toHaveValue('10,000', { timeout: 15000 });
    // 11.稅額
    await expect(page.getByTestId('dialog-DRPSA-H-TAX')).toHaveValue('500', { timeout: 15000 });
    // 12.合計
    await expect(page.getByTestId('dialog-DRPSA-H-SUM_AMT')).toHaveValue('10,500', { timeout: 15000 });
    // 13.防偽隨機碼 (應為 4 碼數字)
    await expect(page.getByTestId('dialog-DRPSA-H-RAND_NO')).toHaveValue(/^\d{4}$/, { timeout: 15000 });
    
    SANOB01_INVNO = await page.getByTestId('dialog-DRPSA-H-INV_NO').inputValue();  // 儲存發票號碼到SANOB01_INVNO
    if (!SANOB01_INVNO) throw new Error('Failed to get SANOB01_INVNO');
    dataStorage.setValue('SANOB01_INVNO', SANOB01_INVNO); // 存到dataStorage以便其他測試案例使用  
   
    // 確定並存檔
    await page.getByTestId('dialog-DRPSA-確定-btn').waitFor({ state: 'visible', timeout: 15000 });
    await waitAndClick(page.getByTestId('dialog-DRPSA-確定-btn'));
    await waitAndClick(page.getByTestId('DRPSA-save-btn'));
    await page.waitForLoadState('networkidle');
    await expect(page.getByText('存檔成功')).toBeVisible({ timeout: 150000 });
    await page.waitForLoadState('networkidle');

  //********************************************************修改銷貨單B01*******************刪除發票
  await page.goto(`#/inv/invsa/${SANOB01}`);
  await page.waitForTimeout(1000);
  await expect(page.getByRole('dialog', { name: '錯誤' }), '檢測進入頁面沒有報錯').not.toBeVisible();
  await waitAndClick(page.getByTestId('DRPSA-tabset').getByTestId('DRPSA-radio-button-1'));
  await waitAndClick(page.getByTestId('DRPSA-radio-button-5'));
  await waitAndClick(page.getByTestId('DRPSA-發票-btn'));
  await waitAndClick(page.getByTestId('dialog-DRPSA-刪除-btn'));
  await waitAndClick(page.locator('div').filter({ hasText: '詢問' }).nth(3));
  await waitAndClick(page.getByRole('button', { name: '確定' }).nth(1));
  await waitAndClick(page.getByTestId('DRPSA-save-btn'));
  await expect(page.getByText('存檔成功')).toBeVisible({ timeout: 150000 });
    await page.waitForLoadState('networkidle');

  // 導航到詳細頁面
  await page.goto(`#/inv/invsa/${SANOB01}`);
  //await page.waitForLoadState('networkidle');
  
  //****************************************************刪除銷貨單B01
    await page.goto(`#/inv/invsa/${SANOB01}`);
    await page.waitForTimeout(1000);
    await expect(page.getByRole('dialog', { name: '錯誤' }), '檢測進入頁面沒有報錯').not.toBeVisible();
    await waitAndClick(page.getByTestId('DRPSA-tabset').getByTestId('DRPSA-radio-button-1'));
    await waitAndClick(page.getByTestId('DRPSA-delete-btn'));
    await waitAndClick(page.locator('div').filter({ hasText: '提示' }).nth(3));
    await waitAndClick(page.getByRole('button', { name: '確定' }));
    await expect(page.getByText('刪除成功')).toBeVisible({ timeout: 30000 });  
    await page.waitForTimeout(500);

  // 離開銷貨單頁面
  await page.waitForLoadState('networkidle');
  await waitAndClick(page.getByTestId('DRPSA-exit2-btn'));
  




   }
     catch (err) {
    // 截圖與頁面內容以便診斷
    try {
      // Check if page is still valid before taking screenshot
      if (!page.isClosed()) {
        await page.screenshot({ path: `error-PA213-${Date.now()}.png`, fullPage: true }); 
      }
      } catch(e) {}
    console.error('Test failed - saved screenshot (if possible).', err);
    throw err;
  }

});
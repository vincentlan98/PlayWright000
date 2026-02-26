import { test, expect } from '@playwright/test';
import { dataStorage } from '@playwright/test-utils/dataStorage';


//1.設定wait和click時的等待時間,執行時取用,節省重複程式碼,減少因系統執行逾時出現錯誤訊息而失敗
async function waitAndClick(locator: any, timeout = 30000) {
  await locator.waitFor({ state: 'visible', timeout });
  await locator.click();
}
//SA72->LO702&LO703->XX03作廢&XX04---20260119版
//20260206K版 505行等待成功訊息出現再導航-加長等待時間await page.waitForTimeout(5000);

test('SB393-銷貨單72-銷項開票702&703-發票新增修改作廢後刪除檢測', async ({ page }) => {
  try {
//2.設定變量:a. 單號 b. 今天日期-TODAY_NOW c. 發票期別 - invymstr
    let SANO72 = '';
    let LONO702 = '';
    let LONO703 = '';
    let INVNOXX02 = '';
    let INVNOXX03 = '';
    let TODAY = new Date();
    let YYYY = TODAY.getFullYear().toString().slice(-4);
    let MM = (TODAY.getMonth() + 1).toString().padStart(2, '0');
    let DD = TODAY.getDate().toString().padStart(2, '0');
    let TODAY_NOW: string;
    TODAY_NOW = `${YYYY}-${MM}-${DD}`;
    let invmm:number=parseInt(MM)%2===0?parseInt(MM):parseInt(MM)+1;
    let invymstr:string=invmm<10?`${YYYY}0${invmm.toString()}`:`${YYYY}${invmm.toString()}`;


//****************************************************新增銷貨單SANO72***********************************************************/
await page.goto('#/inv/invsa');
//3.檢測進入頁面錯誤  
  await page.waitForLoadState('networkidle');
  await expect(page.getByRole('dialog', { name: '進入銷貨單頁面時錯誤' })).not.toBeVisible();
  //await waitAndClick(page.getByTestId('DRPSA-add-btn'));
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
  await page.getByTestId('DRPSA-invsa_tab1').getByTestId('DRPSA-H-REM').fill('PLAYWRIRHT-銷項-39電子發票-BtoB-應稅外加-銷項開票-新增銷貨單X1-銷貨開票X2');
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
  await expect(page.getByText('存檔成功')).toBeVisible();
  //await expect(page.getByText('存檔成功')).toBeVisible({ timeout: 30000 });
    
    SANO72 = await page.getByTestId('DRPSA-H-PS_NO').inputValue();  // 儲存單號到SANO72
    if (!SANO72) throw new Error('Failed to get SANO72');
    dataStorage.setValue('SANO72', SANO72); // 存到dataStorage以便其他測試案例使用
    await page.waitForLoadState('networkidle');

  // 離開銷貨單頁面
  await page.getByTestId('DRPSA-exit2-btn').click();

//************************************************銷貨開票處理-新增LONO702-銷貨單表身全轉入1ST ************************************/
  await page.goto('#/mon/InvLZQuery');
  await page.waitForLoadState('networkidle');
  await expect(page.getByRole('dialog', { name: '錯誤' }), '檢測進入"銷貨開票處理"頁面沒有報錯').not.toBeVisible();
  await waitAndClick(page.getByRole('radiogroup', { name: 'radio-group' }).getByTestId('INVLZQUERY-radio-button-1'));
  await waitAndClick(page.getByRole('button', { name: '全部' }));
  await waitAndClick(page.locator('div').filter({ hasText: /^快速過濾$/ }).first());
  await waitAndClick(page.getByTestId('search-input-INVLZQUERY-BIL_ID-1-value1').first());
  await page.getByTestId('search-input-INVLZQUERY-BIL_ID-1-value1').first().fill('SA');
  await page.getByTestId('search-input-INVLZQUERY-BIL_ID-1-value1').first().press('Tab');
  await waitAndClick(page.locator('.search-form-input > div > div > .el-input > .el-input__wrapper > .el-input__suffix > .el-input__suffix-inner').first());
  await waitAndClick(page.getByTestId('INVLZQUERY-SA'));
  await waitAndClick(page.getByTestId('dialog-search-input-INVLZQUERY-PS_NO-1-value1'));
  await page.getByTestId('dialog-search-input-INVLZQUERY-PS_NO-1-value1').fill(SANO72);
  await page.getByTestId('dialog-search-input-INVLZQUERY-PS_NO-1-value1').press('Tab');
  await waitAndClick(page.getByTestId('dialog-INVLZQUERY-Search-btn'));
  await waitAndClick(page.getByTestId('INVLZQUERY-gridOptions-B-column_0-row_0-checkbox-icon'));
  await waitAndClick(page.getByTestId('dialog-INVLZQUERY-確定-btn'));
  await waitAndClick(page.getByRole('button', { name: '查詢' }));
  await waitAndClick(page.getByTestId('INVLZQUERY-gridData-B-column_0-row_0-checkbox-icon'));
  //await waitAndClick(page.getByTestId('INVLZQUERY-gridData-B-column_0-row_1-checkbox-icon'));
  await waitAndClick(page.getByTestId('INVLZQUERY-biz-handle-btn'));
  await waitAndClick(page.getByRole('tab', { name: '單據明細 radio-group' }));
  await waitAndClick(page.getByTestId('INVLZQUERY-invlp_tab2').getByTestId('INVLZQUERY-radio-button-1'));
  await waitAndClick(page.getByTestId('INVLZQUERY-TF_LZ-B-QTY-row_0-cell-wrapper'));
  await page.getByTestId('INVLZQUERY-TF_LZ-B-QTY-row_0-input').fill('1.00');
  await page.getByTestId('INVLZQUERY-TF_LZ-B-QTY-row_0-input').press('Enter');
  await waitAndClick(page.getByRole('tab', { name: '發票 發票' }));
  await waitAndClick(page.getByTestId('INVLZQUERY-發票-btn'));
    //等待發票內容出現,但防偽驗證碼需先"確定"後出現
  await waitAndClick(page.getByTestId('dialog-INVLZQUERY-確定-btn'));
    //確定後才可檢查"防偽驗證碼",再次打開發票對話框確認資料正確   
  await waitAndClick(page.getByTestId('INVLZQUERY-發票-btn'));
//6.驗證發票對話框必填欄位（更長 timeout:15000）
    // 1.發票日期
    await expect(page.getByTestId('dialog-INVLZQUERY-H-INV_DD')).toHaveValue(TODAY_NOW, { timeout: 15000 });
    // 2.發票期別
    //console.log('invymstr=',invymstr)
    await expect(page.getByTestId('dialog-INVLZQUERY-H-INV_YM')).toHaveValue(invymstr, { timeout: 15000 });
    // 3.買受人統編
    await expect(page.getByTestId('dialog-INVLZQUERY-H-UNI_NO_BUY')).toHaveValue('87654322', { timeout: 15000 });
    // 4.買受人抬頭
    await expect(page.getByTestId('dialog-INVLZQUERY-H-TITLE_BUY')).toHaveValue('B2B 有限公司', { timeout: 15000 });
    // 5.營業人統編
    await expect(page.getByTestId('dialog-INVLZQUERY-H-UNI_NO_PAY')).toHaveValue('23724230', { timeout: 15000 });
    // 6.營業人抬頭
    await expect(page.getByTestId('dialog-INVLZQUERY-H-TITLE_PAY')).toHaveValue('ATTN Technology Co., Ltd.', { timeout: 15000 });
    // 7.發票別
    await expect(page.getByTestId('dialog-INVLZQUERY-H-METH_ID-input-inner')).toHaveValue('', { timeout: 15000 });
    // 8.扣抵別 
    await expect(page.getByTestId('dialog-INVLZQUERY-H-TAX_ID2-1-inner')).toHaveValue('1', { timeout: 15000 });
    // 9.稅別
    await expect(page.getByTestId('dialog-INVLZQUERY-H-TAX_ID1-1-inner')).toHaveValue('1', { timeout: 15000 });
    // 10.銷售金額---->檢查金額欄位（以字串為主）
    await expect(page.getByTestId('dialog-INVLZQUERY-H-AMT')).toHaveValue('10,000', { timeout: 15000 });
    // 11.稅額
    await expect(page.getByTestId('dialog-INVLZQUERY-H-TAX')).toHaveValue('500', { timeout: 15000 });
    // 12.合計
    await expect(page.getByTestId('dialog-INVLZQUERY-H-SUM_AMT')).toHaveValue('10,500', { timeout: 15000 });
    // 13.防偽隨機碼 (應為 4 碼數字)
    await expect(page.getByTestId('dialog-INVLZQUERY-H-RAND_NO')).toHaveValue(/^\d{4}$/, { timeout: 15000 });


    // 確定並存檔
  await waitAndClick(page.getByTestId('dialog-INVLZQUERY-確定-btn'));
  await waitAndClick(page.getByTestId('INVLZQUERY-upload-attach-preview-btn'));
  await waitAndClick(page.locator('div').filter({ hasText: '生成銷貨開票單' }).nth(4));
  await waitAndClick(page.getByTestId('dialog-INVLZQUERY-H-SAL_NO-icon-svg'));
  await waitAndClick(page.getByTestId('INVLZQUERY-gridOptions-B-column_0-row_0-btn'));
  await waitAndClick(page.getByTestId('dialog-INVLZQUERY-H-DEP-icon-svg'));
  //20260202 生成開票單時,已經帶入預設部門不再選擇其他部門
  await waitAndClick(page.getByTestId('DEPT-resize').locator('div').filter({ hasText: /^編輯關閉$/ }));
  await waitAndClick(page.getByTestId('DEPT-resize').getByRole('button', { name: '關閉' }));
  await waitAndClick(page.getByRole('button', { name: '確定' }));
  //await waitAndClick(page.getByTestId('DEPT-resize').getByTestId('INVLZQUERY-gridOptions-B-column_0-row_0-btn'));
  await page.waitForLoadState('networkidle');
  //await expect(page.getByText('存檔成功')).toBeVisible();
  //await page.waitForLoadState('networkidle');

    INVNOXX02 = await page.getByTestId('INVLZQUERY-INV_NO_LIST-B-INV_NO-row_0-cell-wrapper').textContent() || '';  // 儲存單號到INVNOXX02
    if (!INVNOXX02) throw new Error('Failed to get INVNOXX02');
    dataStorage.setValue('INVNOXX02', INVNOXX02); // 存到dataStorage以便其他測試案例使用
    await page.waitForLoadState('networkidle');

    LONO702 = await page.getByTestId('INVLZQUERY-TF_LZ-B-LZ_NO-row_0-cell-wrapper').locator('a').textContent() || '';  // 儲存單號到LONO702
    if (!LONO702) throw new Error('Failed to get LONO702');
    dataStorage.setValue('LONO702', LONO702); // 存到dataStorage以便其他測試案例使用
    await page.waitForLoadState('networkidle');

  // 離開銷貨開票處理頁面
    await waitAndClick(page.getByTestId('INVLZQUERY-exit2-btn'));

    
//************************************************銷貨開票處理-新增LONO703-銷貨單表身轉入2ND ************************************/
await page.goto('#/mon/InvLZQuery');
await page.waitForLoadState('networkidle');
await expect(page.getByRole('dialog', { name: '錯誤' }), '檢測進入"銷貨開票處理"頁面沒有報錯').not.toBeVisible();
await waitAndClick(page.getByRole('radiogroup', { name: 'radio-group' }).getByTestId('INVLZQUERY-radio-button-1'));
await waitAndClick(page.getByRole('button', { name: '全部' }));
await waitAndClick(page.locator('div').filter({ hasText: /^快速過濾$/ }).first());
await waitAndClick(page.getByTestId('search-input-INVLZQUERY-BIL_ID-1-value1').first());
await page.getByTestId('search-input-INVLZQUERY-BIL_ID-1-value1').first().fill('SA');
await page.getByTestId('search-input-INVLZQUERY-BIL_ID-1-value1').first().press('Tab');
await waitAndClick(page.locator('.search-form-input > div > div > .el-input > .el-input__wrapper > .el-input__suffix > .el-input__suffix-inner').first());
await waitAndClick(page.getByTestId('INVLZQUERY-SA'));
await waitAndClick(page.getByTestId('dialog-search-input-INVLZQUERY-PS_NO-1-value1'));
await page.getByTestId('dialog-search-input-INVLZQUERY-PS_NO-1-value1').fill(SANO72);
await page.getByTestId('dialog-search-input-INVLZQUERY-PS_NO-1-value1').press('Tab');
await waitAndClick(page.getByTestId('dialog-INVLZQUERY-Search-btn'));
await page.waitForLoadState('networkidle');
await page.waitForTimeout(3000);
await waitAndClick(page.getByTestId('INVLZQUERY-gridOptions-B-column_0-row_0-checkbox-icon'));
await waitAndClick(page.getByTestId('dialog-INVLZQUERY-確定-btn'));
await waitAndClick(page.getByRole('button', { name: '查詢' }));
await waitAndClick(page.getByTestId('INVLZQUERY-gridData-B-column_0-row_0-checkbox-icon'));
  //await waitAndClick(page.getByTestId('INVLZQUERY-gridData-B-column_0-row_1-checkbox-icon'));
await waitAndClick(page.getByTestId('INVLZQUERY-biz-handle-btn'));
await waitAndClick(page.getByRole('tab', { name: '單據明細 radio-group' }));
await waitAndClick(page.getByTestId('INVLZQUERY-invlp_tab2').getByTestId('INVLZQUERY-radio-button-1'));
await waitAndClick(page.getByTestId('INVLZQUERY-TF_LZ-B-QTY-row_0-cell-wrapper'));
await page.getByTestId('INVLZQUERY-TF_LZ-B-QTY-row_0-input').fill('1.00');
await page.getByTestId('INVLZQUERY-TF_LZ-B-QTY-row_0-input').press('Enter');
  await waitAndClick(page.getByRole('tab', { name: '發票 發票' }));
  await waitAndClick(page.getByTestId('INVLZQUERY-發票-btn'));
    //等待發票內容出現,但防偽驗證碼需先"確定"後出現

await page.getByTestId('INVLZQUERY-發票-dialog').getByTestId('dialog-INVLZQUERY-確定-btn').click();
    //確定後才可檢查"防偽驗證碼",再次打開發票對話框確認資料正確   
await page.getByTestId('INVLZQUERY-發票-btn').click();
//6.驗證發票對話框必填欄位（更長 timeout:15000）
    // 1.發票日期
    await expect(page.getByTestId('dialog-INVLZQUERY-H-INV_DD')).toHaveValue(TODAY_NOW, { timeout: 15000 });
    // 2.發票期別
    //console.log('invymstr=',invymstr)
    await expect(page.getByTestId('dialog-INVLZQUERY-H-INV_YM')).toHaveValue(invymstr, { timeout: 15000 });
    // 3.買受人統編
    await expect(page.getByTestId('dialog-INVLZQUERY-H-UNI_NO_BUY')).toHaveValue('87654322', { timeout: 15000 });
    // 4.買受人抬頭
    await expect(page.getByTestId('dialog-INVLZQUERY-H-TITLE_BUY')).toHaveValue('B2B 有限公司', { timeout: 15000 });
    // 5.營業人統編
    await expect(page.getByTestId('dialog-INVLZQUERY-H-UNI_NO_PAY')).toHaveValue('23724230', { timeout: 15000 });
    // 6.營業人抬頭
    await expect(page.getByTestId('dialog-INVLZQUERY-H-TITLE_PAY')).toHaveValue('ATTN Technology Co., Ltd.', { timeout: 15000 });
    // 7.發票別
    await expect(page.getByTestId('dialog-INVLZQUERY-H-METH_ID-input-inner')).toHaveValue('', { timeout: 15000 });
    // 8.扣抵別 
    await expect(page.getByTestId('dialog-INVLZQUERY-H-TAX_ID2-1-inner')).toHaveValue('1', { timeout: 15000 });
    // 9.稅別
    await expect(page.getByTestId('dialog-INVLZQUERY-H-TAX_ID1-1-inner')).toHaveValue('1', { timeout: 15000 });
    // 10.銷售金額---->檢查金額欄位（以字串為主）
    await expect(page.getByTestId('dialog-INVLZQUERY-H-AMT')).toHaveValue('15,000', { timeout: 15000 });
    // 11.稅額
    await expect(page.getByTestId('dialog-INVLZQUERY-H-TAX')).toHaveValue('750', { timeout: 15000 });
    // 12.合計
    await expect(page.getByTestId('dialog-INVLZQUERY-H-SUM_AMT')).toHaveValue('15,750', { timeout: 15000 });
    // 13.防偽隨機碼 (應為 4 碼數字)
    await expect(page.getByTestId('dialog-INVLZQUERY-H-RAND_NO')).toHaveValue(/^\d{4}$/, { timeout: 15000 });

    // 確定並存檔
await page.getByTestId('INVLZQUERY-發票-dialog').getByTestId('dialog-INVLZQUERY-確定-btn').click();
  await waitAndClick(page.getByTestId('INVLZQUERY-upload-attach-preview-btn'));
  await waitAndClick(page.locator('div').filter({ hasText: '生成銷貨開票單' }).nth(4));
  await waitAndClick(page.getByTestId('dialog-INVLZQUERY-H-SAL_NO-icon-svg'));
  await waitAndClick(page.getByTestId('INVLZQUERY-gridOptions-B-column_0-row_0-btn'));
  await waitAndClick(page.getByTestId('dialog-INVLZQUERY-H-DEP-icon-svg'));
  //20260202 生成開票單時,已經帶入預設部門不再選擇其他部門
  await waitAndClick(page.getByTestId('DEPT-resize').locator('div').filter({ hasText: /^編輯關閉$/ }));
  await waitAndClick(page.getByTestId('DEPT-resize').getByRole('button', { name: '關閉' }));
  await waitAndClick(page.getByRole('button', { name: '確定' }));
  //await waitAndClick(page.getByTestId('DEPT-resize').getByTestId('INVLZQUERY-gridOptions-B-column_0-row_0-btn'));
  await page.waitForLoadState('networkidle');
  //await expect(page.getByText('存檔成功')).toBeVisible();
  //await page.waitForLoadState('networkidle');

    INVNOXX03 = await page.getByTestId('INVLZQUERY-INV_NO_LIST-B-INV_NO-row_0-cell-wrapper').textContent() || '';  // 儲存單號到INVNOXX03
    if (!INVNOXX03) throw new Error('Failed to get INVNOXX03');
    dataStorage.setValue('INVNOXX03', INVNOXX03); // 存到dataStorage以便其他測試案例使用
    await page.waitForLoadState('networkidle');

    LONO703 = await page.getByTestId('INVLZQUERY-TF_LZ-B-LZ_NO-row_0-cell-wrapper').locator('a').textContent() || '';  // 儲存單號到LONO703
    if (!LONO703) throw new Error('Failed to get LONO703');
    dataStorage.setValue('LONO703', LONO703); // 存到dataStorage以便其他測試案例使用
    await page.waitForLoadState('networkidle');

  // 離開銷貨開票處理頁面
    await waitAndClick(page.getByTestId('INVLZQUERY-exit2-btn'));

//************************************************LONO703-銷貨單發票INVXX03修改-統一編號/未稅/稅金/含稅 ********************************************/
  await page.goto(`#/mon/invlz/LO/${LONO703}`);
  await page.waitForLoadState('networkidle');
  await expect(page.getByRole('dialog', { name: '錯誤' }), '檢測進入"銷貨開票處理"頁面沒有報錯').not.toBeVisible();
  await waitAndClick(page.getByTestId('INVLZ-TF_LZ-B-UP_ZG-row_0-cell-wrapper'));
  await page.getByTestId('INVLZ-TF_LZ-B-UP_ZG-row_0-input').fill('10000');
  await page.getByTestId('INVLZ-TF_LZ-B-UP_ZG-row_0-input').press('Tab');
  await waitAndClick(page.getByTestId('INVLZ-radio-button-3'));
  await waitAndClick(page.getByTestId('INVLZ-發票-btn'));
  await waitAndClick(page.getByTestId('dialog-INVLZ-H-UNI_NO_BUY'));
  await page.getByTestId('dialog-INVLZ-H-UNI_NO_BUY').fill('87654327');
  await page.getByTestId('dialog-INVLZ-H-UNI_NO_BUY').press('Enter');
  await waitAndClick(page.getByTestId('dialog-INVLZ-H-AMT'));
  await page.getByTestId('dialog-INVLZ-H-AMT').fill('10,000');
  await page.getByTestId('dialog-INVLZ-H-AMT').press('Tab');
  await waitAndClick(page.getByTestId('dialog-INVLZ-H-TAX'));
  await page.getByTestId('dialog-INVLZ-H-TAX').fill('500');
  await page.getByTestId('dialog-INVLZ-H-TAX').press('Enter');
  await waitAndClick(page.getByTestId('dialog-INVLZ-確定-btn'));
  await page.getByTestId('INVLZ-發票-btn').click();
    //等待發票內容出現,但防偽驗證碼需先"確定"後出現
  await waitAndClick(page.getByTestId('dialog-INVLZ-確定-btn'));
    //確定後才可檢查"防偽驗證碼",再次打開發票對話框確認資料正確 
  await page.getByTestId('INVLZ-發票-btn').click();
//6.驗證發票對話框必填欄位（更長 timeout:15000）
    // 1.發票日期
    await expect(page.getByTestId('dialog-INVLZ-H-INV_DD')).toHaveValue(TODAY_NOW, { timeout: 15000 });
    // 2.發票期別
    //console.log('invymstr=',invymstr)
    await expect(page.getByTestId('dialog-INVLZ-H-INV_YM')).toHaveValue(invymstr, { timeout: 15000 });
    // 3.買受人統編
    await expect(page.getByTestId('dialog-INVLZ-H-UNI_NO_BUY')).toHaveValue('87654327', { timeout: 15000 });
    // 4.買受人抬頭
    await expect(page.getByTestId('dialog-INVLZ-H-TITLE_BUY')).toHaveValue('B2B 有限公司', { timeout: 15000 });
    // 5.營業人統編
    await expect(page.getByTestId('dialog-INVLZ-H-UNI_NO_PAY')).toHaveValue('23724230', { timeout: 15000 });
    // 6.營業人抬頭
    await expect(page.getByTestId('dialog-INVLZ-H-TITLE_PAY')).toHaveValue('ATTN Technology Co., Ltd.', { timeout: 15000 });
    // 7.發票別
    await expect(page.getByTestId('dialog-INVLZ-H-METH_ID-input-inner')).toHaveValue('', { timeout: 15000 });
    // 8.扣抵別 
    await expect(page.getByTestId('dialog-INVLZ-H-TAX_ID2-1-inner')).toHaveValue('1', { timeout: 15000 });
    // 9.稅別
    await expect(page.getByTestId('dialog-INVLZ-H-TAX_ID1-1-inner')).toHaveValue('1', { timeout: 15000 });
    // 10.銷售金額---->檢查金額欄位（以字串為主）
    await expect(page.getByTestId('dialog-INVLZ-H-AMT')).toHaveValue('10,000', { timeout: 15000 });
    // 11.稅額
    await expect(page.getByTestId('dialog-INVLZ-H-TAX')).toHaveValue('500', { timeout: 15000 });
    // 12.合計
    await expect(page.getByTestId('dialog-INVLZ-H-SUM_AMT')).toHaveValue('10,500', { timeout: 15000 });
    // 13.防偽隨機碼 (應為 4 碼數字)
    await expect(page.getByTestId('dialog-INVLZ-H-RAND_NO')).toHaveValue(/^\d{4}$/, { timeout: 15000 });
    // 確定並存檔
  await waitAndClick(page.getByTestId('dialog-INVLZ-確定-btn'));
  await waitAndClick(page.getByTestId('INVLZ-save-btn'));
  await expect(page.getByText('存檔成功')).toBeVisible();
  await page.waitForLoadState('networkidle');


  //離開銷貨開票頁面
  await waitAndClick(page.getByTestId('INVLZ-exit2-btn'));
  
    //************************************************LONO703-銷貨單發票INVXX03刪除 **************************************************/
    await page.goto(`#/mon/invlz/LO/${LONO703}`);
    await page.waitForLoadState('networkidle');
    await expect(page.getByRole('dialog', { name: '錯誤' }), '檢測進入"銷貨開票"頁面沒有報錯').not.toBeVisible();
    await waitAndClick(page.getByTestId('INVLZ-radio-button-3'));
    await waitAndClick(page.getByTestId('INVLZ-發票-btn'));
    await waitAndClick(page.getByTestId('dialog-INVLZ-刪除-btn'));
    await waitAndClick(page.locator('div').filter({ hasText: '詢問' }).nth(3));
    await waitAndClick(page.getByRole('button', { name: '確定' }).nth(1));
    await waitAndClick(page.getByTestId('INVLZ-save-btn'));
    await expect(page.getByText('存檔成功')).toBeVisible();

  //離開銷貨開票頁面
  await waitAndClick(page.getByTestId('INVLZ-exit2-btn'));

//************************************************銷貨開票-修改LONO703-新增發票 INVXX03********************************************/
await page.goto(`#/mon/invlz/LO/${LONO703}`);
await page.waitForLoadState('networkidle');
await expect(page.getByRole('dialog', { name: '錯誤' }), '檢測進入"銷貨開票"頁面沒有報錯').not.toBeVisible();
await waitAndClick(page.getByTestId('INVLZ-radio-button-3'));
await waitAndClick(page.getByTestId('INVLZ-發票-btn'));
await page.getByTestId('dialog-INVLZ-H-INV_ID-input-inner').press('Tab');
//因確定後才可檢測發票欄位值,且系統發票視窗關閉反應快,故再開啟後檢測
await waitAndClick(page.getByTestId('dialog-INVLZ-確定-btn'));
await waitAndClick(page.getByTestId('INVLZ-發票-btn'));

    // ============驗證發票對話框必填欄位（更長 timeout:15000）
    // 1.發票日期
    await expect(page.getByTestId('dialog-INVLZ-H-INV_DD')).toHaveValue(TODAY_NOW, { timeout: 15000 });
    // 2.發票期別
    //console.log('invymstr=',invymstr)
    await expect(page.getByTestId('dialog-INVLZ-H-INV_YM')).toHaveValue(invymstr, { timeout: 15000 });
    // 3.買受人統編
    await expect(page.getByTestId('dialog-INVLZ-H-UNI_NO_BUY')).toHaveValue('87654322', { timeout: 15000 });
    // 4.買受人抬頭
    await expect(page.getByTestId('dialog-INVLZ-H-TITLE_BUY')).toHaveValue('B2B 有限公司', { timeout: 15000 });
    // 5.營業人統編
    await expect(page.getByTestId('dialog-INVLZ-H-UNI_NO_PAY')).toHaveValue('23724230', { timeout: 15000 });
    // 6.營業人抬頭
    await expect(page.getByTestId('dialog-INVLZ-H-TITLE_PAY')).toHaveValue('ATTN Technology Co., Ltd.', { timeout: 15000 });
    // 7.發票別
    await expect(page.getByTestId('dialog-INVLZ-H-METH_ID-input-inner')).toHaveValue('', { timeout: 15000 });
    // 8.扣抵別 
    await expect(page.getByTestId('dialog-INVLZ-H-TAX_ID2-1-inner')).toHaveValue('1', { timeout: 15000 });
    // 9.稅別
    await expect(page.getByTestId('dialog-INVLZ-H-TAX_ID1-1-inner')).toHaveValue('1', { timeout: 15000 });
    // 10.銷售金額---->檢查金額欄位（以字串為主）
    await expect(page.getByTestId('dialog-INVLZ-H-AMT')).toHaveValue('10,000', { timeout: 15000 });
    // 11.稅額
    await expect(page.getByTestId('dialog-INVLZ-H-TAX')).toHaveValue('500', { timeout: 15000 });
    // 12.合計
    await expect(page.getByTestId('dialog-INVLZ-H-SUM_AMT')).toHaveValue('10,500', { timeout: 15000 });
    // 13.防偽隨機碼 (應為 4 碼數字)
    await expect(page.getByTestId('dialog-INVLZ-H-RAND_NO')).toHaveValue(/^\d{4}$/, { timeout: 15000 });
    // 確定並存檔
await waitAndClick(page.getByTestId('dialog-INVLZ-確定-btn'));
await waitAndClick(page.getByTestId('INVLZ-save-btn'));
await expect(page.getByText('存檔成功')).toBeVisible();
//取得新發票號碼
    INVNOXX03 = await page.getByTestId('INVLZ-INV_NO_LIST-B-INV_NO-row_0-cell-wrapper').locator('a').textContent() || '';  // 儲存單號到INVNOXX03
    if (!INVNOXX03) throw new Error('Failed to get INVNOXX03');
    dataStorage.setValue('INVNOXX03', INVNOXX03); // 存到dataStorage以便其他測試案例使用
    await page.waitForLoadState('networkidle');
//離開銷貨開票頁面
  await waitAndClick(page.getByTestId('INVLZ-exit2-btn'));


//************************************************作廢銷貨發票INVNOXX03***********************************************************/
await page.goto('#/inv/invbatchnullify/list');
await page.waitForLoadState('networkidle');
await expect(page.getByRole('dialog', { name: '錯誤' }), '檢測進入"作廢銷貨發票"頁面沒有報錯').not.toBeVisible();
await waitAndClick(page.getByTestId('search-input-INVBATCHNULLIFY-INV_NO-1-value1'));
await page.getByTestId('search-input-INVBATCHNULLIFY-INV_NO-1-value1').fill(INVNOXX03);
await page.getByTestId('search-input-INVBATCHNULLIFY-INV_NO-1-value1').press('Enter');
await waitAndClick(page.getByTestId('search-form-INVBATCHNULLIFY-Search-btn'));
await waitAndClick(page.getByTestId('INVBATCHNULLIFY-INV_NO-B-column_0-row_0-checkbox-icon'));
await waitAndClick(page.getByTestId('INVBATCHNULLIFY-generate-bill-btn'));
await waitAndClick(page.getByTestId('INVBATCHNULLIFY-發票作廢畫面-dialog').locator('header'));
await waitAndClick(page.getByTestId('dialog-INVBATCHNULLIFY-H-PRJ_NO'));
await page.getByTestId('dialog-INVBATCHNULLIFY-H-PRJ_NO').fill('SANO72');
await page.getByTestId('dialog-INVBATCHNULLIFY-H-PRJ_NO').press('Tab');
await waitAndClick(page.getByTestId('dialog-INVBATCHNULLIFY-H-CANCEL_REM'));
await page.getByTestId('dialog-INVBATCHNULLIFY-H-CANCEL_REM').fill('SANO72LO702LO703');
await page.getByTestId('dialog-INVBATCHNULLIFY-H-CANCEL_REM').press('Tab');
await waitAndClick(page.getByTestId('dialog-INVBATCHNULLIFY-確定-btn'));
await expect(page.getByText('發票已作癈!')).toBeVisible();
// 退出作廢銷貨發票頁面
await waitAndClick(page.getByTestId('INVBATCHNULLIFY-exit2-btn'));

//************************************************銷貨開票-修改LONO703-再新增發票 INVXX03********************************************/
await page.goto(`#/mon/invlz/LO/${LONO703}`);
await page.waitForLoadState('networkidle');
await expect(page.getByRole('dialog', { name: '錯誤' }), '檢測進入"銷貨開票"頁面沒有報錯').not.toBeVisible();
await waitAndClick(page.getByTestId('INVLZ-radio-button-3'));
await waitAndClick(page.getByTestId('INVLZ-發票-btn'));
await page.getByTestId('dialog-INVLZ-H-INV_ID-input-inner').press('Tab');
//因確定後才可檢測發票欄位值,且系統發票視窗關閉反應快,故再開啟後檢測
await waitAndClick(page.getByTestId('dialog-INVLZ-確定-btn'));
await waitAndClick(page.getByTestId('INVLZ-發票-btn'));

    // ============驗證發票對話框必填欄位（更長 timeout:15000）
    // 1.發票日期
    await expect(page.getByTestId('dialog-INVLZ-H-INV_DD')).toHaveValue(TODAY_NOW, { timeout: 15000 });
    // 2.發票期別
    //console.log('invymstr=',invymstr)
    await expect(page.getByTestId('dialog-INVLZ-H-INV_YM')).toHaveValue(invymstr, { timeout: 15000 });
    // 3.買受人統編
    await expect(page.getByTestId('dialog-INVLZ-H-UNI_NO_BUY')).toHaveValue('87654322', { timeout: 15000 });
    // 4.買受人抬頭
    await expect(page.getByTestId('dialog-INVLZ-H-TITLE_BUY')).toHaveValue('B2B 有限公司', { timeout: 15000 });
    // 5.營業人統編
    await expect(page.getByTestId('dialog-INVLZ-H-UNI_NO_PAY')).toHaveValue('23724230', { timeout: 15000 });
    // 6.營業人抬頭
    await expect(page.getByTestId('dialog-INVLZ-H-TITLE_PAY')).toHaveValue('ATTN Technology Co., Ltd.', { timeout: 15000 });
    // 7.發票別
    await expect(page.getByTestId('dialog-INVLZ-H-METH_ID-input-inner')).toHaveValue('', { timeout: 15000 });
    // 8.扣抵別 
    await expect(page.getByTestId('dialog-INVLZ-H-TAX_ID2-1-inner')).toHaveValue('1', { timeout: 15000 });
    // 9.稅別
    await expect(page.getByTestId('dialog-INVLZ-H-TAX_ID1-1-inner')).toHaveValue('1', { timeout: 15000 });
    // 10.銷售金額---->檢查金額欄位（以字串為主）
    await expect(page.getByTestId('dialog-INVLZ-H-AMT')).toHaveValue('10,000', { timeout: 15000 });
    // 11.稅額
    await expect(page.getByTestId('dialog-INVLZ-H-TAX')).toHaveValue('500', { timeout: 15000 });
    // 12.合計
    await expect(page.getByTestId('dialog-INVLZ-H-SUM_AMT')).toHaveValue('10,500', { timeout: 15000 });
    // 13.防偽隨機碼 (應為 4 碼數字)
    await expect(page.getByTestId('dialog-INVLZ-H-RAND_NO')).toHaveValue(/^\d{4}$/, { timeout: 15000 });
    // 確定並存檔
await waitAndClick(page.getByTestId('dialog-INVLZ-確定-btn'));
await waitAndClick(page.getByTestId('INVLZ-save-btn'));
await expect(page.getByText('存檔成功')).toBeVisible();
//取得新發票號碼存入INVXX03
    INVNOXX03 = await page.getByTestId('INVLZ-INV_NO_LIST-B-INV_NO-row_0-cell-wrapper').locator('a').textContent() || '';  // 儲存單號到INVNOXX03
    if (!INVNOXX03) throw new Error('Failed to get INVNOXX03');
    dataStorage.setValue('INVNOXX03', INVNOXX03); // 存到dataStorage以便其他測試案例使用
    await page.waitForLoadState('networkidle');
//離開銷貨開票頁面
await waitAndClick(page.getByTestId('INVLZ-exit2-btn'));


//************************************************刪除銷貨開票LONO702與INVXX02****************************************************/
await page.goto(`#/mon/invlz/LO/${LONO702}`);
await page.waitForLoadState('networkidle');
await expect(page.getByRole('dialog', { name: '錯誤' }), '檢測進入"銷貨開票"頁面沒有報錯').not.toBeVisible();
await waitAndClick(page.getByTestId('INVLZ-delete-btn'));
await waitAndClick(page.locator('div').filter({ hasText: '提示' }).nth(3));
await waitAndClick(page.getByRole('button', { name: '確定' }));
await expect(page.getByText('刪除成功')).toBeVisible({ timeout: 30000 });  
await page.waitForTimeout(5000);

//離開銷貨開票頁面
await page.waitForLoadState('networkidle');
await waitAndClick(page.getByTestId('INVLZ-exit2-btn'));

//************************************************刪除銷貨開票LONO703與INVXX03****************************************************/
await page.goto(`#/mon/invlz/LO/${LONO703}`);
await page.waitForLoadState('networkidle');
await expect(page.getByRole('dialog', { name: '錯誤' }), '檢測進入"銷貨開票"頁面沒有報錯').not.toBeVisible();
await waitAndClick(page.getByTestId('INVLZ-delete-btn'));
await waitAndClick(page.locator('div').filter({ hasText: '提示' }).nth(3));
await waitAndClick(page.getByRole('button', { name: '確定' }));
await expect(page.getByText('刪除成功')).toBeVisible({ timeout: 30000 }); 
await page.waitForTimeout(5000);

//離開銷貨開票頁面
await page.waitForLoadState('networkidle');
await waitAndClick(page.getByTestId('INVLZ-exit2-btn')); 


//************************************************刪除銷貨單SANO72*****************************************************
await page.goto(`#/inv/invsa/${SANO72}`);
await page.waitForLoadState('networkidle');
await expect(page.getByRole('dialog', { name: '錯誤' }), '檢測進入"銷貨單"頁面沒有報錯').not.toBeVisible();
await waitAndClick(page.getByTestId('DRPSA-tabset').getByTestId('DRPSA-radio-button-1'));
await waitAndClick(page.getByTestId('DRPSA-delete-btn'));
await waitAndClick(page.locator('div').filter({ hasText: '提示' }).nth(3));
await waitAndClick(page.getByRole('button', { name: '確定' }));
await expect(page.getByText('刪除成功')).toBeVisible({ timeout: 30000 });  

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
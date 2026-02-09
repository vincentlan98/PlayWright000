import { test, expect } from '@playwright/test';
import { dataStorage } from '@playwright/test-utils/dataStorage';


//1.設定wait和click時的等待時間,執行時取用,節省重複程式碼,減少因系統執行逾時出現錯誤訊息而失敗
async function waitAndClick(locator: any, timeout = 30000) {
  await locator.waitFor({ state: 'visible', timeout });
  await locator.click();
}
//SA73->SB71->SA74->LO704->XX05作廢&XX06

test('080001-檢測銷貨單SA-銷項開票處理LO-銷退單SB-發票NO回寫', async ({ page }) => {
  try {
//2.設定變量:a. 單號 b. 今天日期-TODAY_NOW c. 發票期別 - invymstr
    let SANOQ00 = '';
    let SBNOQ00 = '';
    let LONOQ00 = '';
    let INVNOXXQ00 = '';
    let TODAY = new Date();
    let YYYY = TODAY.getFullYear().toString().slice(-4);
    let MM = (TODAY.getMonth() + 1).toString().padStart(2, '0');
    let DD = TODAY.getDate().toString().padStart(2, '0');
    let TODAY_NOW: string;
    TODAY_NOW = `${YYYY}-${MM}-${DD}`;
    let invmm:number=parseInt(MM)%2===0?parseInt(MM):parseInt(MM)+1;
    let invymstr:string=invmm<10?`${YYYY}0${invmm.toString()}`:`${YYYY}${invmm.toString()}`;


//*****************************************新增銷貨單SANOQ00***********************************************************/
await page.goto('#/inv/invsa');
//3.檢測進入頁面錯誤  
  await page.waitForLoadState('networkidle');
  await expect(page.getByRole('dialog', { name: '進入"銷貨單"頁面時錯誤' })).not.toBeVisible();
  await waitAndClick(page.getByTestId('DRPSA-H-PS_DD'));
  await page.getByTestId('DRPSA-H-PS_DD').press('Enter');
  await page.getByTestId('DRPSA-H-PS_NO').press('Enter');
  await waitAndClick(page.getByTestId('DRPSA-H-CUS_NO-icon-svg'));
  await waitAndClick(page.getByTestId('dialog-search-input-DRPSA-CUS_NO-1-value1'));
  await page.getByTestId('dialog-search-input-DRPSA-CUS_NO-1-value1').fill('BTOB');
  await waitAndClick(page.getByTestId('dialog-DRPSA-Search-btn'));
  await waitAndClick(page.getByTestId('DRPSA-gridOptions-B-column_0-row_0-btn'));
  await page.getByTestId('DRPSA-H-CUS_NO').press('Tab');

// 等待後端處理與畫面更新
    await page.waitForLoadState('networkidle');
//3.1 表頭重要欄位檢測
    await expect(page.getByTestId('DRPSA-H-CUS_NO')).toHaveValue('B2B 有限公司', { timeout: 15000 });
//3.2 檢測客戶扣稅類別與立帳方式 ---有些元素不是 input，改用包含或文本檢查
    await expect(page.getByTestId('DRPSA-H-TAX_ID-input-inner')).toHaveValue('3.應稅外加', { timeout: 15000 });
    await expect(page.getByTestId('DRPSA-H-ZHANG_ID-input-inner')).toHaveValue('1.單張立帳', { timeout: 15000 });

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
  await page.getByTestId('DRPSA-invsa_tab1').getByTestId('DRPSA-H-REM').fill('PLAYWRIRHT-銷項-39電子發票-BtoB-應稅外加-銷項開票-新增銷貨單銷貨退回-銷貨開票');
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
  await expect(page.getByText('存檔成功')).toBeVisible({ timeout: 30000 });
  // 儲存單號到SANOQ00
    SANOQ00 = await page.getByTestId('DRPSA-H-PS_NO').inputValue();  // 儲存單號到SANOQ00
    if (!SANOQ00) throw new Error('Failed to get SANOQ00');
    dataStorage.setValue('SANOQ00', SANOQ00); // 存到dataStorage以便其他測試案例使用
    await page.waitForLoadState('networkidle');
  // 離開銷貨單頁面
  await page.getByTestId('DRPSA-exit2-btn').click();


  
  //************************************************銷貨開票處理-新增LONOQ00-銷貨單全轉入************************************/
  await page.goto('#/mon/InvLZQuery');
  await waitAndClick(page.getByText('開票方式：明細開票彙總開票'));
  await waitAndClick(page.getByRole('radiogroup', { name: 'radio-group' }).getByTestId('INVLZQUERY-radio-button-1'));
  await waitAndClick(page.getByText('快速過濾').first());
  await waitAndClick(page.locator('div').filter({ hasText: /^快速過濾$/ }).first());
  await page.getByTestId('search-input-INVLZQUERY-BIL_ID-1-value1-dropdown').first().click();
  await page.getByTestId('search-input-INVLZQUERY-BIL_ID-1-value1-DATAEX').click(); //選擇系統單據
  await page.getByTestId('INVLZQUERY-gridOptions-B-column_0-row_5-checkbox-icon').click();  //選擇銷貨單
  await page.getByTestId('INVLZQUERY-gridOptions-B-column_0-row_6-checkbox-icon').click();  //選擇銷退單
  await page.getByTestId('dialog-INVLZQUERY-確定-btn').click();
  //輸入單據號碼欄位,因無法輸入三筆,故分三次輸入查詢-1筆
  await waitAndClick(page.getByTestId('search-name-INVLZQUERY-BIL_NO-1-icon-svg').first());
  await waitAndClick(page.getByRole('tooltip', { name: '單據號碼 單據別 單據日期 客戶代號 部門代號 部門名稱 銷貨單 銷貨退回 銷貨折讓 借出單 借出還入 其他收入 安裝完工 外修完工 單據名稱 客戶名稱 幣別 ' }).getByTestId('search-name-INVLZQUERY-BIL_NO-1-option-BIL_NO-text'));
  await waitAndClick(page.getByTestId('search-operator-INVLZQUERY-BIL_NO-1-icon-svg').first());
  await waitAndClick(page.getByRole('tooltip', { name: '起止 等於 不等於 類似 在...中 不在...中 為空 不為空' }).getByTestId('search-operator-INVLZQUERY-BIL_NO-1-option-in-text'));
  await waitAndClick(page.locator('.search-form-input > div > div > .el-input > .el-input__wrapper > .el-input__suffix > .el-input__suffix-inner > .el-dropdown').first());
  await waitAndClick(page.getByTestId('INVLZQUERY-SA'));
  await waitAndClick(page.getByTestId('dialog-search-input-INVLZQUERY-PS_NO-1-value1'));
  await page.getByTestId('dialog-search-input-INVLZQUERY-PS_NO-1-value1').fill(SANOQ00);
  await page.getByTestId('dialog-search-input-INVLZQUERY-PS_NO-1-value1').press('Enter');
  await waitAndClick(page.getByTestId('MF_PSS-resize').getByTestId('INVLZQUERY-gridOptions-B-column_0-row_0-checkbox-icon'));
  await waitAndClick(page.getByTestId('dialog-INVLZQUERY-確定-btn'));
  await waitAndClick(page.getByRole('button', { name: '查詢' }));

  await waitAndClick(page.getByTestId('INVLZQUERY-gridData-B-column_0-row_0-checkbox-icon'));
  await waitAndClick(page.getByTestId('INVLZQUERY-gridData-B-column_0-row_1-checkbox-icon'));
  await waitAndClick(page.getByTestId('INVLZQUERY-biz-handle-btn'));
  await waitAndClick(page.getByRole('tab', { name: '單據明細 radio-group' }));
  await waitAndClick(page.getByTestId('INVLZQUERY-invlp_tab2').getByTestId('INVLZQUERY-radio-button-1'));
  await waitAndClick(page.getByTestId('INVLZQUERY-TF_LZ-B-QTY-row_0-cell-wrapper'));
  await page.getByTestId('INVLZQUERY-TF_LZ-B-QTY-row_0-input').fill('1.00');
  await waitAndClick(page.getByTestId('INVLZQUERY-TF_LZ-B-QTY-row_1-cell-wrapper'));
  await page.getByTestId('INVLZQUERY-TF_LZ-B-QTY-row_1-input').fill('1.00');
  await page.getByTestId('INVLZQUERY-TF_LZ-B-QTY-row_1-input').press('Enter');
  await waitAndClick(page.getByTestId('INVLZQUERY-發票-btn'));
  await page.getByTestId('dialog-INVLZQUERY-H-INV_ID-input-inner').press('Enter');
  await page.getByTestId('dialog-INVLZQUERY-H-INV_NO').press('Enter');
  await waitAndClick(page.getByTestId('dialog-INVLZQUERY-確定-btn'));
  await waitAndClick(page.getByTestId('INVLZQUERY-upload-attach-preview-btn'));
  //await waitAndClick(page.getByTestId('INVLZQUERY-upload-attach-preview-btn-sc'));
  await waitAndClick(page.locator('div').filter({ hasText: '生成銷貨開票單' }).nth(4));
  await waitAndClick(page.getByTestId('dialog-INVLZQUERY-H-SAL_NO-icon-svg'));
  await page.getByRole('row', { name: '選擇 1 A001 總經理' }).getByTestId('INVLZQUERY-gridOptions-B-column_0-row_0-btn').click();
  //await waitAndClick(page.getByTestId('INVLZQUERY-gridOptions-B-column_0-row_0-btn'));
  await waitAndClick(page.getByTestId('dialog-INVLZQUERY-H-DEP-icon-svg'));
  await page.getByRole('row', { name: '選擇 1 00000000 總經理' }).getByTestId('INVLZQUERY-gridOptions-B-column_0-row_0-btn').click();
  //await waitAndClick(page.getByTestId('DEPT-resize').getByTestId('INVLZQUERY-gridOptions-B-column_0-row_0-btn'));
  await waitAndClick(page.getByRole('button', { name: '確定' }));
  await expect(page.getByText('存檔成功')).toBeVisible();

  // ============驗證發票對話框必填欄位（更長 timeout:15000）
  await waitAndClick(page.getByTestId('INVLZQUERY-發票-btn'));
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
    await expect(page.getByTestId('dialog-INVLZQUERY-H-AMT')).toHaveValue('25,000', { timeout: 15000 });
    // 11.稅額
    await expect(page.getByTestId('dialog-INVLZQUERY-H-TAX')).toHaveValue('1,250', { timeout: 15000 });
    // 12.合計
    await expect(page.getByTestId('dialog-INVLZQUERY-H-SUM_AMT')).toHaveValue('26,250', { timeout: 15000 });
    // 13.防偽隨機碼 (應為 4 碼數字)
    //await expect(page.getByTestId('dialog-INVLZQUERY-H-RAND_NO')).toHaveValue(/^\d{4}$/, { timeout: 15000 });

    // 確定並存變量
    await waitAndClick(page.getByTestId('dialog-INVLZQUERY-確定-btn'));

    INVNOXXQ00 = await page.getByTestId('INVLZQUERY-INV_NO_LIST-B-INV_NO-row_0-cell-wrapper').textContent() || '';  // 儲存單號到INVNOXQ00
    if (!INVNOXXQ00) throw new Error('Failed to get INVNOXQ00');
    dataStorage.setValue('INVNOXXQ00', INVNOXXQ00); // 存到dataStorage以便其他測試案例使用
    await page.waitForLoadState('networkidle');

    LONOQ00 = await page.getByTestId('INVLZQUERY-TF_LZ-B-LZ_NO-row_0-cell-wrapper').locator('a').textContent() || '';  // 儲存單號到LONOQ00
    if (!LONOQ00) throw new Error('Failed to get LONOQ00');
    dataStorage.setValue('LONOQ00', LONOQ00); // 存到dataStorage以便其他測試案例使用
    await page.waitForLoadState('networkidle');

  // 離開銷貨開票處理頁面
    await waitAndClick(page.getByTestId('INVLZQUERY-exit2-btn'));



//****************************************************新增銷退SBNOQ00***********************************************************/
await page.goto('#/inv/invsb');
//3.檢測進入頁面錯誤  
  await page.waitForLoadState('networkidle');
  await expect(page.getByRole('dialog', { name: '進入"銷退單"頁面時錯誤' })).not.toBeVisible();
  await waitAndClick(page.getByTestId('DRPSB-H-PS_DD'));
  await page.getByTestId('DRPSB-H-PS_DD').press('Enter');
  await page.getByTestId('DRPSB-H-PS_NO').press('Enter');
  await waitAndClick(page.getByTestId('DRPSB-H-OS_NO'));
  await page.getByTestId('DRPSB-H-OS_NO').fill(SANOQ00);
  await page.getByTestId('DRPSB-H-OS_NO').press('Enter');
  await waitAndClick(page.locator('div').filter({ hasText: /^來源單$/ }).nth(1));
  await waitAndClick(page.getByTestId('DRPSB-UNKNOWN_TABLE-B-checkbox-icon').nth(1));
  await waitAndClick(page.getByTestId('DRPSB-UNKNOWN_TABLE-B-column_0-row_0-checkbox-icon'));
  await waitAndClick(page.getByTestId('dialog-DRPSB-確定-btn'));
// 等待後端處理與畫面更新
    await page.waitForLoadState('networkidle');
//3.1 表頭重要欄位檢測
    await expect(page.getByTestId('DRPSB-H-CUS_NO')).toHaveValue('B2B 有限公司', { timeout: 15000 });
//3.2 檢測客戶扣稅類別與立帳方式 ---有些元素不是 input，改用包含或文本檢查
    await expect(page.getByTestId('DRPSB-H-TAX_ID-input-inner')).toHaveValue('3.應稅外加', { timeout: 15000 });
    await expect(page.getByTestId('DRPSB-H-ZHANG_ID-input-inner')).toHaveValue('1.單張立帳', { timeout: 15000 });
  await waitAndClick(page.getByTestId('DRPSB-H-SAL_NO'));
  await waitAndClick(page.getByTestId('DRPSB-H-SAL_NO-icon-svg'));
  await waitAndClick(page.getByTestId('MF_YG-resize').getByTestId('DRPSB-gridOptions-B-column_0-row_0-btn'));
  await waitAndClick(page.getByTestId('DRPSB-H-DEP'));
  await waitAndClick(page.getByTestId('DRPSB-H-DEP-icon-svg'));
  await waitAndClick(page.getByTestId('DEPT-resize').getByTestId('DRPSB-gridOptions-B-column_0-row_0-btn'));
  await page.getByTestId('DRPSB-H-DEP').press('Enter');
  await waitAndClick(page.getByTestId('DRPSB-save-btn')); 

  // 等待成功訊息出現再導航
  await expect(page.getByText('存檔成功')).toBeVisible({ timeout: 30000 });
  // 儲存單號到SBNOQ00
    SBNOQ00 = await page.getByTestId('DRPSB-H-PS_NO').inputValue(); 
    if (!SBNOQ00) throw new Error('Failed to get SBNOQ00');
    dataStorage.setValue('SBNOQ00', SBNOQ00); // 存到dataStorage以便其他測試案例使用
    await page.waitForLoadState('networkidle');
    //await page.goto('#/inv/invsb/' + SBNO71);
  // 離開銷退單頁面
  await waitAndClick(page.getByTestId('DRPSB-exit2-btn'));




    //************************************************刪除銷貨開票LONQ00與INVXXQ00****************************************************/
    await page.goto(`#/mon/invlz/LO/${LONOQ00}`);
    await page.waitForLoadState('networkidle');
    await expect(page.getByRole('dialog', { name: '錯誤' }), '檢測進入"銷貨開票"頁面沒有報錯').not.toBeVisible();
    await waitAndClick(page.getByTestId('INVLZ-delete-btn'));
    await waitAndClick(page.locator('div').filter({ hasText: '提示' }).nth(3));
    await waitAndClick(page.getByRole('button', { name: '確定' }));
    await expect(page.getByText('刪除成功')).toBeVisible();
    await page.waitForLoadState('networkidle');
    
    // 離開銷貨開票處理頁面
    await waitAndClick(page.getByTestId('INVLZ-exit2-btn'));
    //await page.getByTestId('dialog-INVLZ-否(N)-btn').click();   


    //************************************************先刪除銷退單SBNOQ00*****************************************************
    await page.goto(`#/inv/invsb/${SBNOQ00}`);
    await page.waitForLoadState('networkidle');
    await expect(page.getByRole('dialog', { name: '錯誤' }), '檢測進入"銷貨單"頁面沒有報錯').not.toBeVisible();
    await waitAndClick(page.getByTestId('DRPSB-tabset').getByTestId('DRPSB-radio-button-1'));
    await waitAndClick(page.getByTestId('DRPSB-delete-btn'));
    await waitAndClick(page.locator('div').filter({ hasText: '提示' }).nth(3));
    await waitAndClick(page.getByRole('button', { name: '確定' }));
    await expect(page.getByText('刪除成功')).toBeVisible({ timeout: 30000 });  
    await page.waitForTimeout(500);
    
      await page.waitForLoadState('networkidle');
      // 離開銷退單頁面
      await waitAndClick(page.getByTestId('DRPSB-exit2-btn'));
    

    //************************************************刪除銷貨單SANOQ00*****************************************************
    await page.goto(`#/inv/invsa/${SANOQ00}`);
    await page.waitForLoadState('networkidle');
    await expect(page.getByRole('dialog', { name: '錯誤' }), '檢測進入"銷貨單"頁面沒有報錯').not.toBeVisible();
    await waitAndClick(page.getByTestId('DRPSA-tabset').getByTestId('DRPSA-radio-button-1'));
    await waitAndClick(page.getByTestId('DRPSA-delete-btn'));
    await waitAndClick(page.locator('div').filter({ hasText: '提示' }).nth(3));
    await waitAndClick(page.getByRole('button', { name: '確定' }));
    await expect(page.getByText('刪除成功')).toBeVisible({ timeout: 30000 });  
    await page.waitForTimeout(500);
    
      await page.waitForLoadState('networkidle');
      // 離開銷貨單頁面
      await waitAndClick(page.getByTestId('DRPSA-exit2-btn'));
    
    
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
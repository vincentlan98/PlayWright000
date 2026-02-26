import { test, expect } from '@playwright/test';
import { dataStorage } from '@playwright/test-utils/dataStorage';

//1.設定wait和click時的等待時間,執行時取用,節省重複程式碼,減少因系統執行逾時出現錯誤訊息而失敗
async function waitAndClick(locator: any, timeout = 30000) {
  await locator.waitFor({ state: 'visible', timeout });
  await locator.click();
}

//BX001->BXINVNO0060&0061新增&修改&檢測發票號碼---20260130K版
//20260130K版-1.CASN等欄位開啟時間延長或另行設定2.更改請款人元素名稱3.表頭單據類別必填4.表身新增a.起始日期(當日)b.結束日期(當日)
//檢測項目:
//4A.表頭各欄位檢測含搜尋欄位(報銷單);
//4AA1.表頭重要欄位值檢測-客戶名稱、備註顯示簡繁字體、扣稅類別與立帳方式(報銷單);
//4B.檢測表身欄位含搜尋欄位、批號、單位、包裝單位、摘要顯示簡繁字體(報銷單);  
//檢測1.修改第二項發票後,第一項發票點開號碼會被清空(修改報銷單)&
//檢測2.第二項改好後存檔,再開第一項改,不能改(修改報銷單);

test('PA213-報銷單001-INVNOTU060&TU061', async ({ page }) => {
  try {
//2.設定變量:a. 單號 b. 今天日期-TODAY_NOW c. 發票期別 - invymstr
    let BXNO001 = '';
    let INVNO060 = '';
    let INVNO061 = '';
    let TODAY = new Date();
    let YYYY = TODAY.getFullYear().toString().slice(-4);
    let MM = (TODAY.getMonth() + 1).toString().padStart(2, '0');
    let DD = TODAY.getDate().toString().padStart(2, '0');
    let TODAY_NOW: string;
    TODAY_NOW = `${YYYY}-${MM}-${DD}`;
    let invmm:number=parseInt(MM)%2===0?parseInt(MM):parseInt(MM)+1;
    let invymstr:string=invmm<10?`${YYYY}0${invmm.toString()}`:`${YYYY}${invmm.toString()}`;  
    
//****************************************************新增報銷單001***********************************************
  await page.goto('#/MON/MONBX');
//3.檢測進入頁面錯誤  
  await page.waitForLoadState('networkidle');
  await expect(page.getByRole('dialog', { name: '進入報銷單頁面時錯誤' })).not.toBeVisible();
  //表頭欄位填寫&檢測含搜尋欄位(關閉搜尋視窗)
  await waitAndClick(page.getByTestId('MONBX-add-btn'));
  await waitAndClick(page.getByTestId('MONBX-H-BX_DD-icon-svg-path'));
  await waitAndClick(page.getByTestId('MONBX-H-BX_DD'));
  //4A01.檢測表頭日期進入頁面錯誤  
  await page.waitForLoadState('networkidle');
  await expect(page.getByRole('dialog', { name: '進入報銷單表頭日期時錯誤' })).not.toBeVisible();
  await page.getByTestId('MONBX-H-BX_DD').press('Enter');
  await page.getByTestId('MONBX-H-BX_NO').press('Enter');
  await waitAndClick(page.getByTestId('MONBX-H-BIL_TYPE-input-wrapper'));
  await waitAndClick(page.getByTestId('MONBX-H-BIL_TYPE-icon-svg'));
  //4A02.檢測表頭單據類別進入頁面錯誤  -------------------------------------------20260129公司帳套必須選擇
  await page.waitForLoadState('networkidle');
  await expect(page.getByRole('dialog', { name: '進入報銷單表頭單據類別時錯誤' })).not.toBeVisible();
  //await waitAndClick(page.getByTestId('MONBX-H-BIL_TYPE-icon-svg'));
  await waitAndClick(page.getByTestId('BIL_TYPE_BX-resize').getByTestId('MONBX-gridOptions-B-column_0-row_0-cell'));
  await page.getByTestId('MONBX-H-BIL_TYPE').press('Enter');
  //await waitAndClick(page.locator('div').filter({ hasText: /^編輯關閉$/ }).getByTestId('dialog-MONBX-關閉-btn').first());
  await waitAndClick(page.getByTestId('MONBX-H-CAS_NO-input-wrapper'));
  await waitAndClick(page.getByTestId('MONBX-H-CAS_NO-icon-svg'));
  //4A03.檢測表頭工程案號進入頁面錯誤  
  await page.waitForLoadState('networkidle');
  await expect(page.getByRole('dialog', { name: '進入報銷單表頭工程案號時錯誤' })).not.toBeVisible();
  await waitAndClick(page.getByTestId('CASN-resize').locator('div').filter({ hasText: /^編輯關閉$/ }).first());
  // 增加等待時間確保對話框完全加載
  await page.waitForTimeout(500);
  const casCloseBtn = page.getByTestId('CASN-resize').getByTestId('dialog-MONBX-關閉-btn');
  await casCloseBtn.waitFor({ state: 'visible', timeout: 60000 });
  await casCloseBtn.click();
  await page.getByTestId('MONBX-H-CAS_NO').press('Enter');
  await waitAndClick(page.getByTestId('MONBX-H-CUR_ID-input-wrapper'));
  await waitAndClick(page.getByTestId('MONBX-H-CUR_ID-icon-svg'));
  //4A09.檢測表頭幣別設定的外幣代號進入頁面錯誤  
  await page.waitForLoadState('networkidle');
  await expect(page.getByRole('dialog', { name: '進入報銷單表頭幣別設定的外幣代號時錯誤' })).not.toBeVisible();
  await waitAndClick(page.getByTestId('dialog-MONBX-CUR_ID-input-wrapper'));
  await waitAndClick(page.getByTestId('dialog-MONBX-CUR_ID-icon-svg'));
  //4A09.檢測表頭幣別設定的外幣代號進入頁面錯誤  
  await page.waitForLoadState('networkidle');
  await expect(page.getByRole('dialog', { name: '進入報銷單表頭幣別設定的外幣代號時錯誤' })).not.toBeVisible();
  await waitAndClick(page.getByTestId('CUR_ID-resize').locator('div').filter({ hasText: /^編輯關閉$/ }));
  // 增加等待時間確保對話框完全加載
  await page.waitForTimeout(500);
  const curCloseBtn = page.getByTestId('CUR_ID-resize').getByRole('button', { name: '關閉' });
  await curCloseBtn.waitFor({ state: 'visible', timeout: 60000 });
  await curCloseBtn.click();
  await page.waitForLoadState('networkidle');
  await waitAndClick(page.locator('footer'));
  await page.waitForLoadState('networkidle');
  await page.getByTestId('dialog-MONBX-確定-btn').waitFor({ state: 'visible', timeout: 30000 });
  await waitAndClick(page.getByTestId('dialog-MONBX-確定-btn'));
  // 等待對話框完全關閉
  await page.waitForTimeout(1500);
  await page.waitForLoadState('networkidle');
  await waitAndClick(page.getByTestId('MONBX-H-USR_NO-input-wrapper'));
  // 確保輸入框獲得焦點後再點擊搜尋按鈕
  await page.waitForTimeout(500);
  await waitAndClick(page.getByTestId('MONBX-H-USR_NO-icon-svg'));
  //4A06.檢測表頭請款人進入頁面錯誤  
  // 等待搜尋對話框打開（通常有彈出層）
  await page.waitForTimeout(2000);
  await page.waitForLoadState('networkidle');
  // 更換請款人選擇按鍵元素名稱-------------------------------------------------------------------20260129版
  await waitAndClick(page.getByTestId('MF_YG-resize').getByTestId('MONBX-gridOptions-B-column_0-row_0-cell'));
  //await page.getByTestId('MONBX-gridOptions-B-column_0-row_0-btn').first();
  await page.getByTestId('MONBX-H-USR_NO').press('Enter');
  await waitAndClick(page.getByTestId('MONBX-H-DEP-input-wrapper'));
  await waitAndClick(page.getByTestId('MONBX-H-DEP-icon-svg'));
  //4A06.檢測表頭報銷部門進入頁面錯誤  
  await page.waitForLoadState('networkidle');
  await expect(page.getByRole('dialog', { name: '進入報銷單表頭報銷部門時錯誤' })).not.toBeVisible();
  await waitAndClick(page.getByTestId('DEPT-resize').getByTestId('MONBX-gridOptions-B-column_0-row_0-btn'));
  await page.getByTestId('MONBX-H-DEP').press('Enter');
  await waitAndClick(page.getByTestId('MONBX-H-REM-input-wrapper'));
  await waitAndClick(page.getByTestId('MONBX-H-REM'));
  await page.getByTestId('MONBX-H-REM').fill('簡繁體測試-帳目、變更、報表、日曆、檔案、資料庫');
  await page.getByTestId('MONBX-H-REM').press('Enter');
  await waitAndClick(page.getByTestId('MONBX-H-FILE_LIST-input-wrapper'));
  await waitAndClick(page.getByTestId('MONBX-H-FILE_LIST-icon-svg'));
  //4A06.檢測表頭附件進入頁面錯誤  
  await page.waitForLoadState('networkidle');
  await expect(page.getByRole('dialog', { name: '進入報銷單表頭附件時錯誤' })).not.toBeVisible();
  //await page.getByTestId('MONBX-附件上傳-dialog').click();
  await page.waitForLoadState('networkidle');
  await waitAndClick(page.locator('footer'));
  await page.waitForLoadState('networkidle');
  await page.getByTestId('dialog-MONBX-確定-btn').waitFor({ state: 'visible', timeout: 30000 });
  await waitAndClick(page.getByTestId('dialog-MONBX-確定-btn'));
  await waitAndClick(page.getByTestId('MONBX-invsa_tab2').getByTestId('MONBX-radio-button-1'));
  // 等待後端處理與畫面更新
  await page.waitForLoadState('networkidle');
  // ******進入表身之前,需先點擊表身第一欄的某個欄位
  await waitAndClick(page.locator('div').filter({ hasText: /^1$/ }).nth(2));
  await waitAndClick(page.getByTestId('MONBX-TF_BX-B-FEE_ID-row_0'));
  await waitAndClick(page.getByTestId('MONBX-TF_BX-B-FEE_ID-row_0-suffix-icon-svg'));
  //4B01.檢測表身品號進入頁面錯誤  
  await page.waitForLoadState('networkidle');
  await expect(page.getByRole('dialog', { name: '進入報銷單表頭品號時錯誤' })).not.toBeVisible();
  //選3個品號
  await waitAndClick(page.getByTestId('MONBX-gridOptions-B-column_0-row_0-checkbox-icon'));
  await waitAndClick(page.getByTestId('MONBX-gridOptions-B-column_0-row_1-checkbox-icon'));
  await waitAndClick(page.getByTestId('MONBX-gridOptions-B-column_0-row_2-checkbox-icon'));
  await page.waitForLoadState('networkidle');
  await waitAndClick(page.locator('div').filter({ hasText: /^編輯關閉確定$/ }));
  await page.waitForLoadState('networkidle');
  await waitAndClick(page.getByRole('button', { name: '確定' }));
  //await page.getByTestId('dialog-MONBX-確定-btn').waitFor({ state: 'visible', timeout: 30000 });
  //await waitAndClick(page.getByTestId('dialog-MONBX-確定-btn'));
  //await page.getByTestId('MONBX-TF_BX-B-FEE_ID-row_0-input').press('Enter');
  //金額填寫
  await waitAndClick(page.getByTestId('MONBX-TF_BX-B-AMT-row_0-input-wrapper'));
  await page.getByTestId('MONBX-TF_BX-B-AMT-row_0-input').fill('3,000');
  await page.getByTestId('MONBX-TF_BX-B-AMT-row_0-input').press('Enter');
  //選擇起始日期
  await waitAndClick(page.getByTestId('MONBX-TF_BX-B-SDAY-row_0-input-wrapper'));
  await page.getByTestId('MONBX-TF_BX-B-SDAY-row_0-input').fill(TODAY_NOW);
  await page.getByTestId('MONBX-TF_BX-B-SDAY-row_0-input').press('Enter');
  //選擇結束日期
  await waitAndClick(page.getByTestId('MONBX-TF_BX-B-EDAY-row_0-input-wrapper'));
  await page.getByTestId('MONBX-TF_BX-B-EDAY-row_0-input').fill(TODAY_NOW);
  await page.getByTestId('MONBX-TF_BX-B-EDAY-row_0-input').press('Enter');
  //4B01.檢測表身第一列扣稅類別進入頁面錯誤  
  await waitAndClick(page.getByTestId('MONBX-TF_BX-B-TAX_ID-row_0-icon-svg'));
  await page.waitForLoadState('networkidle');
  await expect(page.getByRole('dialog', { name: '進入報銷單表身第一列扣稅類別時錯誤' })).not.toBeVisible();
  await waitAndClick(page.getByTestId('MONBX-TF_BX-B-TAX_ID-row_0-select-option-3'));
  await page.getByTestId('MONBX-TF_BX-B-TAX_ID-row_0-input').press('Enter');
//第二列增加輸入-先訂位置
  await waitAndClick(page.locator('div').filter({ hasText: /^2$/ }).first());
  await waitAndClick(page.getByTestId('MONBX-TF_BX-B-AMT-row_1-cell-wrapper'));
  await page.getByTestId('MONBX-TF_BX-B-AMT-row_1-input').fill('1,500');
  await page.getByTestId('MONBX-TF_BX-B-AMT-row_1-input').press('Enter');
  //await waitAndClick(page.getByTestId('MONBX-TF_BX-B-TAX_ID-row_1-icon-svg'));
  //選擇起始日期
  await waitAndClick(page.getByTestId('MONBX-TF_BX-B-SDAY-row_1-input-wrapper'));
  await page.getByTestId('MONBX-TF_BX-B-SDAY-row_1-input').fill(TODAY_NOW);
  await page.getByTestId('MONBX-TF_BX-B-SDAY-row_1-input').press('Enter');
  //選擇結束日期
  await waitAndClick(page.getByTestId('MONBX-TF_BX-B-EDAY-row_1-input-wrapper'));
  await page.getByTestId('MONBX-TF_BX-B-EDAY-row_1-input').fill(TODAY_NOW);
  await page.getByTestId('MONBX-TF_BX-B-EDAY-row_1-input').press('Enter');
  //4B01.檢測表身第二列扣稅類別進入頁面錯誤  
  await waitAndClick(page.getByTestId('MONBX-TF_BX-B-TAX_ID-row_1-icon-svg'));
  await page.waitForLoadState('networkidle');
  await expect(page.getByRole('dialog', { name: '進入報銷單表身第二列扣稅類別時錯誤' })).not.toBeVisible();
  await waitAndClick(page.getByTestId('MONBX-TF_BX-B-TAX_ID-row_1-select-option-3'));
  await page.getByTestId('MONBX-TF_BX-B-TAX_ID-row_1-input').press('Enter');
//第三列增加輸入-先訂位置
  await waitAndClick(page.locator('div').filter({ hasText: /^3$/ }).first());
  await waitAndClick(page.getByTestId('MONBX-TF_BX-B-AMT-row_2-cell-wrapper'));
  await page.getByTestId('MONBX-TF_BX-B-AMT-row_2-input').fill('500');
  await page.getByTestId('MONBX-TF_BX-B-AMT-row_2-input').press('Enter');
  //await waitAndClick(page.getByTestId('MONBX-TF_BX-B-TAX_ID-row_2-icon-svg'));
  //選擇起始日期
  await waitAndClick(page.getByTestId('MONBX-TF_BX-B-SDAY-row_2-input-wrapper'));
  await page.getByTestId('MONBX-TF_BX-B-SDAY-row_2-input').fill(TODAY_NOW);
  await page.getByTestId('MONBX-TF_BX-B-SDAY-row_2-input').press('Enter');
  //選擇結束日期
  await waitAndClick(page.getByTestId('MONBX-TF_BX-B-EDAY-row_2-input-wrapper'));
  await page.getByTestId('MONBX-TF_BX-B-EDAY-row_2-input').fill(TODAY_NOW);
  await page.getByTestId('MONBX-TF_BX-B-EDAY-row_2-input').press('Enter');
  //4B01.檢測表身第三列扣稅類別進入頁面錯誤  
  await waitAndClick(page.getByTestId('MONBX-TF_BX-B-TAX_ID-row_2-icon-svg'));
  await page.waitForLoadState('networkidle');
  await expect(page.getByRole('dialog', { name: '進入報銷單表身第三列扣稅類別時錯誤' })).not.toBeVisible();
  await waitAndClick(page.getByTestId('MONBX-TF_BX-B-TAX_ID-row_2-select-option-3'));
  await page.getByTestId('MONBX-TF_BX-B-TAX_ID-row_2-input').press('Enter');
//再進入第一列增加發票輸入-先訂位置
  await waitAndClick(page.locator('div').filter({ hasText: /^1$/ }).first());
  await waitAndClick(page.getByTestId('MONBX-TF_BX-B-INV_NO-row_0-cell-wrapper'));
  await waitAndClick(page.getByTestId('MONBX-TF_BX-B-INV_NO-row_0-suffix-icon-svg'));
  await page.getByTestId('dialog-MONBX-H-INV_NO').fill('TU00000060');
  await page.getByTestId('dialog-MONBX-H-INV_NO').press('Enter');
  await waitAndClick(page.getByTestId('dialog-MONBX-H-METH_ID-icon-svg'));
  await waitAndClick(page.getByTestId('dialog-MONBX-H-METH_ID-option-01-text'));
  await page.waitForLoadState('networkidle');
  await waitAndClick(page.locator('footer'));
  await page.waitForLoadState('networkidle');
  await page.getByTestId('dialog-MONBX-確定-btn').waitFor({ state: 'visible', timeout: 30000 });
  await waitAndClick(page.getByTestId('dialog-MONBX-確定-btn'));
  await page.getByTestId('MONBX-TF_BX-B-INV_NO-row_0-input').press('Enter');
//再進入第二列增加發票輸入-先訂位置
  await waitAndClick(page.locator('div').filter({ hasText: /^2$/ }).first());
  await waitAndClick(page.getByTestId('MONBX-TF_BX-B-INV_NO-row_1-cell'));
  await waitAndClick(page.getByTestId('MONBX-TF_BX-B-INV_NO-row_1-suffix-icon-svg'));
  await page.getByTestId('dialog-MONBX-H-INV_NO').fill('TU00000061');
  await page.getByTestId('dialog-MONBX-H-INV_NO').press('Enter');
  await waitAndClick(page.getByTestId('dialog-MONBX-H-METH_ID-icon-svg'));
  await waitAndClick(page.getByTestId('dialog-MONBX-H-METH_ID-option-01-text'));
  await page.waitForLoadState('networkidle');
  await waitAndClick(page.locator('footer'));
  await page.waitForLoadState('networkidle');
  await page.getByTestId('dialog-MONBX-確定-btn').waitFor({ state: 'visible', timeout: 30000 });
  await waitAndClick(page.getByTestId('dialog-MONBX-確定-btn'));
  await waitAndClick(page.getByTestId('MONBX-save-btn'));
  await page.waitForLoadState('networkidle');
  // 等待成功訊息出現再導航
  await expect(page.getByText('存檔成功')).toBeVisible({ timeout: 30000 });

  // 儲存單號到BXNO001,第一列發票號碼到INVNO060,第二列發票號碼到INVNO061// 存到dataStorage以便其他測試案例使用
  BXNO001 = await page.getByTestId('MONBX-H-BX_NO').inputValue(); 
  if (!BXNO001) throw new Error('Failed to get BXNO001');
  dataStorage.setValue('BXNO001', BXNO001); 

// 離開報銷單頁面
  await waitAndClick(page.getByTestId('MONBX-exit2-btn'));
  await page.waitForTimeout(1000);


//***************************************修改報銷單-1-修改表身第二列金額與發票後,檢測第一列發票號碼是否消失***********************************************
    await page.goto(`#/MON/MONBX/${BXNO001}`);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    await expect(page.getByRole('dialog', { name: '錯誤' }), '檢測進入受訂單頁面沒有報錯').not.toBeVisible();  
    await waitAndClick(page.getByTestId('MONBX-invsa_tab2').getByTestId('MONBX-radio-button-1'));
    await waitAndClick(page.locator('div').filter({ hasText: /^2$/ }).first());
    await waitAndClick(page.getByTestId('MONBX-TF_BX-B-AMT-row_1-cell-wrapper'));
    await waitAndClick(page.getByTestId('MONBX-TF_BX-B-AMT-row_1-cell'));
    await waitAndClick(page.getByTestId('MONBX-TF_BX-B-AMT-row_1-input'));
    await page.getByTestId('MONBX-TF_BX-B-AMT-row_1-input').fill('1,200');
    await page.getByTestId('MONBX-TF_BX-B-AMT-row_1-input').press('Enter');
    await waitAndClick(page.getByTestId('MONBX-TF_BX-B-INV_NO-row_1'));
    await waitAndClick(page.getByTestId('MONBX-TF_BX-B-INV_NO-row_1-suffix-icon-svg'));
    await waitAndClick(page.getByTestId('dialog-MONBX-H-AMT'));
    await page.getByTestId('dialog-MONBX-H-AMT').fill('1,200');
    await page.getByTestId('dialog-MONBX-H-AMT').press('Enter');
    await page.getByTestId('dialog-MONBX-H-TAX').fill('60');
    await page.getByTestId('dialog-MONBX-H-TAX').press('Enter');
    await waitAndClick(page.getByTestId('dialog-MONBX-確定-btn'));
    await waitAndClick(page.getByTestId('MONBX-save-btn'));
    //檢測1.修改第二項發票後,第一列發票號碼顯示在畫面否*************************************
      await page.waitForLoadState('networkidle');
      // 等待成功訊息出現再導航
      await expect(page.getByText('存檔成功')).toBeVisible({ timeout: 30000 });
      // 表身欄位檢測 - 先等待後端處理與畫面更新
      await page.waitForLoadState('networkidle');
      // 比較表身第二列輸入的發票號碼是否與存檔後相同
         // 先點擊第二列的發票號碼欄位框，使其讓Playwright可見再取值跟'TU00000060'比較
      await waitAndClick(page.getByTestId('MONBX-TF_BX-B-INV_NO-row_0-cell-wrapper'));
      await expect(page.getByTestId('MONBX-TF_BX-B-INV_NO-row_0-input')).toHaveValue('TU00000060', { timeout: 15000 });
      await page.waitForLoadState('networkidle');
    //檢測2.修改後,點開第一列發票號碼後是否會被清空*************************************
      await waitAndClick(page.getByTestId('MONBX-TF_BX-B-INV_NO-row_0-suffix-icon-svg'));
      await expect(page.getByTestId('dialog-MONBX-H-INV_NO')).toHaveValue('TU00000060', { timeout: 15000 });
      await waitAndClick(page.getByTestId('dialog-MONBX-關閉-btn').first());
      await page.waitForLoadState('networkidle');
    // 離開報銷單頁面
    await waitAndClick(page.getByTestId('MONBX-exit2-btn'));
  

//***************************************修改報銷單-2-修改表身第一列金額與發票***********************************************
    await page.goto(`#/MON/MONBX/${BXNO001}`);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    await expect(page.getByRole('dialog', { name: '錯誤' }), '檢測進入報銷單頁面沒有報錯').not.toBeVisible();  
    await waitAndClick(page.getByTestId('MONBX-invsa_tab2').getByTestId('MONBX-radio-button-1'));
    await waitAndClick(page.locator('div').filter({ hasText: /^1$/ }).first());
    await waitAndClick(page.getByTestId('MONBX-TF_BX-B-AMT-row_0-cell-wrapper'));
    await waitAndClick(page.getByTestId('MONBX-TF_BX-B-AMT-row_0-cell'));
    await waitAndClick(page.getByTestId('MONBX-TF_BX-B-AMT-row_0-input'));
    await page.getByTestId('MONBX-TF_BX-B-AMT-row_0-input').fill('2,000');
    await page.getByTestId('MONBX-TF_BX-B-AMT-row_0-input').press('Enter');
    await waitAndClick(page.getByTestId('MONBX-TF_BX-B-INV_NO-row_0'));
    await waitAndClick(page.getByTestId('MONBX-TF_BX-B-INV_NO-row_0-suffix-icon-svg'));
    await waitAndClick(page.getByTestId('dialog-MONBX-H-AMT'));
    await page.getByTestId('dialog-MONBX-H-AMT').fill('2,000');
    await page.getByTestId('dialog-MONBX-H-AMT').press('Enter');
    await page.getByTestId('dialog-MONBX-H-TAX').fill('100');
    await page.getByTestId('dialog-MONBX-H-TAX').press('Enter');
    await waitAndClick(page.getByTestId('dialog-MONBX-確定-btn'));
    await waitAndClick(page.getByTestId('MONBX-save-btn'));

 
  //****************************************************刪除報銷單B01
    await page.goto(`#/MON/MONBX/${BXNO001}`);
    await page.waitForLoadState('networkidle');
    await expect(page.getByRole('dialog', { name: '錯誤' }), '檢測進入頁面沒有報錯').not.toBeVisible();
    await waitAndClick(page.getByTestId('MONBX-tabset').getByTestId('MONBX-radio-button-1'));
    await waitAndClick(page.getByTestId('MONBX-delete-btn'));
    await waitAndClick(page.locator('div').filter({ hasText: '提示' }).nth(3));
    await waitAndClick(page.getByRole('button', { name: '確定' }));
    await page.waitForLoadState('networkidle');
    await expect(page.getByText('刪除成功')).toBeVisible({ timeout: 30000 });  

  await page.waitForLoadState('networkidle');
  // 離開報銷單頁面
  await waitAndClick(page.getByTestId('MONBX-exit2-btn'));


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
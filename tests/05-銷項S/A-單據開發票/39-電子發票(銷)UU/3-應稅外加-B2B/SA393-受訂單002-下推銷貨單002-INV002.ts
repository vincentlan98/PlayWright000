import { test, expect } from '@playwright/test';
import { dataStorage } from '@playwright/test-utils/dataStorage';


//1.設定wait和click時的等待時間,執行時取用,節省重複程式碼,減少因系統執行逾時出現錯誤訊息而失敗
async function waitAndClick(locator: any, timeout = 30000) {
  await locator.waitFor({ state: 'visible', timeout });
  await locator.click();
}
//SONO001->SANO001_INVNO新增&修改&作廢&刪除---20260123版
//4A.表頭各欄位檢測含搜尋欄位(受訂單&銷貨單);
//4AA1.表頭重要欄位值檢測-客戶名稱、備註顯示簡繁字體、扣稅類別與立帳方式(受訂單&銷貨單);
//4B.檢測表身欄位含搜尋欄位、批號、單位、包裝單位、摘要顯示簡繁字體(受訂單&銷貨單);  
//檢測存檔後列次序是否變更,新增插入表身第二列存檔後比對(修改受訂單);


test('SA393-受訂單002-下推銷貨單002-INV002', async ({ page }) => {
  try {
//2.設定變量:a. 單號 b. 今天日期-TODAY_NOW c. 發票期別 - invymstr
    let SONO001 = '';
    let PRDNO_2_B = '';
    let SANO001 = '';
    let INVNO001 = '';
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
  await waitAndClick(page.getByTestId('DRPSO-add-btn'));
  await waitAndClick(page.getByTestId('DRPSO-H-OS_DD'));
  await waitAndClick(page.getByTestId('DRPSO-H-OS_DD-icon-svg'));
  //4A01.檢測表頭日期進入頁面錯誤  
  await page.waitForLoadState('networkidle');
  await expect(page.getByRole('dialog', { name: '進入受訂單表頭日期時錯誤' })).not.toBeVisible();
  await page.getByTestId('DRPSO-H-OS_DD').press('Enter');
  await page.getByTestId('DRPSO-H-OS_NO').press('Enter');
  await waitAndClick(page.getByTestId('DRPSO-H-BIL_TYPE-icon-svg'));
  //4A02.檢測表頭單據類別進入頁面錯誤  
  await page.waitForLoadState('networkidle');
  await expect(page.getByRole('dialog', { name: '進入受訂單表頭單據類別時錯誤' })).not.toBeVisible();
  await waitAndClick(page.getByTestId('BIL_TYPE_SA-resize').getByRole('button', { name: '關閉' }));
  await waitAndClick(page.getByTestId('DRPSO-H-CAS_NO'));
  await waitAndClick(page.getByTestId('DRPSO-H-CAS_NO-icon-svg'));
  //4A03.檢測表頭工程案號進入頁面錯誤  
  await page.waitForLoadState('networkidle');
  await expect(page.getByRole('dialog', { name: '進入受訂單表頭工程案號時錯誤' })).not.toBeVisible();
  await waitAndClick(page.getByTestId('CASN-resize').getByTestId('dialog-DRPSO-關閉-btn'));
  await waitAndClick(page.getByTestId('DRPSO-H-CUS_NO'));
  await waitAndClick(page.getByTestId('DRPSO-H-CUS_NO-icon-svg'));
  //4A04.檢測表頭客戶代號進入頁面錯誤  
  await page.waitForLoadState('networkidle');
  await expect(page.getByRole('dialog', { name: '進入受訂單表頭客戶代號時錯誤' })).not.toBeVisible();
  await waitAndClick(page.getByTestId('dialog-search-input-DRPSO-CUS_NO-1-value1'));
  await page.getByTestId('dialog-search-input-DRPSO-CUS_NO-1-value1').fill('BTOB');
  await page.getByTestId('dialog-search-input-DRPSO-CUS_NO-1-value1').press('Enter');
  await waitAndClick(page.getByTestId('CUST_KH-resize').getByTestId('dialog-DRPSO-Search-btn'));
  await waitAndClick(page.getByTestId('DRPSO-gridOptions-B-column_0-row_0-btn'));
  await page.getByTestId('DRPSO-H-CUS_NO').press('Enter');
  await waitAndClick(page.getByTestId('DRPSO-H-QT_NO-icon'));
  //4A05.檢測表頭轉入單號進入頁面錯誤  
  await page.waitForLoadState('networkidle');
  await expect(page.getByRole('dialog', { name: '進入受訂單表頭轉入單號時錯誤' })).not.toBeVisible();
  await waitAndClick(page.getByTestId('DRPSO-H-QT_NO-QC'));
  await waitAndClick(page.locator('.vxe-icon-close').first());
  await waitAndClick(page.getByTestId('DRPSO-H-SAL_NO'));
  await waitAndClick(page.getByTestId('DRPSO-H-SAL_NO-icon-svg'));
  //4A06.檢測表頭業務員進入頁面錯誤  
  await page.waitForLoadState('networkidle');
  await expect(page.getByRole('dialog', { name: '進入受訂單表頭業務員時錯誤' })).not.toBeVisible();
  await waitAndClick(page.getByTestId('MF_YG-resize').getByTestId('DRPSO-gridOptions-B-column_0-row_0-btn'));
  await page.getByTestId('DRPSO-H-SAL_NO').press('Enter');
  await waitAndClick(page.getByTestId('DRPSO-H-PO_DEP'));
  await waitAndClick(page.getByTestId('DRPSO-H-PO_DEP-icon-svg'));
  //4A07.檢測表頭部門進入頁面錯誤  
  await page.waitForLoadState('networkidle');
  await expect(page.getByRole('dialog', { name: '進入受訂單表頭部門時錯誤' })).not.toBeVisible();
  await waitAndClick(page.getByTestId('DEPT-resize').getByTestId('DRPSO-gridOptions-B-column_0-row_0-btn'));
  await page.getByTestId('DRPSO-H-PO_DEP').press('Enter');
  await waitAndClick(page.getByTestId('DRPSO-H-CUR_ID-icon-svg'));
  //4A08.檢測表頭幣別進入頁面錯誤  
  await page.waitForLoadState('networkidle');
  await expect(page.getByRole('dialog', { name: '進入受訂單表頭幣別時錯誤' })).not.toBeVisible();
  await waitAndClick(page.getByTestId('DRPSO-幣別設定-dialog').locator('header'));
  await waitAndClick(page.getByTestId('dialog-DRPSO-CUR_ID'));
  await waitAndClick(page.getByTestId('dialog-DRPSO-CUR_ID-icon-svg'));
  //4A09.檢測表頭幣別設定的外幣代號進入頁面錯誤  
  await page.waitForLoadState('networkidle');
  await expect(page.getByRole('dialog', { name: '進入受訂單表頭幣別設定的外幣代號時錯誤' })).not.toBeVisible();
  //無法關閉時使用頁面級別的選擇器來找關閉按鈕
  await page.waitForLoadState('networkidle');
  await page.getByTestId('CUR_ID-resize').locator('div').filter({ hasText: /^編輯關閉$/ }).click();
  await page.getByTestId('CUR_ID-resize').getByRole('button', { name: '關閉' }).click();
  await waitAndClick(page.getByTestId('dialog-DRPSO-確定-btn'));
  await waitAndClick(page.getByTestId('DRPSO-H-TAX_ID-input-inner'));
  await waitAndClick(page.getByTestId('DRPSO-H-TAX_ID-option-3-text'));
  await page.getByTestId('DRPSO-H-TAX_ID-input-inner').press('Enter');
  await waitAndClick(page.getByTestId('DRPSO-H-ZHANG_ID-input-inner'));
  await waitAndClick(page.getByTestId('DRPSO-H-ZHANG_ID-option-1'));
  await page.getByTestId('DRPSO-H-ZHANG_ID-input-inner').press('Enter');
  await waitAndClick(page.getByTestId('DRPSO-H-EST_DD'));
  await waitAndClick(page.getByTestId('DRPSO-H-EST_DD-icon-svg'));
  //4A10.檢測表頭預交日期進入頁面錯誤  
  await page.waitForLoadState('networkidle');
  await expect(page.getByRole('dialog', { name: '進入受訂單表頭預交日期時錯誤' })).not.toBeVisible();
  await page.getByTestId('DRPSO-H-EST_DD').press('Enter');
  await waitAndClick(page.getByTestId('DRPSO-H-FILE_LIST-icon-svg'));
  //4A11.檢測表頭附件進入頁面錯誤  
  await page.waitForLoadState('networkidle');
  await expect(page.getByRole('dialog', { name: '進入受訂單表頭附件時錯誤' })).not.toBeVisible();
  await waitAndClick(page.getByTestId('dialog-DRPSO-確定-btn'));
  await waitAndClick(page.getByTestId('DRPSO-invso_tab1').getByTestId('DRPSO-H-REM'));
  await page.getByTestId('DRPSO-invso_tab1').getByTestId('DRPSO-H-REM').fill('簡繁體測試-帳目、變更、報表、日曆');
  await page.getByTestId('DRPSO-invso_tab1').getByTestId('DRPSO-H-REM').press('Enter');
  await waitAndClick(page.getByTestId('DRPSO-invso_tab2').getByTestId('DRPSO-radio-button-1'));
    // 等待後端處理與畫面更新
    await page.waitForLoadState('networkidle');
//4AA1.表頭重要欄位值檢測-客戶名稱、備註顯示簡繁字體、扣稅類別與立帳方式
    await expect(page.getByTestId('DRPSO-H-CUS_NO')).toHaveValue('B2B 有限公司', { timeout: 15000 });
    await expect(page.getByTestId('DRPSO-invso_tab1').getByTestId('DRPSO-H-REM')).toHaveValue('簡繁體測試-帳目、變更、報表、日曆', { timeout: 15000 });
    // 扣稅類別與立帳方式不是 input，改用包含或文本檢查
    await expect(page.getByTestId('DRPSO-H-TAX_ID-input-inner')).toHaveValue('3.應稅外加', { timeout: 15000 });
    await expect(page.getByTestId('DRPSO-H-ZHANG_ID-input-inner')).toHaveValue('1.單張立帳', { timeout: 15000 });

  await page.waitForLoadState('networkidle');
  // ******進入表身之前,需先點擊表身第一欄的某個欄位
  await waitAndClick(page.locator('div').filter({ hasText: /^1$/ }).nth(2));
  await waitAndClick(page.getByTestId('DRPSO-TF_POS-B-PRD_NO-row_0-input'));
  await waitAndClick(page.getByTestId('DRPSO-TF_POS-B-PRD_NO-row_0-suffix-icon-svg'));
  //4B01.檢測表身品號進入頁面錯誤  
  await page.waitForLoadState('networkidle');
  await expect(page.getByRole('dialog', { name: '進入受訂單表頭品號時錯誤' })).not.toBeVisible();
  await waitAndClick(page.getByTestId('DRPSO-gridOptions-B-column_0-row_0-checkbox-icon'));
  await waitAndClick(page.getByTestId('DRPSO-gridOptions-B-column_0-row_1-checkbox-icon'));
  await waitAndClick(page.getByTestId('DRPSO-gridOptions-B-column_0-row_2-checkbox-icon'));
  await waitAndClick(page.getByTestId('dialog-DRPSO-確定-btn'));
  await page.getByTestId('DRPSO-TF_POS-B-PRD_NO-row_0-input').press('Enter');
  await waitAndClick(page.getByTestId('DRPSO-TF_POS-B-WH-row_0-input'));
  await waitAndClick(page.getByTestId('DRPSO-TF_POS-B-WH-row_0-suffix-icon-svg'));
  //4B02.檢測表身倉庫代號進入頁面錯誤  
  await page.waitForLoadState('networkidle');
  await expect(page.getByRole('dialog', { name: '進入受訂單表身倉庫代號時錯誤' })).not.toBeVisible();
  await waitAndClick(page.getByTestId('MY_WH-resize').getByTestId('DRPSO-gridOptions-B-column_0-row_4-btn'));
  await page.getByTestId('DRPSO-TF_POS-B-WH-row_0-input').press('Enter');
  await waitAndClick(page.getByTestId('DRPSO-TF_POS-B-QTY-row_0-input'));
  await waitAndClick(page.getByTestId('DRPSO-TF_POS-B-QTY-row_0-input-wrapper'));
  await waitAndClick(page.getByTestId('DRPSO-TF_POS-B-QTY-row_0-input'));
  await page.getByTestId('DRPSO-TF_POS-B-QTY-row_0-input').fill('2.00');
  await page.getByTestId('DRPSO-TF_POS-B-QTY-row_0-input').press('Enter');
  await page.getByTestId('DRPSO-TF_POS-B-UP-row_0-input').fill('10,000.00');
  await page.getByTestId('DRPSO-TF_POS-B-UP-row_0-input').press('Enter');
  //第一列增加輸入測試欄位-摘要(簡繁體測試)、批號、單位、包裝單位
await waitAndClick(page.getByTestId('DRPSO-TF_POS-B-REM-row_0-cell-wrapper'));
await waitAndClick(page.getByTestId('DRPSO-TF_POS-B-REM-row_0-input'));
await page.getByTestId('DRPSO-TF_POS-B-REM-row_0-input').fill('簡繁體測試-帳目、變更、報表、日曆');
await page.getByTestId('DRPSO-TF_POS-B-REM-row_0-input').press('Enter');
await waitAndClick(page.getByTestId('DRPSO-TF_POS-B-BAT_NO-row_0-cell-wrapper'));
await waitAndClick(page.getByTestId('DRPSO-TF_POS-B-BAT_NO-row_0-suffix-icon-svg'));
  //4B03.檢測表身批號進入頁面錯誤  
  await page.waitForLoadState('networkidle');
  await expect(page.getByRole('dialog', { name: '進入受訂單表身批號時錯誤' })).not.toBeVisible();
await waitAndClick(page.getByTestId('BAT_NO-resize').getByRole('button', { name: '關閉' }));
await waitAndClick(page.getByTestId('DRPSO-TF_POS-B-BAT_NO-row_0-input'));
await page.getByTestId('DRPSO-TF_POS-B-BAT_NO-row_0-input').fill('20260120');
await page.getByTestId('DRPSO-TF_POS-B-BAT_NO-row_0-input').press('Enter');
await waitAndClick(page.getByTestId('DRPSO-TF_POS-B-UNIT-row_0-input-wrapper'));
await waitAndClick(page.getByTestId('DRPSO-TF_POS-B-UNIT-row_0-icon-svg'));
await waitAndClick(page.getByTestId('DRPSO-TF_POS-B-PAK_UNIT-row_0'));
await waitAndClick(page.getByTestId('DRPSO-TF_POS-B-PAK_UNIT-row_0-input'));
await page.getByTestId('DRPSO-TF_POS-B-PAK_UNIT-row_0-input').fill('箱');
await page.getByTestId('DRPSO-TF_POS-B-PAK_UNIT-row_0-input').press('Enter');
    // 等待後端處理與畫面更新
await page.waitForLoadState('networkidle');
//4BA1-2.表身第一列重要欄位檢測-摘要顯示簡繁字體
    await expect(page.getByTestId('DRPSO-TF_POS-B-REM-row_0-input')).toHaveValue('簡繁體測試-帳目、變更、報表、日曆', { timeout: 15000 });
    await expect(page.getByTestId('DRPSO-TF_POS-B-BAT_NO-row_0-input')).toHaveValue('20260120', { timeout: 15000 });
    await expect(page.getByTestId('DRPSO-TF_POS-B-UNIT-row_0-input')).toHaveValue('台', { timeout: 15000 });
    await expect(page.getByTestId('DRPSO-TF_POS-B-PAK_UNIT-row_0-input')).toHaveValue('箱', { timeout: 15000 });

//第二列增加輸入-先訂位置
  await waitAndClick(page.locator('div').filter({ hasText: /^2$/ }).first());
  await waitAndClick(page.getByTestId('DRPSO-TF_POS-B-WH-row_1-cell'));
  await waitAndClick(page.getByTestId('DRPSO-TF_POS-B-WH-row_1-suffix-icon-svg'));
  await waitAndClick(page.getByTestId('MY_WH-resize').getByTestId('DRPSO-gridOptions-B-column_0-row_4-btn'));
  await page.getByTestId('DRPSO-TF_POS-B-WH-row_1-input').press('Enter');
  await waitAndClick(page.getByTestId('DRPSO-TF_POS-B-QTY-row_1-input'));
  await page.getByTestId('DRPSO-TF_POS-B-QTY-row_1-input').fill('2.00');
  await page.getByTestId('DRPSO-TF_POS-B-QTY-row_1-input').press('Enter');
  await waitAndClick(page.getByTestId('DRPSO-TF_POS-B-UP-row_1-cell-wrapper'));
  await page.getByTestId('DRPSO-TF_POS-B-UP-row_1-input').fill('15,000.00');
  await page.getByTestId('DRPSO-TF_POS-B-UP-row_1-input').press('Enter');
  await waitAndClick(page.locator('div').filter({ hasText: /^3$/ }).first());
  await waitAndClick(page.getByTestId('DRPSO-TF_POS-B-WH-row_2-cell'));
  await waitAndClick(page.getByTestId('DRPSO-TF_POS-B-WH-row_2-suffix-icon-svg'));
  await waitAndClick(page.getByTestId('MY_WH-resize').getByTestId('DRPSO-gridOptions-B-column_0-row_4-btn'));
  await page.getByTestId('DRPSO-TF_POS-B-WH-row_2-input').press('Enter');
  await waitAndClick(page.getByTestId('DRPSO-TF_POS-B-QTY-row_2-input'));
  await page.getByTestId('DRPSO-TF_POS-B-QTY-row_2-input').fill('2.00');
  await page.getByTestId('DRPSO-TF_POS-B-QTY-row_2-input').press('Enter');
  await page.getByTestId('DRPSO-TF_POS-B-UP-row_2-input').fill('20,000.00');
  await page.getByTestId('DRPSO-TF_POS-B-UP-row_2-input').press('Enter');
  await waitAndClick(page.getByTestId('DRPSO-save-btn'));

  await page.waitForLoadState('networkidle');
  // 等待成功訊息出現再導航
  await expect(page.getByText('存檔成功')).toBeVisible({ timeout: 30000 });
  SONO001 = await page.getByTestId('DRPSO-H-OS_NO').inputValue();  // 儲存單號到SONO001
  if (!SONO001) throw new Error('Failed to get SONO001');
  dataStorage.setValue('SONO001', SONO001); // 存到dataStorage以便其他測試案例使用
  await page.waitForLoadState('networkidle');

  // 離開受訂單單頁面
  await page.getByTestId('DRPSO-exit2-btn').click();


    await page.waitForLoadState('networkidle');
  // 離開受訂單頁面
  await waitAndClick(page.getByTestId('DRPSO-exit2-btn'));

//****************************************************新增銷貨單-從受訂單轉入***********************************************
  await page.goto('#/inv/invsa');
//3.檢測進入頁面錯誤  
  await page.waitForLoadState('networkidle');
  await expect(page.getByRole('dialog', { name: '進入銷貨單頁面時錯誤' })).not.toBeVisible();
  await waitAndClick(page.getByTestId('DRPSA-add-btn'));
  await waitAndClick(page.getByTestId('DRPSA-H-PS_DD'));
  await waitAndClick(page.getByTestId('DRPSA-H-PS_DD-icon-svg'));
  //4A01.檢測表頭日期進入頁面錯誤  
  await page.waitForLoadState('networkidle');
  await expect(page.getByRole('dialog', { name: '進入銷貨單表頭日期時錯誤' })).not.toBeVisible();
  await page.getByTestId('DRPSA-H-PS_DD').press('Enter');
  await page.getByTestId('DRPSA-H-PS_NO').press('Enter');
  await waitAndClick(page.getByTestId('DRPSA-H-BIL_TYPE'));
  await waitAndClick(page.getByTestId('DRPSA-H-BIL_TYPE-icon-svg'));
  //4A02.檢測表頭單據類別進入頁面錯誤  
  await page.waitForLoadState('networkidle');
  await expect(page.getByRole('dialog', { name: '進入銷貨單表頭單據類別時錯誤' })).not.toBeVisible();
  //無法關閉時,先點擊編輯關閉定位點來找關閉按鈕
  await page.waitForLoadState('networkidle');  
  await page.locator('div').filter({ hasText: /^編輯關閉$/ }).click();
  await waitAndClick(page.getByTestId('BIL_TYPE_SA-resize').getByRole('button', { name: '關閉' }));
  await page.getByTestId('DRPSA-H-BIL_TYPE').press('Enter');
  await waitAndClick(page.getByTestId('DRPSA-H-CAS_NO'));
  await waitAndClick(page.getByTestId('DRPSA-H-CAS_NO-icon-svg'));
  //4A03.檢測表頭工程案號進入頁面錯誤  
  await page.waitForLoadState('networkidle');
  await expect(page.getByRole('dialog', { name: '進入銷貨單表頭工程案號時錯誤' })).not.toBeVisible();
  await waitAndClick(page.locator('div').filter({ hasText: /^選擇$/ }).nth(3));
  await waitAndClick(page.getByTestId('CASN-resize').getByTestId('dialog-DRPSA-關閉-btn'));
  await page.getByTestId('DRPSA-H-CAS_NO').press('Enter');
  await waitAndClick(page.getByTestId('DRPSA-H-OS_NO-input-wrapper'));
  await waitAndClick(page.getByTestId('DRPSA-H-OS_NO-icon'));
  await waitAndClick(page.getByTestId('DRPSA-H-OS_NO-SO'));  //選單選項:從受訂單轉入
  await waitAndClick(page.getByTestId('search-name-DRPSA-OS_NO-1-input-inner'));
  await waitAndClick(page.getByTestId('search-name-DRPSA-OS_NO-1-option-OS_NO-text'));
  await waitAndClick(page.getByTestId('search-operator-DRPSA-OS_NO-1-input-inner'));
  await waitAndClick(page.getByTestId('search-operator-DRPSA-OS_NO-1-option-in-text'));
  await waitAndClick(page.getByTestId('dialog-search-input-DRPSA-OS_NO-1-value1'));
  await page.getByTestId('dialog-search-input-DRPSA-OS_NO-1-value1').fill(`${SONO001}`);
  await page.getByTestId('dialog-search-input-DRPSA-OS_NO-1-value1').press('Enter');
  await waitAndClick(page.getByTestId('DRPSA-resize').getByTestId('dialog-DRPSA-Search-btn'));
  await waitAndClick(page.locator('div').filter({ hasText: /^來源單$/ }).nth(1));
  await waitAndClick(page.getByTestId('dialog-DRPSA-確定-btn'));
  await waitAndClick(page.getByTestId('DRPSA-H-SAL_NO'));
  await waitAndClick(page.getByTestId('DRPSA-H-SAL_NO-icon-svg'));
  //4A04.檢測表頭業務員進入頁面錯誤  
  await page.waitForLoadState('networkidle');
  await expect(page.getByRole('dialog', { name: '進入銷貨單表頭業務員時錯誤' })).not.toBeVisible();
  await waitAndClick(page.getByTestId('MF_YG-resize').getByTestId('DRPSA-gridOptions-B-column_0-row_0-btn'));
  await page.getByTestId('DRPSA-H-SAL_NO').press('Enter');
  await waitAndClick(page.getByTestId('DRPSA-H-DEP'));
  await waitAndClick(page.getByTestId('DRPSA-H-DEP-icon-svg'));
  //4A05.檢測表頭部門進入頁面錯誤  
  await page.waitForLoadState('networkidle');
  await expect(page.getByRole('dialog', { name: '進入銷貨單表頭部門時錯誤' })).not.toBeVisible();
  await waitAndClick(page.getByTestId('DEPT-resize').getByTestId('DRPSA-gridOptions-B-column_0-row_0-btn'));
  await page.getByTestId('DRPSA-H-DEP').press('Enter');
  await waitAndClick(page.getByTestId('DRPSA-H-TAX_ID-input-inner'));
  await page.getByTestId('DRPSA-H-TAX_ID-option-3').click();
  await page.getByTestId('DRPSA-H-TAX_ID-input-inner').press('Enter');
  await waitAndClick(page.getByTestId('DRPSA-H-ZHANG_ID-input-inner'));
  await waitAndClick(page.getByTestId('DRPSA-H-ZHANG_ID-option-1'));
  await page.getByTestId('DRPSA-H-ZHANG_ID-input-inner').press('Enter');
  await waitAndClick(page.getByTestId('DRPSA-H-AMTN_EP'));
  await waitAndClick(page.getByTestId('DRPSA-H-AMTN_EP-icon-svg'));
  //4A06.檢測表頭其他收入進入頁面錯誤  
  await page.waitForLoadState('networkidle');
  await expect(page.getByRole('dialog', { name: '進入銷貨單表頭其他收入時錯誤' })).not.toBeVisible();
  await waitAndClick(page.getByTestId('DRPSA-H-AMTN_EP1'));
  await waitAndClick(page.getByTestId('DRPSA-H-AMTN_EP1-icon-svg'));
  //4A07.檢測表頭其他支出進入頁面錯誤  
  await page.waitForLoadState('networkidle');
  await expect(page.getByRole('dialog', { name: '進入銷貨單表頭其他支出時錯誤' })).not.toBeVisible();
  await waitAndClick(page.getByTestId('DRPSA-H-VOH_ID'));
  await waitAndClick(page.getByTestId('DRPSA-H-VOH_ID-icon-svg'));
  //4A08.檢測表頭傳票進入頁面錯誤  
  await page.waitForLoadState('networkidle');
  await expect(page.getByRole('dialog', { name: '進入銷貨單表頭傳票時錯誤' })).not.toBeVisible();
  //無法關閉時使用頁面級別的選擇器來找關閉按鈕
  await page.locator('div').filter({ hasText: /^關閉$/ }).nth(4).click();
  await page.getByTestId('VOH_ID-resize').getByRole('button', { name: '關閉' }).click();
  await page.getByTestId('DRPSA-H-VOH_ID').press('Enter');
  await waitAndClick(page.getByTestId('DRPSA-H-FILE_LIST'));
  await waitAndClick(page.getByTestId('DRPSA-H-FILE_LIST-icon-svg'));
  await waitAndClick(page.getByTestId('DRPSA-附件上傳-dialog').getByTestId('dialog-DRPSA-關閉-btn'));
  await waitAndClick(page.getByTestId('DRPSA-invsa_tab2').getByTestId('DRPSA-radio-button-1'));
//刪除批號存檔
  await page.locator('div').filter({ hasText: /^1$/ }).nth(2).click();
  await page.getByTestId('DRPSA-TF_PSS-B-BAT_NO-row_0-cell-wrapper').click();
  await page.getByTestId('DRPSA-TF_PSS-B-BAT_NO-row_0-input').fill('');
  await page.getByTestId('DRPSA-TF_PSS-B-BAT_NO-row_0-input').press('Enter');
  await waitAndClick(page.getByTestId('DRPSA-save-btn'));
  await page.waitForLoadState('networkidle');
  // 等待成功訊息出現再導航
  await expect(page.getByText('存檔成功')).toBeVisible({ timeout: 30000 });
  // 等待後端處理與畫面更新
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000); // 額外等待確保 DOM 完全更新

//4-1.表頭重要欄位檢測-客戶名稱、備註顯示簡繁字體
  await expect(page.getByTestId('DRPSA-H-CUS_NO')).toHaveValue('B2B 有限公司', { timeout: 15000 });
  await expect(page.getByTestId('DRPSA-invsa_tab1').getByTestId('DRPSA-H-REM')).toHaveValue('簡繁體測試-帳目、變更、報表、日曆', { timeout: 15000 });
  // 有些元素不是 input，改用包含或文本檢查
  await expect(page.getByTestId('DRPSA-H-TAX_ID-input-inner')).toHaveValue('3.應稅外加', { timeout: 15000 });
  await expect(page.getByTestId('DRPSA-H-ZHANG_ID-input-inner')).toHaveValue('1.單張立帳', { timeout: 15000 });

//4-2.表身第一列重要欄位檢測-摘要顯示簡繁字體
  // ******進入表身之前,需先點擊表身備註欄位以進入編輯模式
  await page.getByTestId('DRPSA-TF_PSS-B-REM-row_0-cell-wrapper').click();
  await page.waitForTimeout(500);
  // 點擊 input 元素以確保其可見
  await page.getByTestId('DRPSA-TF_PSS-B-REM-row_0-input').click();
  await page.waitForTimeout(300);
  // 直接使用較長的超時進行檢測
  await expect(page.getByTestId('DRPSA-TF_PSS-B-REM-row_0-input')).toHaveValue('簡繁體測試-帳目、變更、報表、日曆', { timeout: 30000 });
  await expect(page.getByTestId('DRPSA-TF_PSS-B-BAT_NO-row_0-input')).toHaveValue('', { timeout: 15000 });
  await expect(page.getByTestId('DRPSA-TF_PSS-B-UNIT-row_0-input')).toHaveValue('台', { timeout: 15000 });
  await expect(page.getByTestId('DRPSA-TF_PSS-B-PAK_UNIT-row_0-input')).toHaveValue('1箱', { timeout: 15000 });
  await page.waitForLoadState('networkidle');

  // 儲存單號到SANOO001
  SANO001 = await page.getByTestId('DRPSA-H-PS_NO').inputValue();  
  if (!SANO001) throw new Error('Failed to get SANOO001');
  dataStorage.setValue('SANOO001', SANO001); // 存到dataStorage以便其他測試案例使用
  await page.waitForLoadState('networkidle');
  // 離開銷貨單頁面
  await page.getByTestId('DRPSA-exit2-btn').click();

  

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
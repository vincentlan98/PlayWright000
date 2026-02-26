import { test, expect } from '@playwright/test';
import { dataStorage } from '@playwright/test-utils/dataStorage';

//1.設定wait和click時的等待時間,執行時取用,節省重複程式碼,減少因系統執行逾時出現錯誤訊息而失敗
async function waitAndClick(locator: any, timeout = 30000) {
  await locator.waitFor({ state: 'visible', timeout });
  await locator.click();
}

//SONO001->SANO001_INVNO新增&修改&作廢&刪除---20260211K版
//20260213K版-新增時第一列表身主單位為箱,修改後第一列表身主單位為張,存檔時檢測
//20260211K版-增加檢測第一列表身數量(副)與單位(副)的值
//20260206K版 580行等待成功訊息出現再導航-加長等待時間await page.waitForTimeout(5000);
//20260130K版-1.取消按"新增"步驟 2.檢測開啟14個表頭欄位 3.新增可見表身欄位"批號""包裝換算""包裝單位" 4.單位比對字樣"台"->"張"4.存檔後等待時間延長(->15秒) 5.刪除成功後等待時間延長(->30秒)


//test.use({ storageState: 'playwright/.auth/user.json' }); //使用已登入狀態

//4A.表頭各欄位檢測含搜尋欄位(受訂單&銷貨單);
//4AA1.表頭重要欄位值檢測-客戶名稱、備註顯示簡繁字體、扣稅類別與立帳方式(受訂單&銷貨單);
//4B.檢測表身欄位含搜尋欄位、批號、單位、包裝單位、摘要顯示簡繁字體(受訂單&銷貨單);  
//檢測存檔後列次序是否變更,新增插入表身第二列存檔後比對(修改受訂單);


test('SA393-受訂單001-轉入銷貨單001-INV001', async ({ page }) => {
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
  //await waitAndClick(page.getByTestId('DRPSO-add-btn')); //取消點擊新增按鈕,改由預設進入新增模式
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
//20260202K版-修改關閉按鈕選取方式
  await waitAndClick(page.getByTestId('DRPSO-H-CAS_NO'));
  await waitAndClick(page.getByTestId('DRPSO-H-CAS_NO-icon-svg'));
  //4A03.檢測表頭工程案號進入頁面錯誤  
  await page.waitForLoadState('networkidle');
  await expect(page.getByRole('dialog', { name: '進入受訂單表頭工程案號時錯誤' })).not.toBeVisible();
  await page.waitForLoadState('networkidle');
  await waitAndClick(page.getByTestId('CASN-resize').locator('div').filter({ hasText: /^編輯關閉$/ }));
  await page.waitForLoadState('networkidle');
  await waitAndClick(page.getByTestId('CASN-resize').getByRole('button', { name: '關閉' }));
  await waitAndClick(page.getByTestId('DRPSO-H-CUS_NO'));
  await waitAndClick(page.getByTestId('DRPSO-H-CUS_NO-icon-svg'));
  //4A04.檢測表頭客戶代號進入頁面錯誤  
  await page.waitForLoadState('networkidle');
  await expect(page.getByRole('dialog', { name: '進入受訂單表頭客戶代號時錯誤' })).not.toBeVisible();
  await waitAndClick(page.getByTestId('dialog-search-input-DRPSO-CUS_NO-1-value1'));
  await page.getByTestId('dialog-search-input-DRPSO-CUS_NO-1-value1').fill('BTOB');
  await page.getByTestId('dialog-search-input-DRPSO-CUS_NO-1-value1').press('Enter');
  await waitAndClick(page.getByTestId('CUST_KH-resize').getByTestId('dialog-DRPSO-Search-btn'));
  //增加父容器定位點來找選擇按鈕-避免找錯位置-------------------------20260130K版
  await waitAndClick(page.getByTestId('CUST_KH-resize').getByTestId('DRPSO-gridOptions-B-column_0-row_0-btn'));
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

//表頭自定義欄位檢測
  //4AB1.檢測表頭自定義-專案說明錯誤  
  await waitAndClick(page.getByTestId('DRPSO-H-P1-input-wrapper'));
  await page.waitForLoadState('networkidle');
  await expect(page.getByRole('dialog', { name: '進入受訂單表頭自定義專案說明時錯誤' })).not.toBeVisible();
  await waitAndClick(page.getByTestId('DRPSO-H-P1'));
  await page.getByTestId('DRPSO-H-P1').fill('專案說明');
  await page.getByTestId('DRPSO-H-P1').press('Enter');
  //4AB2.檢測表頭自定義-SunlikeERP錯誤  
  await waitAndClick(page.getByTestId('DRPSO-H-Product_3-inner'));
  await page.waitForLoadState('networkidle');
  await expect(page.getByRole('dialog', { name: '進入受訂單表頭自定義SunlikeERP時錯誤' })).not.toBeVisible();
  //4AB3.檢測表頭自定義-提報人錯誤    
  await waitAndClick(page.getByTestId('DRPSO-H-Propose-input-wrapper'));
  await page.waitForLoadState('networkidle');
  await expect(page.getByRole('dialog', { name: '進入受訂單表頭自定義提報人時錯誤' })).not.toBeVisible();
  await page.getByTestId('DRPSO-H-Propose').press('Enter');
  //4AB4.檢測表頭自定義-出貨地錯誤    
  await waitAndClick(page.getByTestId('DRPSO-H-Shipment-input-wrapper'));
  await page.waitForLoadState('networkidle');
  await expect(page.getByRole('dialog', { name: '進入受訂單表頭自定義出貨地時錯誤' })).not.toBeVisible();
  await waitAndClick(page.getByTestId('DRPSO-H-Shipment-option-台灣及大陸-text'));
  //4AB5.檢測表頭自定義-專案提報單號錯誤  
  await waitAndClick(page.getByTestId('DRPSO-H-TBD_NO-input-wrapper'));
  await page.waitForLoadState('networkidle');
  await expect(page.getByRole('dialog', { name: '進入受訂單表頭自定義專案提報單號時錯誤' })).not.toBeVisible();
  await waitAndClick(page.getByTestId('DRPSO-H-TBD_NO'));
  await page.getByTestId('DRPSO-H-TBD_NO').fill('專案提報單號NO001');
  await page.getByTestId('DRPSO-H-TBD_NO').press('Enter');

//*****進入表身之前,需先點擊表身第一欄的某個欄位
  await waitAndClick(page.locator('div').filter({ hasText: /^1$/ }).nth(2));
  //進入表身貨品代號欄位需先點擊外框------------------------------------------20260130K版
  await waitAndClick(page.getByTestId('DRPSO-TF_POS-B-PRD_NO-row_0'));
  await waitAndClick(page.getByTestId('DRPSO-TF_POS-B-PRD_NO-row_0-suffix-icon-svg'));
  //4B01.檢測表身品號進入頁面錯誤  
  await page.waitForLoadState('networkidle');
  await expect(page.getByRole('dialog', { name: '進入受訂單表頭品號時錯誤' })).not.toBeVisible();
  //一次輸入3項品號
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
  //第一列選擇倉庫代號
  await waitAndClick(page.getByTestId('MY_WH-resize').getByTestId('DRPSO-gridOptions-B-column_0-row_4-btn'));
  await page.getByTestId('DRPSO-TF_POS-B-WH-row_0-input').press('Enter');
  //第一列選擇單位-主單位選擇第二項"箱"
await waitAndClick(page.getByTestId('DRPSO-TF_POS-B-UNIT-row_0-icon-svg'));
await waitAndClick(page.getByTestId('DRPSO-TF_POS-B-UNIT-row_0-select-option-2'));
  //第一列輸入數量&單價
await page.getByTestId('DRPSO-TF_POS-B-QTY-row_0-cell').click();
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
//20260202K版-包裝換算輸入
await waitAndClick(page.getByTestId('DRPSO-TF_POS-B-PAK_EXC-row_0'));
await waitAndClick(page.getByTestId('DRPSO-TF_POS-B-PAK_EXC-row_0-input'));
await page.getByTestId('DRPSO-TF_POS-B-PAK_EXC-row_0-input').fill('2');
await page.getByTestId('DRPSO-TF_POS-B-PAK_EXC-row_0-input').press('Enter');
// 等待後端處理與畫面更新
await page.waitForLoadState('networkidle');
//4BA1-2.表身第一列重要欄位檢測-摘要顯示簡繁字體,批號、主單位(箱)、數量(副)、單位(副)、包裝單位、包裝換算
await expect(page.getByTestId('DRPSO-TF_POS-B-REM-row_0-input')).toHaveValue('簡繁體測試-帳目、變更、報表、日曆', { timeout: 15000 });
await expect(page.getByTestId('DRPSO-TF_POS-B-BAT_NO-row_0-input')).toHaveValue('20260120', { timeout: 15000 });
await expect(page.getByTestId('DRPSO-TF_POS-B-UNIT-row_0-input')).toHaveValue('箱', { timeout: 15000 });
await expect(page.getByTestId('DRPSO-TF_POS-B-QTY1-row_0-input')).toHaveValue('100', { timeout: 15000 });
await expect(page.getByTestId('DRPSO-TF_POS-B-UNIT1-row_0-input')).toHaveValue('套', { timeout: 15000 });
await expect(page.getByTestId('DRPSO-TF_POS-B-PAK_UNIT-row_0-input')).toHaveValue('箱', { timeout: 15000 });
await expect(page.getByTestId('DRPSO-TF_POS-B-PAK_EXC-row_0-input')).toHaveValue('2', { timeout: 15000 });
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
  await expect(page.getByText('存檔成功')).toBeVisible({ timeout: 150000 });
  await page.waitForLoadState('networkidle');
  SONO001 = await page.getByTestId('DRPSO-H-OS_NO').inputValue();  // 儲存單號到SONO001
  if (!SONO001) throw new Error('Failed to get SONO001');
  dataStorage.setValue('SONO001', SONO001); // 存到dataStorage以便其他測試案例使用
  // 等待後端處理與畫面更新
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(20000); // 額外等待確保 DOM 完全更新 //20260212 K版-增加等待時間->20秒

  // 離開受訂單單頁面
  await waitAndClick(page.getByTestId('DRPSO-exit2-btn'));
  await page.waitForLoadState('networkidle');


  //***************************************修改受訂單-新增表身第二列品號,檢測存檔後列次序是否變更***********************************************
  await page.goto(`#/inv/invso/${SONO001}`);
  await page.waitForLoadState('networkidle');
  await expect(page.getByRole('dialog', { name: '錯誤' }), '檢測進入受訂單頁面沒有報錯').not.toBeVisible();
  await page.waitForLoadState('networkidle');
//20260202K版-先點擊"明細"頁籤
  //await waitAndClick(page.getByTestId('DRPSO-invso_tab2').getByTestId('DRPSO-radio-button-1'));
  //await page.waitForLoadState('networkidle');
//*****進入表身之前,需先點擊表身第一欄的某個欄位--20260213K版-修改回主單位
  //await waitAndClick(page.locator('div').filter({ hasText: /^1$/ }).nth(2));
//*****進入表身之前,需先點擊表身第一欄的某個欄位
  //await waitAndClick(page.locator('div').filter({ hasText: /^1$/ }).nth(2));
  //進入表身貨品代號欄位需先點擊外框------------------------------------------20260130K版
  await waitAndClick(page.getByTestId('DRPSO-TF_POS-B-PRD_NO-row_0'));
  await page.waitForLoadState('networkidle');
  //第一列選擇單位-主單位選擇第二項"箱"
await waitAndClick(page.getByTestId('DRPSO-TF_POS-B-UNIT-row_0-icon-svg'));
await waitAndClick(page.getByTestId('DRPSO-TF_POS-B-UNIT-row_0-select-option-1'));
  //第一列修改輸入數量&單價
await page.getByTestId('DRPSO-TF_POS-B-QTY-row_0-cell').click();
  await waitAndClick(page.getByTestId('DRPSO-TF_POS-B-QTY-row_0-input-wrapper'));
  await waitAndClick(page.getByTestId('DRPSO-TF_POS-B-QTY-row_0-input'));
  await page.getByTestId('DRPSO-TF_POS-B-QTY-row_0-input').fill('200.00');
  await page.getByTestId('DRPSO-TF_POS-B-QTY-row_0-input').press('Enter');
  await page.getByTestId('DRPSO-TF_POS-B-UP-row_0-input').fill('100.00');
  await page.getByTestId('DRPSO-TF_POS-B-UP-row_0-input').press('Enter');
//20260202K版-新增表身第二列品號欄位-需先點擊"明細"頁籤->點擊第二列外框->點擊+號
  await waitAndClick(page.getByTestId('DRPSO-invso_tab2').getByTestId('DRPSO-radio-button-1'));
  await page.waitForLoadState('networkidle');
  // 點擊第二列外框(行指示符)
  await waitAndClick(page.locator('div').filter({ hasText: /^2$/ }).nth(4));
  // 點擊新增按鈕
  await waitAndClick(page.getByTestId('DRPSO-TF_POS-B-TABLE_ID-row_1-add-icon-svg'));
  await page.waitForLoadState('networkidle');
  await waitAndClick(page.getByTestId('DRPSO-TF_POS-B-PRD_NO-row_1-input'));
  await waitAndClick(page.getByTestId('DRPSO-TF_POS-B-PRD_NO-row_1-suffix-icon-svg'));
  await waitAndClick(page.getByTestId('DRPSO-gridOptions-B-column_0-row_3-checkbox-icon'));
  await waitAndClick(page.getByTestId('dialog-DRPSO-確定-btn'));
  await page.getByTestId('DRPSO-TF_POS-B-PRD_NO-row_1-input').press('Enter');
  // 儲存第二列品號到PRDNO_2_B
    PRDNO_2_B = await page.getByTestId('DRPSO-TF_POS-B-PRD_NO-row_1-input').inputValue();  
  if (!PRDNO_2_B) throw new Error('Failed to get PRDNO_2_B');
  dataStorage.setValue('PRDNO_2_B', PRDNO_2_B); // 存到dataStorage以便其他測試案例使用
  await waitAndClick(page.getByTestId('DRPSO-TF_POS-B-WH-row_1-input'));
  await waitAndClick(page.getByTestId('DRPSO-TF_POS-B-WH-row_1-suffix-icon-svg'));
  await waitAndClick(page.getByTestId('DRPSO-gridOptions-B-column_0-row_4-btn'));
  await page.getByTestId('DRPSO-TF_POS-B-WH-row_2-input').press('Enter');
  await waitAndClick(page.getByTestId('DRPSO-TF_POS-B-QTY-row_1-cell-wrapper'));
  await waitAndClick(page.getByTestId('DRPSO-TF_POS-B-QTY-row_1-cell-wrapper'));
  await page.getByTestId('DRPSO-TF_POS-B-QTY-row_1-input').fill('2.00');
  await page.getByTestId('DRPSO-TF_POS-B-QTY-row_1-input').press('Enter');
  await page.getByTestId('DRPSO-TF_POS-B-UP-row_1-input').fill('25,000.00');
  await page.getByTestId('DRPSO-TF_POS-B-UP-row_1-input').press('Enter');
  await waitAndClick(page.getByTestId('DRPSO-save-btn'));
  await page.waitForLoadState('networkidle');
  // 等待成功訊息出現再導航
  await expect(page.getByText('存檔成功')).toBeVisible({ timeout: 150000 });
//4-3.表身欄位排列順序檢測 - 先等待後端處理與畫面更新
  await page.waitForLoadState('networkidle');
// 比較本次修改受訂單表身第二列的品號是否與存檔後相同
    // 先點擊第二列的品號欄位輸入框，使其讓Playwright可見再取值跟PRDNO_2_B比較
  await waitAndClick(page.getByTestId('DRPSO-TF_POS-B-PRD_NO-row_1-cell-wrapper'));
  await expect(page.getByTestId('DRPSO-TF_POS-B-PRD_NO-row_1-input')).toHaveValue(PRDNO_2_B, { timeout: 15000 });
  // 離開受訂單頁面
  await page.waitForLoadState('networkidle');
  await waitAndClick(page.getByTestId('DRPSO-exit2-btn'));
  await page.waitForLoadState('networkidle');


//****************************************************新增銷貨單-從受訂單轉入***********************************************
  await page.goto('#/inv/invsa');
//3.檢測進入頁面錯誤  
  await page.waitForLoadState('networkidle');
  await expect(page.getByRole('dialog', { name: '進入銷貨單頁面時錯誤' })).not.toBeVisible();
  // await waitAndClick(page.getByTestId('DRPSA-add-btn')); //取消新增按鈕,改由預設進入新增模式
  await waitAndClick(page.getByTestId('DRPSA-H-PS_DD'));
  await waitAndClick(page.getByTestId('DRPSA-H-PS_DD-icon-svg'));
  //4A01.檢測表頭日期進入頁面錯誤  
  await page.waitForLoadState('networkidle');
  await expect(page.getByRole('dialog', { name: '進入銷貨單表頭日期時錯誤' })).not.toBeVisible();
  await page.getByTestId('DRPSA-H-PS_DD').press('Enter');
  await page.getByTestId('DRPSA-H-PS_NO').press('Enter');
  //4A02.檢測表頭單據類別進入頁面錯誤  
  await waitAndClick(page.getByTestId('DRPSA-H-BIL_TYPE'));
  await waitAndClick(page.getByTestId('DRPSA-H-BIL_TYPE-icon-svg'));
  await page.waitForLoadState('networkidle');
  await expect(page.getByRole('dialog', { name: '進入銷貨單表頭單據類別時錯誤' })).not.toBeVisible();
  //無法關閉時,先點擊編輯關閉定位點來找關閉按鈕
  await page.waitForLoadState('networkidle');  
  await page.locator('div').filter({ hasText: /^編輯關閉$/ }).click();
  await waitAndClick(page.getByTestId('BIL_TYPE_SA-resize').getByRole('button', { name: '關閉' }));
  await page.getByTestId('DRPSA-H-BIL_TYPE').press('Enter');
  //4A03.檢測表頭工程案號進入頁面錯誤  
await waitAndClick(page.getByTestId('DRPSA-H-CAS_NO-input-wrapper'));
await waitAndClick(page.getByTestId('DRPSA-H-CAS_NO-icon-svg'));
  //await waitAndClick(page.getByTestId('DRPSA-H-CAS_NO'));
  await page.waitForLoadState('networkidle');
  await expect(page.getByRole('dialog', { name: '進入銷貨單表頭工程案號時錯誤' })).not.toBeVisible();
//選擇視窗重新取元件
await page.getByTestId('CASN-resize').locator('div').filter({ hasText: /^編輯關閉$/ }).click();
await waitAndClick(page.getByTestId('CASN-resize').getByRole('button', { name: '關閉' }));

  //await waitAndClick(page.locator('div').filter({ hasText: /^選擇$/ }).nth(3));
  //await waitAndClick(page.getByTestId('CASN-resize').getByTestId('dialog-DRPSA-關閉-btn'));
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
  await page.waitForLoadState('networkidle');
  await waitAndClick(page.getByTestId('DRPSA-resize').getByTestId('dialog-DRPSA-Search-btn'));
  await page.waitForLoadState('networkidle');
  await waitAndClick(page.locator('div').filter({ hasText: /^來源單$/ }).nth(1));
  await page.waitForLoadState('networkidle');
  await waitAndClick(page.getByTestId('dialog-DRPSA-確定-btn'));
  await page.waitForLoadState('networkidle');
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
  await waitAndClick(page.getByTestId('DRPSA-H-TAX_ID-option-3'));
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
  
  //4A08.檢測表頭傳票進入頁面錯誤  ------------20260130K版不檢測
  //await waitAndClick(page.getByTestId('DRPSA-H-VOH_ID'));
  //await waitAndClick(page.getByTestId('DRPSA-H-VOH_ID-icon-svg'));
  //await page.waitForLoadState('networkidle');
  //await expect(page.getByRole('dialog', { name: '進入銷貨單表頭傳票時錯誤' })).not.toBeVisible();
  //無法關閉時使用頁面級別的選擇器來找關閉按鈕
  //await page.locator('div').filter({ hasText: /^關閉$/ }).nth(4).click();
  //await page.getByTestId('VOH_ID-resize').getByRole('button', { name: '關閉' }).click();
  //await page.getByTestId('DRPSA-H-VOH_ID').press('Enter');
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
  await expect(page.getByText('存檔成功')).toBeVisible({ timeout: 150000 });
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
  await waitAndClick(page.locator('div').filter({ hasText: /^1$/ }).first());
  await page.waitForLoadState('networkidle');
  await waitAndClick(page.getByTestId('DRPSA-TF_PSS-B-REM-row_0-cell-wrapper'));
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(10000);
  // 點擊 input 元素以確保其可見
//await page.getByTestId('DRPSA-TF_PSS-B-REM-row_0-cell').click();
//await page.getByText('簡繁體測試-帳目、變更、報表、日曆').click();
  await waitAndClick(page.getByTestId('DRPSA-TF_PSS-B-REM-row_0-input'));
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(10000);
  // 直接使用較長的超時進行檢測
  await expect(page.getByTestId('DRPSA-TF_PSS-B-REM-row_0-input')).toHaveValue('簡繁體測試-帳目、變更、報表、日曆', { timeout: 30000 });
  await expect(page.getByTestId('DRPSA-TF_PSS-B-BAT_NO-row_0-input')).toHaveValue('', { timeout: 15000 });
  await expect(page.getByTestId('DRPSA-TF_PSS-B-UNIT-row_0-input')).toHaveValue('張', { timeout: 15000 });
  await expect(page.getByTestId('DRPSA-TF_PSS-B-QTY1-row_0-input')).toHaveValue('100', { timeout: 15000 });
  await expect(page.getByTestId('DRPSA-TF_PSS-B-UNIT1-row_0-input')).toHaveValue('套', { timeout: 15000 });

  //20260202K版-包裝單位檢測先排除等待異步處理
  //await expect(page.getByTestId('DRPSA-TF_PSS-B-PAK_UNIT-row_0-input')).toHaveValue('1箱', { timeout: 15000 });
  await page.waitForLoadState('networkidle');

  // 儲存單號到SANOO001
  SANO001 = await page.getByTestId('DRPSA-H-PS_NO').inputValue();  
  if (!SANO001) throw new Error('Failed to get SANOO001');
  dataStorage.setValue('SANOO001', SANO001); // 存到dataStorage以便其他測試案例使用
// 離開銷貨單頁面
  await page.waitForLoadState('networkidle');
  await waitAndClick(page.getByTestId('DRPSA-exit2-btn'));
  await page.waitForLoadState('networkidle');
  

  //********************************************************修改銷貨單B01*******************新增發票
  await page.goto(`#/inv/invsa/${SANO001}`);
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
    await expect(page.getByTestId('dialog-DRPSA-H-AMT')).toHaveValue('140,000', { timeout: 15000 });
    // 11.稅額
    await expect(page.getByTestId('dialog-DRPSA-H-TAX')).toHaveValue('7,000', { timeout: 15000 });
    // 12.合計
    await expect(page.getByTestId('dialog-DRPSA-H-SUM_AMT')).toHaveValue('147,000', { timeout: 15000 });
    // 13.防偽隨機碼 (應為 4 碼數字)
    await expect(page.getByTestId('dialog-DRPSA-H-RAND_NO')).toHaveValue(/^\d{4}$/, { timeout: 15000 });
   
  // 確定並存檔
  await page.getByTestId('dialog-DRPSA-確定-btn').waitFor({ state: 'visible', timeout: 15000 });
  await waitAndClick(page.getByTestId('dialog-DRPSA-確定-btn'));
  await waitAndClick(page.getByTestId('DRPSA-save-btn'));
  await expect(page.getByText('存檔成功')).toBeVisible({ timeout: 150000 });
// 離開銷貨單頁面
  await page.waitForLoadState('networkidle');
  await waitAndClick(page.getByTestId('DRPSA-exit2-btn'));
  await page.waitForLoadState('networkidle');

  //********************************************************修改銷貨單B01*******************修改表身刪除第二列與發票金額
  await page.goto(`#/inv/invsa/${SANO001}`);
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
//20260202K版-修改表頭未稅本位幣金額-------------下3列BUG修正後刪除
await waitAndClick(page.getByTestId('DRPSA-H-AMTN_NET_H-input-wrapper'));
await page.getByTestId('DRPSA-H-AMTN_NET_H').fill('90,000');
await page.getByTestId('DRPSA-H-AMTN_NET_H').press('Enter');
  //await waitAndClick(page.getByTestId('DRPSA-save-btn'));
  //await expect(page.getByText('存檔成功')).toBeVisible({ timeout: 30000 });
  //await page.waitForLoadState('networkidle');
  await waitAndClick(page.getByTestId('DRPSA-radio-button-5'));
  await waitAndClick(page.getByTestId('DRPSA-INV_NO_LIST-B-INV_NO-row_0-cell-wrapper').locator('a'));
  await waitAndClick(page.getByTestId('dialog-DRPSA-H-AMT'));
  await page.getByTestId('dialog-DRPSA-H-AMT').fill('90,000');
  await page.getByTestId('dialog-DRPSA-H-AMT').press('Tab');
  await waitAndClick(page.getByTestId('dialog-DRPSA-H-TAX'));
  await page.getByTestId('dialog-DRPSA-H-TAX').fill('4,500');
  await page.getByTestId('dialog-DRPSA-H-TAX').press('Tab');
  await waitAndClick(page.getByTestId('dialog-DRPSA-確定-btn'));
  await waitAndClick(page.getByTestId('DRPSA-發票-btn'));
  
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
    await expect(page.getByTestId('dialog-DRPSA-H-AMT')).toHaveValue('90,000', { timeout: 15000 });
    // 11.稅額
    await expect(page.getByTestId('dialog-DRPSA-H-TAX')).toHaveValue('4,500', { timeout: 15000 });
    // 12.合計
    await expect(page.getByTestId('dialog-DRPSA-H-SUM_AMT')).toHaveValue('94,500', { timeout: 15000 });
    // 13.防偽隨機碼 (應為 4 碼數字)
    await expect(page.getByTestId('dialog-DRPSA-H-RAND_NO')).toHaveValue(/^\d{4}$/, { timeout: 15000 });
    // 確定並存檔
    await waitAndClick(page.getByTestId('dialog-DRPSA-確定-btn'));
    await waitAndClick(page.getByTestId('DRPSA-save-btn'));
    await expect(page.getByText('存檔成功')).toBeVisible({ timeout: 150000 });
// 離開銷貨單頁面
  await page.waitForLoadState('networkidle');
  await waitAndClick(page.getByTestId('DRPSA-exit2-btn'));
  await page.waitForLoadState('networkidle');


  //********************************************************修改銷貨單B01*******************作廢發票
  await page.goto(`#/inv/invsa/${SANO001}`);
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
  await page.waitForTimeout(5000);
// 離開銷貨單頁面
  await page.waitForLoadState('networkidle');
  await waitAndClick(page.getByTestId('DRPSA-exit2-btn'));
  await page.waitForLoadState('networkidle');
 
  //********************************************************修改銷貨單B01*******************新增發票
  await page.goto(`#/inv/invsa/${SANO001}`);
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
    await expect(page.getByTestId('dialog-DRPSA-H-AMT')).toHaveValue('90,000', { timeout: 15000 });
    // 11.稅額
    await expect(page.getByTestId('dialog-DRPSA-H-TAX')).toHaveValue('4,500', { timeout: 15000 });
    // 12.合計
    await expect(page.getByTestId('dialog-DRPSA-H-SUM_AMT')).toHaveValue('94,500', { timeout: 15000 });
    // 13.防偽隨機碼 (應為 4 碼數字)
    await expect(page.getByTestId('dialog-DRPSA-H-RAND_NO')).toHaveValue(/^\d{4}$/, { timeout: 15000 });

    INVNO001 = await page.getByTestId('dialog-DRPSA-H-INV_NO').inputValue();  // 儲存發票號碼到INVNO001
    if (!INVNO001) throw new Error('Failed to get INVNO001');
    dataStorage.setValue('INVNO001', INVNO001); // 存到dataStorage以便其他測試案例使用  

    // 確定並存檔
    await page.getByTestId('dialog-DRPSA-確定-btn').waitFor({ state: 'visible', timeout: 15000 });
    await waitAndClick(page.getByTestId('dialog-DRPSA-確定-btn'));
    await waitAndClick(page.getByTestId('DRPSA-save-btn'));
    await expect(page.getByText('存檔成功')).toBeVisible({ timeout: 150000 });
    await page.waitForLoadState('networkidle');
// 離開銷貨單頁面
  await page.waitForLoadState('networkidle');
  await waitAndClick(page.getByTestId('DRPSA-exit2-btn'));
  await page.waitForLoadState('networkidle');

  //********************************************************修改銷貨單B01*******************刪除發票
  await page.goto(`#/inv/invsa/${SANO001}`);
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

// 離開銷貨單頁面
  await page.waitForLoadState('networkidle');
  await waitAndClick(page.getByTestId('DRPSA-exit2-btn'));
  await page.waitForLoadState('networkidle');

  
//****************************************************刪除銷貨單B01
    await page.goto(`#/inv/invsa/${SANO001}`);
    await page.waitForTimeout(1000);
    await expect(page.getByRole('dialog', { name: '錯誤' }), '檢測進入頁面沒有報錯').not.toBeVisible();
    await waitAndClick(page.getByTestId('DRPSA-tabset').getByTestId('DRPSA-radio-button-1'));
    await waitAndClick(page.getByTestId('DRPSA-delete-btn'));
    await waitAndClick(page.locator('div').filter({ hasText: '提示' }).nth(3));
    await waitAndClick(page.getByRole('button', { name: '確定' }));
    await expect(page.getByText('刪除成功')).toBeVisible({ timeout: 30000 });  
    await page.waitForTimeout(1000);

// 離開銷貨單頁面
  await page.waitForLoadState('networkidle');
  await waitAndClick(page.getByTestId('DRPSA-exit2-btn'));
  await page.waitForLoadState('networkidle');


  
  //****************************************************刪除受訂單001
    await page.goto(`#/inv/invso/${SONO001}`);
    await page.waitForTimeout(1000);
    await expect(page.getByRole('dialog', { name: '錯誤' }), '檢測進入頁面沒有報錯').not.toBeVisible();
    await waitAndClick(page.getByTestId('DRPSO-tabset').getByTestId('DRPSO-radio-button-1'));
    await waitAndClick(page.getByTestId('DRPSO-delete-btn'));
    await waitAndClick(page.locator('div').filter({ hasText: '提示' }).nth(3));
    await waitAndClick(page.getByRole('button', { name: '確定' }));
  await page.waitForLoadState('networkidle');
    await expect(page.getByText('刪除成功')).toBeVisible({ timeout: 20000 });  
  await page.waitForTimeout(10000);


// 離開受訂單頁面
  await page.waitForLoadState('networkidle');
  await waitAndClick(page.getByTestId('DRPSO-exit2-btn'));
  await page.waitForLoadState('networkidle');



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
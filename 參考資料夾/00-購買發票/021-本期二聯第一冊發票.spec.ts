import { test, expect } from '@playwright/test';

test('購買本期二聯第一冊發票', async ({ page }) => {
  //購買本期二聯第一冊發票  
  await page.goto('#/basic/invcn/list');
  await page.waitForTimeout(1000);
  await page.getByTestId('DRPINVCN-add-btn').click();
  await page.getByTestId('DRPINVCN-radio-button-1').click();
  await page.getByTestId('DRPINVCN-H-YYMM').click();
  await page.getByTestId('DRPINVCN-H-YYMM').press('Enter');
  await page.getByTestId('DRPINVCN-H-INV_ID-input-inner').click();
  await page.getByTestId('DRPINVCN-H-INV_ID-option-2').click();
  await page.getByTestId('DRPINVCN-H-INV_ID-input-inner').press('Enter');
  await page.getByTestId('DRPINVCN-H-TRACK_ID').fill('TT');
  await page.getByTestId('DRPINVCN-H-TRACK_ID').press('Enter');
  await page.getByTestId('DRPINVCN-H-F_SEQ_NO').click();
  await page.getByTestId('DRPINVCN-H-F_SEQ_NO').fill('00000000');
  await page.getByTestId('DRPINVCN-H-F_SEQ_NO').press('Enter');
  await page.getByTestId('DRPINVCN-save-btn').click();
  await expect(page.getByText('存檔成功')).toBeVisible();
  await page.waitForTimeout(500);
});
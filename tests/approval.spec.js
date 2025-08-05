import { test, expect } from '@playwright/test';
import { printToast } from '../utils/toast';

test('Approve Visitor E-Pass', async ({ page }) => {
  const passId = process.env.PASS_ID || 'VXP123456'; // You can use env file or shared memory

  // Login as approver
  await page.goto('https://www.gateease.in/');
  await page.fill('input[name=email]', 'divya.m@company.com');
  await page.fill('input[name=password]', 'Mintern@123');
  await page.click('button:has-text("Sign-in")');
  await page.waitForTimeout(2000);

  await page.locator('div').filter({ hasText: /^Approval Queue$/ }).click();
  await page.locator("div[class*='grid-cols-1'] >> text=VISITOR").first().click();
  await page.getByRole('cell').filter({ hasText: /^$/ }).nth(1).click();
  await page.getByText('Select Type').click();
  await page.getByText('Approve', { exact: true }).click();
  await page.getByRole('textbox', { name: 'Comment' }).click();
  await page.getByRole('textbox', { name: 'Comment' }).fill('asdvf');
  await page.getByRole('textbox', { name: 'Comment' }).fill('asdvfDFVDBSFEFWVWBF Q');
  await page.getByRole('textbox', { name: 'Comment' }).fill('asdvfDFVDBSFEFWVWBF QDWFEVBR');
  await page.getByRole('textbox', { name: 'Comment' }).click();
  await page.getByRole('textbox', { name: 'Comment' }).fill('asdvfDFVDBSFEFWVWBF QDWFEVBRFVD F CDVSF GDVFDG F ACSDVSFD DVFD CSADVSF D VDSBFD DVFDG SADVBFG EWVDSF DADVSFDDSF SADVSFDV');
  await page.getByRole('button', { name: 'Update' }).click();
  await printToast(page);
  await page.waitForTimeout(2000);
  await page.getByRole('button', { name: 'Approved' }).click();
  await page.waitForTimeout(2000);
  await page.getByRole('link').filter({ hasText: /^$/ }).click();
  await page.getByRole('button', { name: 'Logout' }).click();

});

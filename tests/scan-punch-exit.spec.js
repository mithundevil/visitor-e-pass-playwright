import { test } from '@playwright/test';
import { printToast } from '../utils/toast';
import fs from 'fs';
import path from 'path';

const fakeVideoPath = path.resolve(__dirname, '../data/fake-video.y4m');

test.use({
  permissions: ['camera'],
  launchOptions: {
    args: [
      '--use-fake-device-for-media-stream',
      `--use-file-for-fake-video-capture=${fakeVideoPath}`
    ]
  }
});

test('Scan, Punch-In, Punch-Out, Premise-Out Visitor', async ({ browser }) => {
    test.setTimeout(120000);
  const passId = JSON.parse(fs.readFileSync('pass-id.json')).passId;

  // --- SCAN (Meena)
  const scanCtx = await browser.newContext();
  const scanPage = await scanCtx.newPage();
  await scanPage.goto('https://staging.gateease.in');
  await scanPage.getByRole('textbox', { name: 'Enter your email address' }).fill('meena.a@company.com');
  await scanPage.getByRole('textbox', { name: 'Enter your password' }).fill('Mintern@123');
  await scanPage.getByRole('button', { name: 'Sign-in' }).click();
  await scanPage.locator('rect').nth(2).click();
  await scanPage.getByRole('button', { name: 'Search' }).click();
  await scanPage.getByRole('textbox', { name: 'Enter Pass ID' }).fill(passId);
  await scanPage.getByRole('button', { name: 'Submit' }).click();
  await scanPage.getByRole('button', { name: 'Premise-In' }).click();
  await printToast(scanPage);
  await scanPage.getByRole('button').first().click();
  await scanPage.getByRole('link').click();
  await scanPage.getByRole('button', { name: 'Logout' }).click();
  await scanCtx.close();

  // --- PUNCH-IN (Kumar)
  const punchInCtx = await browser.newContext();
  const punchInPage = await punchInCtx.newPage();
  await punchInPage.goto('https://staging.gateease.in');
  await punchInPage.getByRole('textbox', { name: 'Enter your email address' }).fill('kumar.r@company.com');
  await punchInPage.getByRole('textbox', { name: 'Enter your password' }).fill('Mintern@123');
  await punchInPage.getByRole('button', { name: 'Sign-in' }).click();
  await punchInPage.getByRole('button', { name: 'Search' }).click();
  await punchInPage.getByRole('textbox', { name: 'Enter Pass ID' }).fill(passId);
  await punchInPage.getByRole('button', { name: 'Submit' }).click();
  await punchInPage.getByRole('button', { name: 'Punch-In' }).click();
  await printToast(punchInPage);
  await punchInPage.getByRole('button').first().click();
  await punchInPage.getByRole('link').click();
  await punchInPage.getByRole('button', { name: 'Logout' }).click();
  await punchInCtx.close();

  // --- PUNCH-OUT (Kumar)
  const punchOutCtx = await browser.newContext();
  const punchOutPage = await punchOutCtx.newPage();
  await punchOutPage.goto('https://staging.gateease.in');
  await punchOutPage.getByRole('textbox', { name: 'Enter your email address' }).fill('kumar.r@company.com');
  await punchOutPage.getByRole('textbox', { name: 'Enter your password' }).fill('Mintern@123');
  await punchOutPage.getByRole('button', { name: 'Sign-in' }).click();
  await punchOutPage.locator('rect').nth(1).click();
  await punchOutPage.getByRole('button', { name: 'Search' }).click();
  await punchOutPage.getByRole('textbox', { name: 'Enter Pass ID' }).fill(passId);
  await punchOutPage.getByRole('button', { name: 'Submit' }).click();
  await punchOutPage.getByRole('button', { name: 'Punch Out' }).click();
  await punchOutPage.locator('#checkIn_Reason').fill('Punch-out reason');
  await punchOutPage.getByRole('button', { name: 'Punch-Out' }).click();
  await printToast(punchOutPage);
  await punchOutPage.getByRole('button').first().click();
  await punchOutPage.getByRole('link').click();
  await punchOutPage.getByRole('button', { name: 'Logout' }).click();
  await punchOutCtx.close();

  // --- PREMISE-OUT (Meena)
  const outCtx = await browser.newContext();
  const outPage = await outCtx.newPage();
  await outPage.goto('https://staging.gateease.in');
  await outPage.getByRole('textbox', { name: 'Enter your email address' }).fill('meena.a@company.com');
  await outPage.getByRole('textbox', { name: 'Enter your password' }).fill('Mintern@123');
  await outPage.getByRole('button', { name: 'Sign-in' }).click();
  await outPage.locator('rect').nth(1).click();
  await outPage.getByRole('button', { name: 'Search' }).click();
  await outPage.getByRole('textbox', { name: 'Enter Pass ID' }).fill(passId);
  await outPage.getByRole('button', { name: 'Submit' }).click();
  await outPage.getByRole('button', { name: 'Items Carried' }).click();

  await outPage.locator('div').filter({ hasText: /^Tools List0\/120orDrop your images here or click to upload\. \(e\.g\., JPG, PNG, PDF\)$/ }).getByRole('button').click();
  await outPage.getByRole('button', { name: 'Capture' }).click();
  await outPage.getByRole('button', { name: 'Confirm' }).click();
  await outPage.getByRole('button').filter({ hasText: /^$/ }).nth(2).click();
  await outPage.getByRole('button', { name: 'Capture' }).click();
  await outPage.getByRole('button', { name: 'Confirm' }).click();
  await outPage.locator('div').filter({ hasText: /^or$/ }).getByRole('button').click();
  await outPage.getByRole('button', { name: 'Capture' }).click();
  await outPage.getByRole('button', { name: 'Confirm' }).click();
  await outPage.getByRole('button', { name: 'Premise-Out' }).click();
  await printToast(outPage);
  await outPage.waitForTimeout(2000);
  await outPage.getByRole('button').first().click();
  await outPage.getByRole('link').click();
  await outPage.getByRole('button', { name: 'Logout' }).click();
  await outCtx.close();
});

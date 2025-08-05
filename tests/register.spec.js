import { test, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';
import { printToast } from '../utils/toast';

const fakeVideoPath = path.resolve(__dirname, '../data/fake-video.y4m');
const pdfPath = path.resolve(__dirname, '../data/Attendance_Jun_2025.pdf');

test.use({
  permissions: ['camera'],
  launchOptions: {
    args: [
      '--use-fake-device-for-media-stream',
      `--use-file-for-fake-video-capture=${fakeVideoPath}`
    ],
  },
});

test('Register Visitor E-Pass with fake camera and PDF', async ({ page }) => {
  // Basic validations
  if (!fs.existsSync(fakeVideoPath)) throw new Error('Missing fake-video.y4m');
  if (!fs.existsSync(pdfPath)) throw new Error('Missing Attendance_Jun_2025.pdf');

// Step 1: Login
await page.goto('https://staging.gateease.in');
await page.getByRole('textbox', { name: /email/i }).fill('visitormaster@gmail.com');
await page.getByRole('textbox', { name: /password/i }).fill('Mintern@123');
await page.getByRole('button', { name: /sign-in/i }).click();
await page.waitForLoadState('networkidle');
// Step 2: Navigate to E-Pass → Visitor
await page.getByRole('list').getByText('E-Pass').click();
await page.locator('div', { hasText: /^VISITOR$/ }).nth(1).click();
// Step 3: Click "New Visitor"
await page.getByRole('main').locator('span').click();
// Step 4: Fill form
await page.waitForSelector('#Visitor_name', { timeout: 10000 });
await page.fill('#Visitor_name', 'John Doe');
await page.fill('#Visitor_phone', '+911231547890');
await page.fill('#Visitor_email', 'john.doe2@example.com');
await page.fill('#Visitor_address', '123 Main St');
await page.fill('#Visitor_zipcode', '629801');
await page.fill('#Visitor_Organization', 'Example Company');
await page.fill('#Visitor_vehicleNumber', 'TN74A1598');
await page.click('div:has-text("Select Type")');
await page.click('div:has-text("Aadhar Card")');
await page.fill('#Visitor_idNumber', '123452789012');
// Step 5: Upload PDF ID proof
await page.setInputFiles('#fileUploadVisitor_idProff', pdfPath);
// Step 6: Fake Camera Turn On & Capture
const turnOnBtn = page.getByRole('button', { name: /Turn On/i });
if (await turnOnBtn.isVisible()) {
  await turnOnBtn.click();
  await page.waitForTimeout(2000); // Let the fake cam init
}
// Wait for video or canvas element
try {
  await page.waitForSelector('video, canvas', { timeout: 10000 });
} catch {
  console.warn('⚠️ Camera feed not detected');
}
const captureBtn = page.getByRole('button', { name: /Capture/i });
await captureBtn.waitFor({ state: 'visible', timeout: 10000 });
await captureBtn.click();
await page.waitForTimeout(1000);
// Step 7: Submit
await page.getByRole('button', { name: /Next/i }).click();
// Optional: Validate next screen or toast
// await expect(page.getByText('Host Selection')).toBeVisible();
await page.getByText('Select Type').first().click();
await page.getByText('Main Gate Entry').click();
await page.getByText('Select Type').first().click();
await page.getByText('Meeting').click();
await page.getByText('Select Type').click();
await page.getByText('Engineering').click();
await page.getByRole('textbox', { name: 'Type to filter' }).click();
await page.getByText('P. Balaji (Department Head)').click();
await page.getByRole('spinbutton', { name: 'Person Accompanying' }).click();
await page.getByRole('spinbutton', { name: 'Person Accompanying' }).fill('1');
await page.getByRole('textbox', { name: 'Name' }).click();
await page.getByRole('textbox', { name: 'Name' }).fill('rewtreth');
await page.getByRole('textbox', { name: 'Mobile Number *' }).click();
await page.getByRole('textbox', { name: 'Mobile Number *' }).fill('+91 46512-849251');
await page.getByRole('textbox', { name: 'Exit Date' }).fill('2025-07-12');
await page.getByRole('textbox', { name: 'Exit Time' }).click();
await page.getByRole('textbox', { name: 'Exit Time' }).fill('23:00');
await page.getByRole('button', { name: 'Next' }).click();
await page.getByRole('checkbox', { name: 'Mobile Access' }).check();
await page.getByRole('main').getByRole('textbox').nth(3).click();
await page.getByRole('main').getByRole('textbox').nth(3).fill('84653134853');
await page.getByRole('button').filter({ hasText: /^$/ }).nth(2).click();
await page.getByRole('main').getByRole('textbox').nth(3).click();
await page.getByRole('main').getByRole('textbox').nth(3).fill('486513264531');
await page.getByRole('button', { name: 'Save' }).click();
await page.getByRole('checkbox', { name: 'Electronical Gadgets Access' }).check();
await page.locator('input[name="item"]').click();
await page.locator('input[name="item"]').fill('mobilree');
await page.locator('input[name="serial"]').click();
await page.locator('input[name="item"]').fill('mobilree87645');
await page.locator('input[name="serial"]').fill('1');
await page.locator('input[name="serial"]').click();
await page.locator('input[name="serial"]').fill('178654');
await page.getByRole('button').filter({ hasText: /^$/ }).nth(2).click();
await page.locator('div').filter({ hasText: /^Item 2$/ }).getByRole('textbox').click();
await page.locator('div').filter({ hasText: /^Item 2$/ }).getByRole('textbox').fill('sdsfbdf');
await page.locator('div').filter({ hasText: /^Item 2Serial Number$/ }).locator('input[name="serial"]').click();
await page.locator('div').filter({ hasText: /^Item 2Serial Number$/ }).locator('input[name="serial"]').fill('78946512654');
await page.getByRole('button', { name: 'Save' }).click();
await page.getByRole('checkbox', { name: 'Material Inward' }).check();
await page.getByRole('textbox', { name: 'Party name' }).click();
await page.getByRole('textbox', { name: 'Party name' }).fill('No Party');
await page.getByRole('textbox', { name: 'Bill Number' }).click();
await page.getByRole('textbox', { name: 'Bill Number' }).fill('32354');
await page.getByRole('textbox', { name: 'Purchase Number' }).click();
await page.getByRole('textbox', { name: 'Purchase Number' }).fill('3425654');
await page.locator('input[name="items"]').click();  
await page.locator('input[name="items"]').fill('grsdhgnf');
await page.getByRole('spinbutton').click();                                                                                                                                                                                                                                                                                                                                                                                                                             
await page.getByRole('spinbutton').fill('1500');
await page.getByText('Select Type').click();  
await page.getByText('Kilogram (kg)').click();
await page.getByRole('button', { name: 'Add' }).click();
await page.getByRole('row', { name: 'Select Type' }).getByRole('textbox').click();
await page.getByRole('row', { name: 'Select Type' }).getByRole('textbox').fill('dsgdfgnf');
await page.getByRole('row', { name: 'dsgdfgnf Select Type' }).getByRole('spinbutton').click();
await page.getByRole('row', { name: 'dsgdfgnf Select Type' }).getByRole('spinbutton').fill('50');
await page.getByText('Select Type').click();
await page.getByText('Liter (L)').nth(1).click();
await page.getByRole('button', { name: 'Save' }).click();
await page.getByRole('checkbox', { name: 'Tools List' }).check();
await page.locator('div').filter({ hasText: /^Drag and drop or click to uploadSupports: JPG, PNG, PDF0\/120$/ }).getByRole('button').click();
await page.getByRole('button', { name: 'Capture' }).click();
await page.getByRole('button', { name: 'Confirm' }).click();
await page.locator('.w-full.h-\\[240px\\]').first().click();
await page.locator('div').filter({ hasText: /^Spares List$/ }).nth(1).click();
await page.locator('div').filter({ hasText: /^Drag and drop or click to uploadSupports: JPG, PNG, PDF0\/120$/ }).getByRole('button').click();
await page.getByRole('button', { name: 'Capture' }).click();
await page.getByRole('button', { name: 'Confirm' }).click();
await page.getByRole('checkbox', { name: 'Other Material' }).check();
await page.locator('div').filter({ hasText: /^Drag and drop or click to uploadSupports: JPG, PNG, PDF0\/120$/ }).getByRole('button').click();
await page.getByRole('button', { name: 'Capture' }).click();
await page.getByRole('button', { name: 'Confirm' }).click();
await page.getByRole('textbox', { name: 'Add notes for Tools' }).click();
await page.getByRole('textbox', { name: 'Add notes for Tools' }).fill('ewrhtefwgrergwerbgrebgrefgerbnefgfbgnefwgrfb fegfbdgregre fegbfdgndgwfbdg efgfdbgnfgrbg efgfdbgnfewfgfdbg fdgfdbgnfergfd');
await page.getByRole('textbox', { name: 'Add notes for Spares' }).click();
await page.getByRole('textbox', { name: 'Add notes for Spares' }).fill('sgfdhgnfegfbefgsfdbefsgdbvfgdbgdfgfdbgdfsgfdbfsgdfbfegsfsgdbgnsgfdbdsgfdbfgfbdgnfdgnfgfbdgngfdbgngbdfgdbsgdbfsgfsgdgfngf');
await page.getByRole('textbox', { name: 'Add notes for Spares' }).press('ControlOrMeta+a');
await page.getByRole('textbox', { name: 'Add notes for Spares' }).press('ControlOrMeta+c');
await page.getByRole('textbox', { name: 'Add notes for Materials' }).click();
await page.getByRole('textbox', { name: 'Add notes for Materials' }).fill('sgfdhgnfegfbefgsfdbefsgdbvfgdbgdfgfdbgdfsgfdbfsgdfbfegsfsgdbgnsgfdbdsgfdbfgfbdgnfdgnfgfbdgngfdbgngbdfgdbsgdbfsgfsgdgfngf');
await page.getByRole('button', { name: 'Next' }).click();

//next page
await page.getByRole('textbox', { name: 'Department' }).click();
await page.locator('div', { hasText: /^HR$/ }).click({ timeout: 10000 });
await page.getByRole('textbox', { name: 'Approver' }).click();
await page.getByText('M. DivyaHR Assistant').click();
await page.getByRole('textbox', { name: 'Premise In Gate' }).click();
await page.getByText('Main Gate Entry').first().click();
await page.getByRole('textbox', { name: 'Premise Out Gate' }).click();
await page.getByText('Main Gate Entry').nth(1).click();
await page.getByRole('textbox', { name: 'Allowed Checkpoints' }).click();
await page.getByRole('main').locator('div').filter({ hasText: 'Department EngineeringGate Security Access Control AdminHRApprover Premise In' }).nth(3).click();
await page.getByRole('button', { name: 'Next' }).click();
await page.getByRole('button', { name: 'Material Inward' }).click();
await page.getByRole('button', { name: 'Items Carried' }).click();
await page.waitForTimeout(2000);
await page.getByRole('button', { name: 'Submit' }).click();
await printToast(page);
await page.waitForTimeout(2000);

// Wait for the Pass ID input (with value starting with 'VXP') to be visible in the popup
const passIdInput = page.locator('input[value^="VXP"]');
await passIdInput.waitFor({ state: 'visible', timeout: 10000 });

// Extract the dynamic Pass ID value
const passId = await passIdInput.inputValue();
console.log('Extracted Pass ID:', passId);

fs.writeFileSync('pass-id.json', JSON.stringify({ passId }));

await page.locator('div').filter({ hasText: /^EnglishVisitor Master$/ }).getByRole('link').nth(1).click();
await page.getByRole('button', { name: 'Logout' }).click();
});

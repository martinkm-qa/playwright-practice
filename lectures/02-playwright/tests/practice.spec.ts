import { test, expect } from '@playwright/test';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const homePageUrl = pathToFileURL(
	resolve(__dirname, '../pages/dropdowns.html'),
).href;

const checkBoxesUrl = pathToFileURL(
    resolve(__dirname, '../pages/checkboxes-radio.html')
).href

const tables = pathToFileURL(
	resolve(__dirname, '../pages/tables.html'),
).href;


const dynamicContentUrl = pathToFileURL(
	resolve(__dirname, '../pages/dynamic-content.html'),
).href;

const frames = pathToFileURL(
	resolve(__dirname, '../pages/frames.html'),
).href;

const dialogsURL = pathToFileURL(
	resolve(__dirname, '../pages/dialogs.html'),
).href;

// Verifies selecting Bulgaria updates the result text.
test('dropdown', async ({ page }) => {
    await page.goto(homePageUrl, { waitUntil: 'domcontentloaded' });
	await page.locator('#country').selectOption('bulgaria');
	await expect(page.locator('#country')).toHaveValue('bulgaria');
	await expect(page.locator('#country-result')).toHaveText('Selected country: Bulgaria (bulgaria).',)
   
    
});

// Verifies both interests can be selected at the same time.
test('designTesting', async({page}) => {
    await page.goto(checkBoxesUrl, {waitUntil: 'domcontentloaded'})
    await page.locator('#interest-design').check();
    await page.locator('#interest-testing').check();
    await expect(page.locator('#interest-design')).toBeChecked();
    await expect(page.locator('#interest-testing')).toBeChecked();
    
})


// Verifies the form reports an error and hides the success result when terms are not accepted.
test('registration without terms', async({page})=> {
    await page.goto(checkBoxesUrl, {waitUntil: 'domcontentloaded'});
    await page.locator('#submit-button').click();
    await expect(page.locator('#terms-error')).toBeVisible();
    await expect(page.locator('#terms-error')).toContainText('Please accept the terms before registering.');
    await expect(page.locator('#registration-result')).toBeHidden();

})

// Verifies editing the role in Alex Morgan's row.
test('redacting table', async({page})=> {
    await page.goto(tables, {waitUntil: 'domcontentloaded'})
  const alexRow =  await page.getByRole('row').filter({hasText: 'Alex Morgan'})
  await alexRow.getByRole('button', {name: 'Edit'}).click();
  await page.getByLabel('Member Role').selectOption('Admin');
  await page.getByRole('button', {name: 'Save Changes'}).click();
  await expect(alexRow.locator('.member-role')).toHaveText('Admin');
})

// Verifies the collection loads with six items and the expected first product.
test('dynamic content', async({page})=> {
await page.goto(dynamicContentUrl, {waitUntil: 'domcontentloaded'});
await page.getByRole('button', { name: 'Load collection' }).click();
await expect(page.locator('.item')).toHaveCount(6);
await expect(page.locator('.item').first()).toHaveText('Everyday Notebook');


});

// Verifies entering and saving a note inside the iframe.
test('frames', async({page})=> {
    await page.goto(frames, {waitUntil: 'domcontentloaded'});
    const frame = await page.frameLocator('#my-frame');
    await frame.getByLabel('Your note').fill('Hello from my test!');
    await frame.getByRole('button', {name: 'Save Note'}).click();
    await expect(frame.getByRole('status')).toHaveText('Saved note: Hello from my test!')

})

// Verifies accepting the prompt dialog and displaying the greeting.
test('dialogs', async ({ page }) => {
  await page.goto(dialogsURL, { waitUntil: 'domcontentloaded' });

  page.once('dialog', async (dialog) => {
    expect(dialog.type()).toBe('prompt');
    await dialog.accept('Martin');
  });
  
 await page.getByRole('button', {name: 'Enter your name'}).click();
 await expect(page.locator('#prompt-result')).toHaveText('Hello, Martin!')
 
})


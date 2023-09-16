import { test, expect, chromium } from '@playwright/test'; 

test('has title', async ({ page}) => {
    const browser = await chromium.launch({
    headless: false,
    channel: "chrome"
  })
  await page.goto('https://auth.modiohealth.com/');
  await page.locator('#idp-discovery-username').fill('saravana.k@unislink.com');
  await page.locator('input#idp-discovery-submit').click();
  await page.waitForTimeout(3000);
  await page.screenshot({path : 'pic.png'});
});


test('file upload', async ({page}) => {
  const browser = await chromium.launch({
    headless: false
  });
  const context = await browser.newContext();
await context.tracing.start({ screenshots: true, snapshots: true });

await context.tracing.stop({ path: 'trace.zip' });
  
//  const context = await browser.newContext({recordVideo: {dir:'videos/'} });
  await page.goto('https://the-internet.herokuapp.com/upload');
 await page.locator('input#file-upload').setInputFiles('pic.png'); 
 // await page.locator('input#file-upload').setInputFiles(['pic1.png', 'pic2.png']); 
  await page.locator('input#file-submit').click();
  await page.screenshot({path: 'upload.png'});
  await page.waitForTimeout(4000);
  await context.tracing.stop({ path: 'trace.zip' });
 });

  test('download',async ({page})=>{
    await page.goto('https://the-internet.herokuapp.com/upload');
    const downloadPromise = page.waitForEvent('download');
    await page.getByText('Elemental Selenium').click();
const download = await downloadPromise;

console.log(await download.path());

await download.saveAs('/path/to/save/download/at.png');
  })

  test('URL request',async ({page})=>{
    await page.goto('https://auth.modiohealth.com/signin');
    
    await page.getByRole('checkbox', { name: 'Subscribe' }).check();
    await page.screenshot({path:'get.png'})
  
   })
    
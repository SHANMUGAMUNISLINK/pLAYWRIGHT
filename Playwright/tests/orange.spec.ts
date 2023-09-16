import { test, expect ,} from '@playwright/test'; 

test('sample test', async({page,browser}) => {
    // const context = await Browser.newContext({
        const context = await browser.newContext({ recordVideo: { dir: 'videos/' } });
        await context.close();
    // });
  await page.goto('https://opensource-demo.orangehrmlive.com/');
  
 // const username = await page.frameLocator('.frame-class').getByPlaceholder('Username')
//await username.fill('admin');
 await page.getByPlaceholder('Username').fill('admin')
await page.locator('div').filter({ hasText: /^Password$/ }).nth(2).fill('admin123');
  await expect(page.getByPlaceholder('Password')).toBeVisible();
  await page.locator('.orangehrm-login-button').click();
  await page.locator('li:nth-of-type(1) > .oxd-main-menu-item').click();
  await page.waitForTimeout(4000);
  await page.screenshot({path: 'exe.png'})
})
  
  test('filter by text', async({page})=>{
    await page.goto('https://www.amazon.in/');
    await page.getByLabel('Open Menu').click()
   await page.getByText('digital content and devices').first()
    await page.locator('div#hmenu-content').filter({ hasText:'Amazon miniTV- FREE entertainment'})
    await page.waitForTimeout(2000)
    await page.screenshot({path: 'filter.png'})

  })
 
  test('get by list', async({page})=>{
    await page.goto('https://playwright.dev/docs/locators#locate-by-alt-text');
    await expect(page.getByTitle('Issues count')).toHaveText('25 issues');
    await page.waitForTimeout(3000)
    await page.screenshot({path:'alt.png'});
  })
   
 
  test('get by list-1', async({page})=>{
    await page.goto('https://playwright.dev/docs/locators#locate-by-alt-text');
        const [popup] = await Promise.all([
        page.waitForEvent('popup'),
        page.click('a[target=_blank]') 
      ]);
      await popup.waitForLoadState();
      await expect(page.getByTitle('Issues count')).toHaveText('25 issues');
      await page.waitForTimeout(3000)
      await page.screenshot({path:'alt.png'});
    })
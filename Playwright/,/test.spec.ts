  import { test} from '@playwright/test';
 

 test('login page loads successfully', async ({ page }) => {
  await page.goto("/");
  await page.getByPlaceholder('Username').fill('admin')
  await page.getByPlaceholder('Password').fill('admin123');
  await page.waitForTimeout(2000)
  await page.screenshot({path : 'server.png'});
 });

 test('click login button', async({page})=>{
 await page.goto("/");
 await page.getByPlaceholder('Username').fill('admin')
  await page.getByPlaceholder('Password').fill('admin123');
 await page.locator('.orangehrm-login-button').click();
 page.waitForTimeout(2000)
 await page.screenshot({path: 'login.png'})
})

 test('dash board',async ({page})=>{
 await page.goto("/web/index.php/dashboard/index"); 
 await page.locator('li:nth-of-type(1) > .oxd-main-menu-item').click();
 await page.waitForTimeout(2000)
 await page.screenshot({path: 'dashb.png'})   
 })



 

// test('Get by' ,({page})=>{
     
//      page.goto("/");
    

// })
import { chromium } from 'playwright';

// Function to log in and print element text
async function loginAndPrintElementText() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    // Navigate to the login page
    page.goto('https://beta.unislink.com/rpt/', { waitUntil: 'load' });
    await page.getByRole('link', { name: 'Unislink AD' }).click();
    await page.waitForLoadState('load');
    await page.getByPlaceholder('Email, phone, or Skype').fill('shanmugarajeshwaran.m@unislink.com');
    await page.getByRole('button', { name: 'Next' }).click();
    await page.getByPlaceholder('Password').fill('Dur57272');
    await page.getByRole('button', { name: 'Sign in' }).click();
    await page.getByRole('button', { name: 'Yes' }).click();
    await page.waitForSelector('body > app-root > app-layout > div > app-header > nav > ul:nth-child(4) > li:nth-child(1) > div > div > span');
    // Get the practice element's text
    const hospitalname = await page.textContent('body > app-root > app-layout > div > app-header > nav > ul:nth-child(4) > li:nth-child(1) > div > div > span');
    const date = await page.textContent('body > app-root > app-layout > div > app-header > nav > ul:nth-child(4) > li:nth-child(1) > div > i > date-display > span'); // Add your second selector here
    if (hospitalname === null) {
      throw new Error('Practice element not found');
    }
    console.log('Hospital Name:', hospitalname);
    console.log('DATE:', date)

    await page.click('body > app-root > app-layout > div > app-header > nav > ul:nth-child(4) > li:nth-child(5) > a', { timeout: 2000 });
    // Dropdown selection
    await page.selectOption('div[role="dialog"] span:nth-child(4)',{index:5});
    // await page.waitForSelector('body > modal-container > div > div > div.modal-body > div > div > div.col-8.p-0 > combo-component > ng-select');  
    // // Click on 'New Practice'
    //  await page.selectOption('body > modal-container > div > div > div.modal-body > div > div > div.col-8.p-0 > combo-component > ng-select',{index:5});
    await page.getByRole('button', { name: 'Switch Practice' }).click();
  } catch (error) {
    console.error('Error:', error);
  } finally {
    // Close the browser
    await browser.close();
  }
}

// Function to perform the second method
async function secondMethod(username: string, password: string) {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    // Navigate to the login page
    page.goto('https://beta.unislink.com/rpt/', { waitUntil: 'load' });
    await page.locator('#UnislinkAD').click();
    // Fill in the username and password
    
    await page.waitForLoadState('load');
    await page.waitForSelector('body > app-root > app-layout > div > app-header > nav > ul:nth-child(4) > li:nth-child(1) > div > div > span');
    // Get the current practice element's name
    const newname = await page.textContent("body > app-root > app-layout > div > app-header > nav > ul:nth-child(4) > li:nth-child(1) > div > div > span");
    console.log('New Name:', newname);
    const newdate = await page.textContent('body > app-root > app-layout > div > app-header > nav > ul:nth-child(4) > li:nth-child(1) > div > i > date-display > span');

    // Perform other actions as needed
  } catch (error) {
    console.error('Error:', error);
  } finally {
    // Close the browser
    await browser.close();
  }
}

// // Usage: Call the functions with your username and password
// loginAndPrintElementText('shanmugarajeshwaran.m@unislink.com', 'Dur57272');
// secondMethod('shanmugarajeshwaran.m@unislink.com', 'Dur57272');
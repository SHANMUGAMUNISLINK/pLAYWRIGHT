import express from 'express';
import { Request, Response } from 'express';
import { chromium, Browser, Page } from 'playwright';

const app = express();
const port = 3001;

app.get('/get-element-text', async (req: Request, res: Response) => {
  try {
    const elementText = await loginAndFetchPracticeElementName();
    res.status(200).json({ elementText });
  } catch (error) {
    console.error('Main Error:', error);
    res.status(500).json({ error: 'An error occurred while executing the Playwright script' });
  }
});

async function loginAndFetchPracticeElementName(): Promise<string> {
  const browser: Browser = await chromium.launch({ channel: 'chrome' });
  const page: Page = await browser.newPage();
  try {
    page.goto('https://beta.unislink.com/rpt/', { waitUntil: 'load' });
    await page.getByRole('link', { name: 'Unislink AD' }).click();
    await page.waitForLoadState('load');
    await page.getByPlaceholder('Email, phone, or Skype').fill('shanmugarajeshwaran.m@unislink.com');
    await page.getByRole('button', { name: 'Next' }).click();
    await page.getByPlaceholder('Password').fill('Dur57272');
    await page.getByRole('button', { name: 'Sign in' }).click();
    await page.getByRole('button', { name: 'Yes' }).click();
    await page.waitForLoadState('load');
    await page.waitForSelector('body > app-root > app-layout > div > app-header > nav > ul:nth-child(4) > li:nth-child(1) > div > div > span');
    // Get the practice element's text
   const hospitalname = await page.textContent('body > app-root > app-layout > div > app-header > nav > ul:nth-child(4) > li:nth-child(1) > div > div > span');
    // Perform additional actions as needed
    const date = await page.textContent('body > app-root > app-layout > div > app-header > nav > ul:nth-child(4) > li:nth-child(1) > div > i > date-display > span'); // Add your second selector here
    if (hospitalname === null) {
      throw new Error('Practice element not found');
    }
    console.log('Hospital Name:', hospitalname);
    console.log('DATE:', date)
    return hospitalname || 'Element not found'; // Return the element text or a default message
  } catch (error) {
    console.error('Error:', error);
    throw error; // Rethrow the error to handle it in the route
  } finally {
    await browser.close();
  }
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});






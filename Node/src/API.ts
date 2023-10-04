import express from 'express';
import { Request, Response } from 'express';
import { chromium, Browser, Page } from 'playwright';

const app = express();
const port = 3001;

app.get('/get-element-text', async (req: Request, res: Response) => {
  try {
    const { hospitalname, date } = req.query;
    if (!hospitalname || !date) {
      return res.status(400).json({ error: 'Missing hospitalname or date in the query parameters' });
    }

    const { hospitalnameText, dateText } = await loginAndFetchPracticeElementName();
    res.status(200).json({ hospitalname: hospitalnameText, date: dateText });
  } catch (error) {
    console.error('Main Error:', error);
    res.status(500).json({ error: 'An error occurred while executing the Playwright script' });
  }
});

async function loginAndFetchPracticeElementName(): Promise<{ hospitalnameText: string, dateText: string }> {
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
    
    const hospitalnameText = await page.textContent('body > app-root > app-layout > div > app-header > nav > ul:nth-child(4) > li:nth-child(1) > div > div > span');
    const dateText = await page.textContent('body > app-root > app-layout > div > app-header > nav > ul:nth-child(4) > li:nth-child(1) > div > i > date-display > span');

    if (hospitalnameText === null) {
      throw new Error('Hospital name not found');
    }

    if (dateText === null) {
      throw new Error('Date not found');
    }

    console.log('Hospital Name:', hospitalnameText);
    console.log('DATE:', dateText);

    return { hospitalnameText, dateText };
  } catch (error) {
    console.error('Error:', error);
    throw error; 
  } finally {
    await browser.close();
  }
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

///node build/api.js
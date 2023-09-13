import { test, expect,  } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://auth.modiohealth.com/');

  await page.locator('#idp-discovery-username').fill('saravana.k@unislink.com');

  await page.screenshot({path : 'pic.png'});
});


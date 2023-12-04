import * as puppeteer from 'puppeteer';
import { Page, Browser } from 'puppeteer';

import { loginToSpotify } from './login';

export const checkGroupStatus = async (link: string): Promise<string> => {
  const browser: Browser = await puppeteer.launch({
    headless: 'new',
    args: ['--disable-gpu', '--disable-dev-shm-usage', '--disable-setuid-sandbox', '--no-sandbox', '--incognito'],
  });

  const page: Page = await browser.newPage();
  
  try {
    await loginToSpotify(page);
    await page.goto(link, { waitUntil: 'domcontentloaded', timeout: 3000 });
    await page.waitForSelector('#plan-already-full-error-page', { visible: false, timeout: 500 });
  
    return 'Grupo lleno';
  } catch (error: any) {
    try {
      await page.waitForSelector('#invitation-expired-error-page', { visible: false, timeout: 500 });
      return 'Invitación expirada';
    } catch (expirationError: any) {
      try {
        await page.waitForSelector('#general-error-page', { visible: false, timeout: 500 });
        return 'Invitación no válida';
      } catch (invalidError: any) {
        return 'Grupo con espacio';
      } finally {
        if (page) {
          await page.close();
          await browser.close();
        };
      };
    };
  };
};

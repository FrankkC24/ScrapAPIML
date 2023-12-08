import * as fs from 'fs';
import * as puppeteer from 'puppeteer';
import { Account } from '../types/accounts';

export const loginToSpotify = async (page: puppeteer.Page): Promise<void> => {

  const accounts: Account[] = JSON.parse(fs.readFileSync('./dist/accounts/accounts.json', 'utf-8'));

  for (const account of accounts) {
    try {
      await page.goto('https://accounts.spotify.com/login', { waitUntil: 'domcontentloaded', timeout: 3000 });

      await Promise.all([
        page.waitForSelector('#login-username', { visible: false, timeout: 500 }),
      ]);

      await page.type('#login-username', account.username);
      await page.type('#login-password', account.password);

      await Promise.all([
        page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: 3000 }),
        page.click('.ButtonFocus-sc-2hq6ey-0.csWrjt'),
      ]);

      return;
    } catch (error: any) {
      console.error(`Error en el inicio de sesión para la cuenta ${account.username}: ${error.message}`);
    }
  }

  throw new Error('Ninguna cuenta pudo iniciar sesión exitosamente');
};

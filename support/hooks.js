import { Before, After, AfterStep, setWorldConstructor } from '@cucumber/cucumber';
import { chromium } from 'playwright';
import { CustomWorld } from './world.js';
import { LoginPage } from '../pages/LoginPage.js';
import { SecureAreaPage } from '../pages/SecureAreaPage.js';
import 'dotenv/config';

setWorldConstructor(CustomWorld);

Before(async function () {
    // 1. Launch Chromium
    this.browser = await chromium.launch({ headless: false });

    // 2. Create a browser context
    this.context = await this.browser.newContext();

    // 3. Create a page
    this.page = await this.context.newPage();

    // 4. Initialise LoginPage and SecureAreaPage
    this.loginPage = new LoginPage(this.page);
    this.secureAreaPage = new SecureAreaPage(this.page);
});

AfterStep(async function (scenario) {
    if (this.page) {
        const screenshot = await this.page.screenshot({
            fullPage: true
        });

        await this.attach(screenshot, 'image/png');
    }
});

After(async function () {
    if (this.page) {
        const screenshot = await this.page.screenshot({
            fullPage: true
        });

        await this.attach(screenshot, 'image/png');
    }
    if (this.context) {
        await this.context.close();
    }

    if (this.browser) {
        await this.browser.close();
    }
});


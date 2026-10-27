import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';

Given('the user is on Login Page', async function () {
    await this.loginPage.navigate();
});

When('the user logs in using {string} and {string}', async function (username, password) {
 await this.loginPage.login(username, password);
});

Then('the user should be navigated to Secure Area Page', async function () {
    await this.secureAreaPage.verifySecureAreaPageLoad();
});

Then('the user should see the error message {string}', async function (errorMessage) {
    await this.loginPage.verifyInvalidLogin(errorMessage);
});
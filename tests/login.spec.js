
import { expect} from '@playwright/test';
import { test } from '../fixtures.js';

import {LoginPage} from '../pages/LoginPage.js'
import {SecureAreaPage} from '../pages/SecureAreaPage.js'


test('Verify Page Load', async ({page}) => {

    const pageHeading = page.getByRole('heading', {name: 'Login Page'});

    await page.goto('/login');
    const title = await page.title();
    expect(title).toBe('The Internet');
    await expect(pageHeading).toHaveText('Login Page');
});

test('Verify Login is successful', async ({page}) => {

    //const username = page.locator('#username');
    const username = page.getByLabel('Username');
    //const password = page.locator('#password');
    const password = page.getByLabel('Password');
    const loginButton = page.getByRole('button', {name: 'Login'});
    const heading1 = page.getByRole('heading', {name: 'Login Page'});
    const heading2 = page.getByRole('heading', {name: 'Secure Area', exact:true});
    const logoutButton = page.locator('//a/i[contains(text(),"Logout")]');
    //const logoutButton = page.getByRole('link', { name: 'Logout' });

    await page.goto('/login');
    await expect(heading1).toHaveText('Login Page');
    await expect(username).toBeVisible();
    await expect(password).toBeVisible();
    await expect(loginButton).toBeEnabled();
    await username.fill('tomsmith');
    await password.fill('SuperSecretPassword!');
    await loginButton.click();

    await expect(heading2).toHaveText('Secure Area');
    await expect(logoutButton).toBeVisible();



});

test('Verify LoginPage through POM', async ({secureareapage, loginpage}) =>{

    await loginpage.navigate();
    await loginpage.login('tomsmith','SuperSecretPassword!');

    await secureareapage.verifySecureAreaPageLoad();
    await secureareapage.logout();
    await expect(loginpage.heading).toHaveText('Login Page');

});
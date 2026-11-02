import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import {APIAuth} from '../utils/apiAuth.js'

Given('the API user is authenticated', async function () {
    this.apiAuth = new APIAuth();
    this.accessToken = await this.apiAuth.getAccessToken(this.apiRequest);
});

When('the user requests their authenticated profile', async function () {
    this.apiResponse = await this.apiRequest.get('https://dummyjson.com/auth/me', {
        headers: {
            Authorization: `Bearer ${this.accessToken}`
        }
    });
    
    this.apiResponseBody = await this.apiResponse.json();
    
});

Then('the API response status should be 200', async function () {
    expect(this.apiResponse.status()).toBe(200);
});

Then('the authenticated username should be {string}', async function (username) {
    expect(this.apiResponseBody.username).toBe(username);
});

Then('the authenticated email should be {string}', async function (email) {
    expect(this.apiResponseBody.email).toBe(email);
});

Then('the authenticated first name should be {string}', async function (firstName) {
    expect(this.apiResponseBody.firstName).toBe(firstName);
});

Then('the authenticated user ID should be {int}', async function (id) {
    expect(this.apiResponseBody.id).toBe(id);
});

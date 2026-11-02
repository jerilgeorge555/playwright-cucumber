import { test, expect } from '@playwright/test';
import {APIAuth} from '../../utils/apiAuth.js'
import {test as apitest} from '../../fixtures/api.fixtures.js'

test('GET post by ID', async ({request}) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/posts/1');
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.userId).toBe(1);
    expect(body.id).toBe(1);
    expect(body.title).toBeTruthy();
    expect(body.body).toContain('quia');
    expect(response.headers()['content-type']).toContain('application/json');
});

test('POST create user', async ({request}) => {
    const response = await request.post('https://jsonplaceholder.typicode.com/posts',{
        data: {
                userId: 1,
                title: 'Learning Playwright API Testing',
                body: 'This is my first POST API test.'
        }
    });

    expect(response.status()).toBe(201);
    const responseBody = await response.json();
    expect(responseBody.userId).toBe(1);
    expect(responseBody.title).toBe('Learning Playwright API Testing');
    expect(responseBody.body).toBe('This is my first POST API test.');              
    expect(response.headers()['content-type']).toContain('application/json');
});

test('PUT update user', async ({request}) =>{
    const response = await request.put('https://jsonplaceholder.typicode.com/posts/1', {
        data: {
            userId: 1,
            title: 'Updated Playwright API Testing',
            body: 'This post has been updated using PUT.'
        }
    });
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody.userId).toBe(1);
    expect(responseBody.title).toBe('Updated Playwright API Testing');
    expect(responseBody.body).toBe('This post has been updated using PUT.');              
    expect(response.headers()['content-type']).toContain('application/json');
});

test('PATCH update user', async ({request}) =>{
    const response = await request.patch('https://jsonplaceholder.typicode.com/posts/1', {
        data: {
            title: 'Updated Playwright API Testing with Patch',
        }
    });
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody.userId).toBe(1);
    expect(responseBody.title).toBe('Updated Playwright API Testing with Patch');
    expect(responseBody.body).toBeTruthy();              
    expect(response.headers()['content-type']).toContain('application/json');
});

test('DELETE user', async ({request}) =>{
    const response = await request.delete('https://jsonplaceholder.typicode.com/posts/1');
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody).toStrictEqual({});
});


test('GET by query params', async ({request}) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/posts', {
        params: {
            userId: 1
        }
    });
    expect(response.status()).toBe(200);
    const body = await response.json();

    expect(Array.isArray(body)).toBeTruthy();
    expect(body.length).toBeGreaterThan(0);
    expect(body.every(x => x.userId === 1)).toBeTruthy();
    expect(body.every(x => x.id && x.title && x.body)).toBeTruthy();
    expect(response.headers()['content-type']).toContain('application/json');
});

test('GET post by ID with request header', async ({request}) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/posts/1', {
        headers: {
            'Accept': 'application/json'
        }
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.userId).toBe(1);
    expect(body.id).toBe(1);
    expect(body.title).toBeTruthy();
    expect(body.body).toContain('quia');
    expect(response.headers()['content-type']).toContain('application/json');
});

test('Test with Bearer Token Authentication', async ({request}) => {
    const response = await request.post('https://dummyjson.com/auth/login', {
        data: {
            username: 'emilys',
            password: 'emilyspass'
        }
    });
    expect(response.status()).toBe(200);
    const loginResponse = await response.json();
    expect(loginResponse.username).toBe('emilys');
    expect(loginResponse.accessToken).toBeTruthy();
    expect(loginResponse.refreshToken).toBeTruthy();
    const accessToken = loginResponse.accessToken;

    const response2 = await request.get('https://dummyjson.com/auth/me', {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });
    expect(response2.status()).toBe(200);
    const loginResponse2 = await response2.json();
    expect(loginResponse2.username).toBe('emilys');
    expect(loginResponse2.email).toBe('emily.johnson@x.dummyjson.com');
    expect(loginResponse2.firstName).toBe('Emily');

});

test('Test with Reusable Access Token method', async ({request}) => {
    const apiAuth = new APIAuth();
    const accessToken = await apiAuth.getAccessToken(request);

    const response2 = await request.get('https://dummyjson.com/auth/me', {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });
    expect(response2.status()).toBe(200);
    const loginResponse2 = await response2.json();
    expect(loginResponse2.username).toBe('emilys');
    expect(loginResponse2.email).toBe('emily.johnson@x.dummyjson.com');
    expect(loginResponse2.firstName).toBe('Emily');

});

apitest.only('Test with fixture to return accessToken', async ({accessToken, request}) =>{
    const response = await request.get('https://dummyjson.com/auth/me', {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });
    expect(response.status()).toBe(200);
    const loginResponse2 = await response.json();
    expect(loginResponse2.username).toBe('emilys');
    expect(loginResponse2.email).toBe('emily.johnson@x.dummyjson.com');
    expect(loginResponse2.firstName).toBe('Emily');
});
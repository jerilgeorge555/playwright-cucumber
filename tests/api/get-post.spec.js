import { test, expect } from '@playwright/test';

test.only('GET post by ID', async ({request}) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/posts/1');
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.userId).toBe(1);
    expect(body.id).toBe(1);
    expect(body.title).toBeTruthy();
    expect(body.body).toContain('quia');
    expect(response.headers()['content-type']).toContain('application/json');
});
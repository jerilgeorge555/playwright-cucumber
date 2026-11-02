import { expect } from '@playwright/test';

export class APIAuth{
    async getAccessToken(request){
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
                return accessToken;
            }
}
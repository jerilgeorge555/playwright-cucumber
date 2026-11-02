import {test as base} from '@playwright/test'
import { APIAuth } from '../utils/apiAuth.js'

export const test = base.extend({
    accessToken: async ({ request }, use) => {
        // Create APIAuth instance
        const apiAuth = new APIAuth();
        // Get the access token
        const token = await apiAuth.getAccessToken(request);
        
        // Make the token available to the test using use()
        await use(token);
    }
});
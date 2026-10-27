import {test as base} from '@playwright/test'
import {LoginPage} from './pages/LoginPage.js'
import {SecureAreaPage} from './pages/SecureAreaPage.js'

export const test = base.extend({
    loginpage: async({page}, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },

    secureareapage: async({page}, use) => {
        const secureAreaPage = new SecureAreaPage(page);
        await use(secureAreaPage);
    }
});
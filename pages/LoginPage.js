import {expect} from '@playwright/test';



export class LoginPage{

    constructor(page){
        this.page = page;

        this.heading = page.getByRole('heading', {name: 'Login Page'});
        this.username = page.getByLabel('Username');
        this.password = page.getByLabel('Password');
        this.loginButton = page.getByRole('button', {name: 'Login'});
        this.invalidLoginMessage = page.locator('#flash');
    }

    navigate = async () => {
        
        await this.page.goto(`${process.env.BASE_URL}/login`);
        await expect(this.heading).toHaveText('Login Page');
    }

    login = async (user, pass) => {
        await expect(this.username).toBeVisible();
        await this.username.fill(user);

        await expect(this.password).toBeVisible();
        await this.password.fill(pass);

        await expect(this.loginButton).toBeVisible();
        await this.loginButton.click();

    }

    verifyInvalidLogin = async (errorMessage) => {
        await expect(this.invalidLoginMessage).toContainText(errorMessage);
    }

}




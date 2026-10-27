import {expect} from '@playwright/test'

export class SecureAreaPage{
constructor(page){
    this.page = page;
    this.heading2 = page.getByRole('heading', {name: 'Secure Area', exact:true});
    this.logoutButton = page.locator('//a/i[contains(text(),"Logout")]');
}

verifySecureAreaPageLoad = async () => {
    await expect(this.heading2).toHaveText('Secure Area');
    await expect(this.logoutButton).toBeVisible();
}

logout = async () => {
    await this.logoutButton.click();
}

}
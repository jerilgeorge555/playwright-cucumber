import { World } from '@cucumber/cucumber';

export class CustomWorld extends World {
    constructor(options) {
        super(options);
        this.browser = undefined;
        this.context = undefined;
        this.page = undefined;
        this.loginPage = undefined;
        this.secureAreaPage = undefined;
        // TODO: Initialise browser-related properties
        // TODO: Initialise page object properties
    }
}
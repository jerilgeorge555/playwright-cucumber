
import 'dotenv/config';

const environments = {
    dev: 'https://the-internet.herokuapp.com',
    qa: 'https://the-internet.herokuapp.com',
    staging: 'https://the-internet.herokuapp.com'
};

const testEnv = process.env.TEST_ENV || 'dev';
const baseUrl = environments[testEnv];

if (!baseUrl) {
    throw new Error(
        `Invalid TEST_ENV: ${testEnv}. Choose dev, qa, or staging.`
    );
}

export const config = {
    testEnv,
    baseUrl
};

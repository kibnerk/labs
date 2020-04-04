
const { Builder } = require('selenium-webdriver');
require('dotenv').config();
const { browserName } = require('./scripts/constants');
const driver = new Builder().forBrowser(browserName).build();

const Search = require('./components/Search');
const Auth = require('./components/Auth');

const RunAll = async (driver) => {
    await Auth(driver);
    await Search(driver);
    await driver.quit();
};

console.log(process.env.TYPE);

switch (process.env.TYPE) {
    case 'auth':
        Auth(driver);
        break;
    case 'search':
        Search(driver);
        break;
    default:
        RunAll(driver);
        break;
}

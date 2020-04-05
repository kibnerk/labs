
require('dotenv').config();
const { Builder } = require('selenium-webdriver');
const { browserName } = require('./scripts/constants');
const driver = new Builder().forBrowser(browserName).build();

const Search = require('./components/Search');
const Auth = require('./components/Auth');
const Rating = require('./components/Rating');
const Sort = require('./components/Sort');

const RunAll = async (driver) => {
    await Auth(driver);
    await Search(driver);
    await Rating(driver);
    await Sort(driver);
    await driver.quit();
};

const RunRating = async (driver) => {
    await Auth(driver);
    await Rating(driver);
    await driver.quit();
};

const RunAuth = async (driver) => {
    await Auth(driver);
    await driver.quit();
};

const RunSearch = async (driver) => {
    await Search(driver);
    await driver.quit();
};

const RunSort = async (driver) => {
    await Sort(driver);
    await driver.quit();
};

switch (process.env.TYPE) {
    case 'auth':
        RunAuth(driver);
        break;
    case 'search':
        RunSearch(driver);
        break;
    case 'rating':
        RunRating(driver);
        break;
    case 'sort':
        RunSort(driver);
        break;
    default:
        RunAll(driver);
        break;
}

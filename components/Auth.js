const {
    url,
    maxWaitTime,
    errors,
    click,
    consoleError,
    consoleSuccess,
    startTesting,
    finishTesting
} = require('../scripts/constants');
const { By, Key, until } = require('selenium-webdriver');

let componentName;

const Search = async (driver) => {
    componentName = 'авторизации';
    startTesting(componentName);

    const authData = {
        login: process.env.LOGIN,
        password: process.env.PASSWORD
    };

    const authLogin = By.css('.main_menu__auth__login');
    const authEmail = By.css('[data-auth-target="signin-email"]');
    const authLogged = By.css('.main_menu__auth__logged_in');
    // const inputEmail = By.css('.auth-form__content > div.ui_form__fieldset:nth-of-type(2) > input');
    // const inputPassword = By.css('.auth-form__content > div.ui_form__fieldset:nth-of-type(3) > input');
    const inputEmail = By.name('login');
    const inputPassword = By.name('password');
    const openProfile = By.css('.possession_triangle');
    const profileName = By.css('.item__text');

    await driver.get(url);

    try {
        console.log('Проверяем авторизацию');
        const authItem = driver.wait(until.elementLocated(authLogin), maxWaitTime);
        await click(driver, authItem);

        const authEmailItem = await driver.wait(until.elementLocated(authEmail), maxWaitTime);
        await driver.sleep(500);
        await click(driver, authEmailItem);

        await driver.wait(until.elementLocated(inputEmail), maxWaitTime).sendKeys(authData.login);
        await driver.wait(until.elementLocated(inputPassword), maxWaitTime).sendKeys(authData.password, Key.ENTER);
        await driver.wait(until.elementLocated(authLogged), maxWaitTime);

        const authProfileTrianle = await driver.wait(until.elementLocated(openProfile), maxWaitTime);
        await click(driver, authProfileTrianle);

        await driver.wait(until.elementLocated(profileName), maxWaitTime).getText().then((name) => {
            consoleSuccess(`Авторизация прошла успешно. Привет, ${name}!`);
        });
    } catch (e) {
        if (e.name === 'TimeoutError') {
            await consoleError(errors.notFound);
            await console.log(e);
        } else {
            await consoleError(errors.unlooked);
            await console.log(e);
        }
    } finally {
        finishTesting(componentName);
    }
};

module.exports = Search;

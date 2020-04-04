const { Builder, By, Key, until } = require('selenium-webdriver');
const driver = new Builder().forBrowser('firefox').build();

const url = 'https://tjournal.ru/';
const time = 2000;

const callSearch = async () => {
    try {
        console.log('Start');
        const valueSearch = 'коронавирус';
        const valueSearchEmpty = 'qwertykoronavirus';
        const searchInput = By.className('search__input');

        await driver.get(url);
        await driver.sleep(time);

        //Проверяем результаты с заведомо некорректным запросом
        await driver.findElement(searchInput).sendKeys(valueSearchEmpty, Key.RETURN);
        await driver.sleep(time);
        await driver.findElement(By.css('.search-dropdown-item.search-dropdown-item--submit')).click();
        await driver.sleep(time);

        //Проверяем результаты с заведомо корректным запросом
        await driver.findElement(searchInput).sendKeys(Key.CONTROL + 'a');
        await driver.findElement(searchInput).sendKeys(Key.DELETE);
        await driver.sleep(time);
        await driver.findElement(searchInput).sendKeys(valueSearch, Key.RETURN);
        await driver.sleep(time);
        await driver.findElement(By.css('.search-dropdown-item.search-dropdown-item--submit')).click();

        await driver.sleep(time);

        await driver.findElement(By.css('.search_results__content')).then(els => {
            console.log(els);
        });

        console.log(count);
        console.log('END');
    } catch (e) {
        console.log(e);
    } finally {
        // await driver.quit();
    }
};

const callRegistration = async valueSearch => {
    try {
        await driver.get(url);
        await driver.findElement(By.className('main_menu__auth__login')).click();
        await driver.findElement(By.className('social-auth--with-email:nth-child(3)')).click();

        // await driver.findElement(By.CssSelector('[data-auth-target="signin-email"]')).click();
        // await driver.wait(until.titleIs('webdriver - Google Search'), 1000);
    } finally {
        // await driver.quit();
    }
};

callSearch();

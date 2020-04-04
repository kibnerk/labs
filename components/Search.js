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
    componentName = 'поиска';
    startTesting(componentName);
    let elementSubmit;

    const valueSearch = 'коронавирус';
    const valueSearchEmpty = 'qwertykoronavirus';

    const searchInput = By.css('.search__input');
    const classSubmit = By.css('.search-dropdown-item.search-dropdown-item--submit');

    await driver.get(url);

    try {
        try {
            console.log(`Проверяем результаты с заведомо некорректным запросом "${valueSearchEmpty}"`);
            await driver.wait(until.elementLocated(searchInput), maxWaitTime).sendKeys(valueSearchEmpty, Key.RETURN);
            elementSubmit = await driver.wait(until.elementLocated(classSubmit), maxWaitTime);
            await click(driver, elementSubmit);
            await consoleSuccess(`По поисковому запросу "${valueSearchEmpty}" успешно не найдены результаты`);
        } catch (e) {
            if (e.name === 'TimeoutError') {
                await consoleError(errors.notFound);
                await console.log(e);
            } else {
                await consoleError(errors.unlooked);
                await console.log(e);
            }
        }
        try {
            console.log(`Проверяем результаты с заведомо корректным запросом "${valueSearch}"`);

            await driver.findElement(searchInput).sendKeys(Key.CONTROL + 'a');
            await driver.findElement(searchInput).sendKeys(Key.DELETE);
            await driver.findElement(searchInput).sendKeys(valueSearch, Key.RETURN);

            elementSubmit = await driver.wait(until.elementLocated(classSubmit), maxWaitTime);
            await driver.executeScript('arguments[0].click();', elementSubmit);

            await driver.wait(
                until.elementLocated(By.css('.search_results__content')),
                maxWaitTime
            );
            await consoleSuccess(`По поисковому запросу "${valueSearch}" успешно найдены результаты`);
        } catch (e) {
            if (e.name === 'TimeoutError') {
                await consoleError(errors.notFound);
            } else {
                await consoleError(errors.unlooked);
            }
        }
    } catch (e) {
        if (e.name === 'TimeoutError') {
            await consoleError(errors.notFound);
        } else {
            await consoleError(errors.unlooked);
        }
    } finally {
        finishTesting(componentName);
    }
};

module.exports = Search;

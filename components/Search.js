const {
    url,
    maxWaitTime,
    errors,
    click,
    consoleError,
    consoleSuccess,
    startTesting,
    finishTesting,
    valueSearch,
    valueSearchEmpty
} = require('../scripts/constants');
const { By, Key, until } = require('selenium-webdriver');

let componentName;

const Search = async (driver) => {
    componentName = 'поиска';
    startTesting(componentName);
    let elementSubmit;

    const searchInput = By.css('.search__input');
    const classSubmit = By.css('.search-dropdown-item.search-dropdown-item--submit');
    try {
        try {
            await driver.get(url);

            console.log(`Проверяем результаты с заведомо некорректным запросом "${valueSearchEmpty}"`);
            await driver.wait(until.elementLocated(searchInput), maxWaitTime).sendKeys(valueSearchEmpty, Key.RETURN);
            elementSubmit = await driver.wait(until.elementLocated(classSubmit), maxWaitTime);
            await click(driver, elementSubmit);
            await driver.wait(
                until.elementLocated(By.css('.search_results__dummy')),
                maxWaitTime
            );
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
            await driver.get(url);

            console.log(`Проверяем результаты с заведомо корректным запросом "${valueSearch}"`);

            await driver.findElement(searchInput).sendKeys(Key.CONTROL + 'a');
            await driver.findElement(searchInput).sendKeys(Key.DELETE);
            await driver.findElement(searchInput).sendKeys(valueSearch, Key.RETURN);

            elementSubmit = await driver.wait(until.elementLocated(By.css('.search-dropdown-item.search-dropdown-item--submit')), maxWaitTime);
            await click(driver, elementSubmit);

            await driver.wait(
                until.elementLocated(By.css('.search_results__content')),
                maxWaitTime
            );
            await consoleSuccess(`По поисковому запросу "${valueSearch}" успешно найдены результаты`);
        } catch (e) {
            if (e.name === 'TimeoutError') {
                await consoleError(errors.notFound);
                await console.log(e);
            } else {
                await consoleError(errors.unlooked);
                await console.log(e);
            }
        }
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

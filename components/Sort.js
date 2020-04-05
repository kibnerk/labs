const {
    url,
    errors,
    consoleError,
    consoleSuccess,
    startTesting,
    finishTesting,
    categoryPage,
    checkSort
} = require('../scripts/constants');
const { By } = require('selenium-webdriver');

let componentName;

const Sort = async (driver) => {
    componentName = 'сортировки';
    startTesting(componentName);

    const feedItemTime = By.css('.content-header__item > .t-link > .time');

    await driver.get(`${url}/${categoryPage}`);

    try {
        const pendingElements = driver.findElements(feedItemTime);
        let els;
        await pendingElements.then(async (elements) => {
            const pendingHtml = await elements.map(function (elem) {
                return driver.executeScript("return arguments[0].getAttribute('data-date');", elem);
            });

            els = await Promise.all(pendingHtml).then((allHtml) => {
                return [...allHtml].reverse();
            });

            if (checkSort(els)) {
                await consoleSuccess(`На странице ${url}/${categoryPage} записи отсортированы верно.`);
            } else {
                throw await new SyntaxError('UnCorrectSort');
            }
        });
    } catch (e) {
        if (e.name === 'TimeoutError') {
            await consoleError(errors.notFound);
            await console.log(e);
        } else if (e.name === 'SyntaxError') {
            await consoleError(`Сортировка на странице ${url}/${categoryPage} проходит некорректно`);
            await console.log(e);
        } else {
            await console.log(e);
        }
    } finally {
        finishTesting(componentName);
    }
};

module.exports = Sort;

const {
    url,
    maxWaitTime,
    errors,
    click,
    consoleError,
    consoleSuccess,
    startTesting,
    finishTesting,
    categoryPage
} = require('../scripts/constants');
const { By, Key, until } = require('selenium-webdriver');

let componentName;

const Rating = async (driver) => {
    componentName = 'рейтинга';
    startTesting(componentName);

    const feedItemCounter = By.css('.feed__chunk:first-child > .feed__item:last-child  .vote .vote__value__v--real');
    const feedItemPlus = By.css('.feed__chunk:first-child > .feed__item:last-child  .vote  .vote__button--plus');

    await driver.get(`${url}/${categoryPage}`);

    try {
        const co = { prev: 0, after: 0 };

        await driver.wait(until.elementLocated(feedItemCounter), maxWaitTime).getText().then((count) => {
            co.prev = count;
            consoleSuccess(`Голосов сейчас: ${co.prev}`);
        });

        const itemPlus = await driver.wait(until.elementLocated(feedItemPlus), maxWaitTime);
        await click(driver, itemPlus);

        await driver.wait(until.elementLocated(feedItemCounter), maxWaitTime).getText().then((count) => {
            co.after = count;
            consoleSuccess(`Голосов сейчас: ${co.after}!`);
        });

        const counter = async () => {
            const text = co.after > co.prev ? 'Рейтинг прибавлен' : 'Рейтинг уже был изменен';
            await console.log(text);
        };
        await counter();
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

module.exports = Rating;

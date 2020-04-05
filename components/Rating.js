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
const { By, until } = require('selenium-webdriver');

let componentName;

const Rating = async (driver) => {
    componentName = 'рейтинга';
    startTesting(componentName);
    const currentItem = '.feed__chunk:first-child > .feed__item:last-child';
    const feedItemCounter = By.css(`${currentItem}  .vote .vote__value__v--real`);
    const feedItemPlus = By.css(`${currentItem} .vote  .vote__button--plus`);
    const feedItemLink = By.css(`${currentItem} .content-feed__link`);

    await driver.get(`${url}/${categoryPage}`);

    try {
        const co = { prev: 0, after: 0 };

        await driver.wait(until.elementLocated(feedItemCounter), maxWaitTime).getText().then((count) => {
            co.prev = count;
        });

        const itemPlus = await driver.wait(until.elementLocated(feedItemPlus), maxWaitTime);
        await click(driver, itemPlus);
        await driver.sleep(500);

        await driver.wait(until.elementLocated(feedItemCounter), maxWaitTime).getText().then((count) => {
            co.after = count;
        });

        const link = await driver.wait(until.elementLocated(feedItemLink), maxWaitTime).getAttribute('href').then(href => {
            return href;
        });

        const counter = async () => {
            const text = co.after > co.prev ? `Рейтинг записи ${link} изменен с ${co.prev} на ${co.after}` : co.prev - co.after === 1 ? `Рейтинг записи ${link} изменен с ${co.prev} на ${co.after}. Вы убрали оценку записи.` : `Кажется, кто-то успел поменять рейтинг записи ${link} вместе с вами, и он уменьшился с ${co.prev} на ${co.after}`;
            await consoleSuccess(text);
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

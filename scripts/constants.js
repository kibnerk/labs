const colors = require('colors');

const browserName = 'firefox'; // браузер для тестов
const url = 'https://tjournal.ru'; // сайт для тестов
const categoryPage = 'new';
const maxWaitTime = 4000; // максимальное время ожидания

const errors = {
    notFound: 'Ошибка: некоторые элементы не были найдены на странице',
    unlooked: 'Произошла непредвиденная ошибка'
};

const click = (driver, element) => {
    driver.executeScript('arguments[0].click();', element);
};

const consoleSuccess = (text) => {
    console.log(`✅ ${text}`.green);
};

const consoleError = (text) => {
    console.log(`❌ ${text}`.red);
};

const startTesting = (component) => {
    console.log(`🟦 Тестирование ${component} началось `.blue);
};

const finishTesting = (component) => {
    console.log(`🟦 Тестирование ${component} закончилось `.blue);
};

module.exports = { url, maxWaitTime, errors, click, consoleError, consoleSuccess, startTesting, finishTesting, browserName, categoryPage };

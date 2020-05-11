const {Builder, By, Key, until, map} = require('selenium-webdriver');

(async function filter_corruption() {
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        await driver.get('https://www.warcraftlogs.com/zone/rankings/24#class=Mage&spec=Fire&boss=2344');

        // wait until loading finishes
        const loading = await driver.findElement(By.id("graph-loading"));
        await driver.wait(until.elementIsNotVisible(loading), 1000);

        // for some weird reason I can't get the text of corruption-power-name
        // so i'll be using the icons in order to filter
        let corrupted_icons = await driver.findElements(By.className("corruption-power-icon"))
        let text = await corrupciones[1].getAttribute("src");
        console.log(text);
    } 
    finally {
        await driver.quit();
    }
})();

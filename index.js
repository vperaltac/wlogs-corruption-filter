const {Builder, By, Key, until, map} = require('selenium-webdriver');

//TODO: show only players with X corruption
function filter_corruption(name, corruptions){
    console.log(name + " has " + corruptions);
}

(async function get_info() {
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        //TODO: get multiple pages at once
        await driver.get('https://www.warcraftlogs.com/zone/rankings/24#class=Mage&spec=Fire&boss=2344');

        // wait until loading finishes
        const loading = await driver.findElement(By.id("graph-loading"));
        await driver.wait(until.elementIsNotVisible(loading), 1000);

        let players = await driver.findElements(By.className("odd"));
        for(let player of players){
            let name = await player.findElement(By.className("main-table-link main-table-player Mage")).getText();

            // for some weird reason I can't get the text of corruption-power-name
            // so i'll be using the icons in order to filter
            let corrupted_icons = await player.findElements(By.className("corruption-power-icon"));
            let corruptions = new Array();

            //TODO: cover all posible corruptions
            for(let cr of corrupted_icons){
                let img = await cr.getAttribute("src");

                if(img.includes("findfish"))
                    corruptions.push("Strikethrough")
                else if(img.includes("sinistercalling"))
                    corruptions.push("Masterful")
                else if(img.includes("focusedmind"))
                    corruptions.push("Honed Mind")
            }

            filter_corruption(name,corruptions);
        }
    } 
    finally {
        await driver.quit();
    }
})();

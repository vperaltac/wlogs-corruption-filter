const {Builder, By, Key, until, map} = require('selenium-webdriver');

const PAGES = 5;

function show_log(name, corruptions,link){
    console.log(name + " : " + link);
    for(let c of corruptions){
        console.log("----- " + c + " -----");
    }
}

(async function get_info() {
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        for(let i=1;i<=PAGES;i++){
            await driver.get('https://www.warcraftlogs.com/zone/rankings/24#class=Mage&spec=Fire&boss=2344&page=' + i);

            // wait until loading finishes
            const loading = await driver.findElement(By.id("graph-loading"));
            await driver.wait(until.elementIsNotVisible(loading), 1000);

            let players = await driver.findElements(By.className("odd"));
            for(let player of players){
                let name = await player.findElement(By.className("main-table-link main-table-player Mage")).getText();
                let link = await (await player.findElement(By.className("main-table-link main-table-player Mage"))).getAttribute("href");

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
                    else if(img.includes("corruptedblood"))
                        corruptions.push("Gushing Wound")
                    else if(img.includes("starfall"))
                        corruptions.push("Infinite Stars")
                    else if(img.includes("bloodfrenzy"))
                        corruptions.push("Racing Pulse")
                    else if(img.includes("soulswap"))
                        corruptions.push("Glimpse of Clarity")
                    else if(img.includes("shadesofdarkness"))
                        corruptions.push("Void Ritual")
                    else if(img.includes("netherwindpresence"))
                        corruptions.push("Expedient")
                    else if(img.includes("yoggsaron"))
                        corruptions.push("Twisted Appendage")
                }

                if(corruptions.includes("Strikethrough") && !corruptions.includes("Masterful"))
                    show_log(name,corruptions,link);
            }
        }
    } 
    finally {
        await driver.quit();
    }
})();

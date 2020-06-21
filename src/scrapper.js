const {Builder, By, Key, until, map} = require('selenium-webdriver');
const PAGES = 5;

var corruptionNames = new Map();
corruptionNames.set('starfall','Infinite Stars');
corruptionNames.set('wand_1h_nzothraid','Ineffable Truth');
corruptionNames.set('yoggsaron','Twisted Appendage');
corruptionNames.set('shadesofdarkness','Void Ritual');
corruptionNames.set('corruptedblood','Gushing Wound');
corruptionNames.set('spell_priest_voidsear','Twilight Devastation');
corruptionNames.set('ability_priest_voidentropy','Echoing Void');
corruptionNames.set('voidtendrils','Lash of The Void');
corruptionNames.set('bloodfrenzy','Racing Pulse');
corruptionNames.set('focusedmind','Honed Mind');
corruptionNames.set('ability_hunter_raptorstrike','Deadly Momentum');
corruptionNames.set('ability_hunter_onewithnature','Surging Vitality');
corruptionNames.set('findfish','Strikethrough');
corruptionNames.set('sinistercalling','Masterful');
corruptionNames.set('soulswap','Glimpse of Clarity');
corruptionNames.set('netherwindpresence','Expedient');
corruptionNames.set('spell_arcane_arcanetactics','Versatile');
corruptionNames.set('ability_priest_shadowyapparition','Severe');
corruptionNames.set('spell_warlock_demonsoul','Avoidant');


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
            await driver.get('https://www.warcraftlogs.com/zone/rankings/24#region=-1&class=Mage&spec=Fire&boss=2344&page=' + i);

            // wait until loading finishes
            const loading = await driver.findElement(By.id("graph-loading"));
            await driver.wait(until.elementIsNotVisible(loading), 3000);

            let players_odd  = await driver.findElements(By.className("odd"));
            let players_even = await driver.findElements(By.className("even"));
            let players = players_even.concat(players_odd);
            for(let player of players){
                let row = await player.findElement(By.className("main-table-link main-table-player Mage"));
                let name = await row.getText();
                let link = await row.getAttribute("href");

                // for some weird reason I can't get the text of corruption-power-name
                // so i'll be using the icons in order to filter
                let corrupted_icons = await player.findElements(By.className("corruption-power-icon"));
                let corruptions = new Array();

                for(let cr of corrupted_icons){
                    let img = await cr.getAttribute("src");

                    corruptionNames.forEach(function(value, key) {
                        if(img.includes(key))
                            corruptions.push(value);
                    })
                }

                if(corruptions.includes("Masterful"))
                    show_log(name,corruptions,link);
            }
        }
    } 
    finally {
        await driver.quit();
    }
})();

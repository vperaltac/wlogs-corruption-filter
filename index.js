const {Builder, By, Key, until, map} = require('selenium-webdriver');

const PAGES = 5;

function show_log(name, corruptions,link){
    console.log(name + " : " + link);
    for(let c of corruptions){
        console.log("----- " + c + " -----");
    }
}

(async function get_info(filter) {
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

                    // Unique Effect Affixes
                    if(img.includes("starfall"))
                        corruptions.push("Infinite Stars")
                    else if(img.includes("wand_1h_nzothraid"))
                        corruptions.push("Ineffable Truth")
                    else if(img.includes("yoggsaron"))
                        corruptions.push("Twisted Appendage")
                    else if(img.includes("shadesofdarkness"))
                        corruptions.push("Void Ritual")
                    else if(img.includes("corruptedblood"))
                        corruptions.push("Gushing Wound")
                    else if(img.includes("spell_priest_voidsear"))
                        corruptions.push("Twilight Devastation")
                    else if(img.includes("ability_priest_voidentropy"))
                        corruptions.push("Echoing Void")
                    else if(img.includes("voidtendrils"))
                        corruptions.push("Lash of The Void")    

                    // Procced Stat Affixes
                    else if(img.includes("bloodfrenzy"))
                        corruptions.push("Racing Pulse")                 // Haste Proc
                    else if(img.includes("focusedmind")) 
                        corruptions.push("Honed Mind")                   // Mastery Proc
                    else if(img.includes("ability_hunter_raptorstrike")) 
                        corruptions.push("Deadly Momentum")              // Crit proc
                    else if(img.includes("ability_hunter_raptorstrike"))
                        corruptions.push("Surging Vitality")             // Versatility proc
                        
                    // Passive Affixes
                    if(img.includes("findfish"))
                        corruptions.push("Strikethrough")
                    else if(img.includes("sinistercalling"))
                        corruptions.push("Masterful")
                    else if(img.includes("soulswap"))
                        corruptions.push("Glimpse of Clarity")
                    else if(img.includes("netherwindpresence"))
                        corruptions.push("Expedient")
                    else if(img.includes("spell_arcane_arcanetactics"))
                        corruptions.push("Versatile")
                    else if(img.includes("ability_priest_shadowyapparition"))
                        corruptions.push("Severe")
                    // Avoidant
                    
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

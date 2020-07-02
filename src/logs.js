const mongodb = require('mongodb');
const Corruption = require('./corruption');

async function getLogs(){
    const logs = await loadLogsCollection();
    return await logs.find({}).sort({"rank":1}).toArray();
}

async function getFilteredLogs(filter){
    const logs = await loadLogsCollection();
    return await logs.find({}).sort({"rank":1}).toArray();
}

async function addLog(rank,player,link,corruptions){
    let corrs = new Array();

    for(let corruption of corruptions){
        corrs.push({
            'name': corruption.getName(),
            'amount': corruption.getAmount(),
            'icon': corruption.getIcon()
        })
    }

    const logs = await loadLogsCollection();
    await logs.insertOne({
        "rank":parseInt(rank,10),
        "player": player,
        "link": link,
        "corruptions": corrs
    });
}

async function deleteLogs(){
    const logs = await loadLogsCollection();
    logs.deleteMany({});
}

async function loadLogsCollection(){
    const client = await mongodb.MongoClient.connect(process.env.MONGODB_CONN,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    return client.db('heroku_270mcphh').collection('logs');
}

module.exports = {
    getLogs,
    addLog,
    deleteLogs
}
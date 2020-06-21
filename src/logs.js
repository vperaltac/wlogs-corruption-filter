const mongodb = require('mongodb');

async function getLogs(){
    const logs = await loadLogsCollection();
    return await logs.find({}).toArray();
}

async function addLog(player,link,corruptions){
    const logs = await loadLogsCollection();
    await logs.insertOne({
        "player": player,
        "link": link,
        "corruptions": corruptions
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
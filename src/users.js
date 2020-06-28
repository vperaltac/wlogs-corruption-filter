const mongodb = require('mongodb');
const bcrypt = require('bcrypt');
const saltRounds = 10;

async function getUsers(){
    const users = await loadUsersCollection();
    return await users.find({name:'Claudia Caballero'}).toArray();
}

async function addUser(email,name,password){
    bcrypt.hash(password, saltRounds, async function(err, hash) {
        const users = await loadUsersCollection();
        await users.insertOne({
            email: email,
            name: name,
            password: hash
        });            
    });
}

async function verifyUser(email,password){
    const users  = await loadUsersCollection();
    const values = await users.find({email:email}).toArray();

    if(values.length == 0)
        return false;

    const verify = await new Promise((resolve, reject) => {
        bcrypt.compare(password, values[0].password, function(err, result) {
            if (err) reject(err)
            resolve(result)
        });
    })
    
    return verify;
}

async function loadUsersCollection(){
    const client = await mongodb.MongoClient.connect(process.env.MONGODB_CONN,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    return client.db('heroku_270mcphh').collection('users');
}

module.exports = {
    getUsers,
    addUser,
    verifyUser
}
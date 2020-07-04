require('dotenv').config();
const express = require('express');
const app     = express();
const pug     = require('pug');
const PORT    = process.env.PORT || 5000;
const users   = require('./src/users');
const logs    = require('./src/logs');

// Body parser
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static('views'));
app.set('view engine', 'pug')

app.get('/', function (req, res) {
    res.render('templates/signin',{});
})

app.get('/test', async(req,res) =>{
    let users = await users.getUsers();
    res.json(JSON.stringify(users));
})

app.get('/logs', async(req,res) =>{
    let data = await logs.getLogs();
    res.render('templates/logs', {data: data})
})

app.post('/login', async (req,res) =>{
    let verifyUser = await users.verifyUser(req.body.email,req.body.passwd);

    if(verifyUser)
        res.render('templates/index', {title: 'Hey', message: 'Hello there!' })
    else
        res.send('Login Failed');
})

app.listen(PORT, () => console.log(`App listening at port: ${PORT}`));

module.exports = app;
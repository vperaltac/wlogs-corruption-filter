const express = require('express');
const app     = express();
const pug     = require('pug');
const PORT    = process.env.PORT || 5000;
const DB      = require('./src/users');

// Body parser
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static('views'));
app.set('view engine', 'pug')

app.get('/', function (req, res) {
    res.render('templates/signin',{});
})

app.get('/test', async(req,res) =>{
    let users = await DB.getUsers();
    res.json(JSON.stringify(users));
})

app.post('/login', async (req,res) =>{
    let verifyUser = await DB.verifyUser(req.body.email,req.body.passwd);

    if(verifyUser)
        res.render('templates/index', {title: 'Hey', message: 'Hello there!' })
    else
        res.send('Login Failed');
})

app.listen(PORT, () => console.log(`App listening at port: ${PORT}`));

module.exports = app;
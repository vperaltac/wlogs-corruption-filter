const express = require('express');
const app     = express();
const pug     = require('pug');
const PORT    = process.env.PORT || 5000;


// Body parser
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static('views'));
app.set('view engine', 'pug')

app.get('/', function (req, res) {
    res.render('html/index', {title: 'Hey', message: 'Hello there!' })
})

app.get('/login', function (req,res){
    res.render('html/signin',{});
})

app.listen(PORT, () => console.log(`App listening at port: ${PORT}`));

module.exports = app;
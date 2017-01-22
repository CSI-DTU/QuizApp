var express  = require('express');
var app      = express();
var body_parser   = require('body-parser');
var port     = process.env.PORT || 4000;
app.use(body_parser.urlencoded({extended:true}));
app.use(body_parser.json());
app.use('/',express.static('public_html'));
var db = require('./database.js');

app.post('/new-user',function (req,res) {
    db.new_user(req.body,function (result) {
    });
    res.end();
});

app.post('/add_questions',function (req,res) {
    db.add_questions(function (result) {
    });
    res.end();
});
app.post('/get_questions',function (req,res) {
    db.get_questions(function (result) {
        res.send(result);
    })
});

app.post('/update-score',function (req,res) {

    db.update_score(req.body,function (result) {
        res.end();
    });
});

app.post('/leaderboard',function (req,res) {
    db.leaderboard(function (result) {
        res.send(result);
    })
});

app.listen(port, function () {
    console.log("Server started on port " + port);
});



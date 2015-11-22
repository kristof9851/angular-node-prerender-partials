var fs = require('fs');
var ejs = require('ejs');
var express = require('express');

// Express
var app = express();
app.set('views', __dirname + '/ejs-templates');
app.set('view engine', 'ejs');

var tab1 = {
    title: "this is tab1's title",
    name: "apple"
};
var tab2 = {
    title: "this is tab2's title",
    name: "orange"
};

// GET "/"
// GET "/tab1"
var tab1Handler = function(req, res, next){

    // JSON
    if (req.headers.accept.indexOf('application/json') !== -1) {
        console.log('/tab1 PARTIAL');
        res.render('partials/tab1', {tab1: tab1});
    } 
    // HTML
    else {
        console.log('/tab1 PRERENDERED');
        res.render('index', {tab1: tab1});
    }
    next();
};
app.get('/', tab1Handler);
app.get('/tab1', tab1Handler);

// GET "/tab2"
app.get('/tab2', function(req, res, next){

    // JSON
    if (req.headers.accept.indexOf('application/json') !== -1) {
        console.log('/tab2 PARTIAL');
        res.render('partials/tab2', {tab2: tab2});
    } 
    // HTML
    else {
        console.log('/tab2 PRERENDERED');
        res.render('index', {tab2: tab2});
    }
    next();
});

// Server
var server = app.listen(80, function () {
    var port = server.address().port;
    console.log('Listening on ' + port);
});

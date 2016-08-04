var express = require('express');
    //body-parser middleware to handle request bodies
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var config = require('./config');

var app = express();

app.use(bodyParser.json());
    //static middleware to serve the static assets
app.use(express.static('public'));

    //coordinates connection to database and the running of the HTTP server
var runServer = function(callback) {
        //connect to database using URL from config.js
    mongoose.connect(config.DATABASE_URL, function(err) {
        if (err && callback) {
            return callback(err);
        }
       app.listen(config.PORT, function() {
            console.log('Listening on localhost:' + config.PORT);
            if (callback) {
                callback();
            }
        });
    });
};
    //makes this file both an executable script and a module
    //if run directly (node server.js) then runServer function is called
    //or if included from somewhere else ( require('./server')) then the function won't be
    //called, allowing the server to be started at a different point
if (require.main === module) {
    runServer(function(err) {
        if (err) {
            console.error(err);
        }
    });
}

exports.app = app;
exports.runServer = runServer;

var Item = require('./models/item');

    //GET
    //this endpoint fetches a list of all items from the database using 'Item.find'
    //and returns them as JSON
app.get('/items', function(req, res) {
    Item.find(function(err, items) {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        res.json(items);
    });
});

    //POST
    //this endpoint creates a new item using 'Item.create' taking the item name from the
    //request body and returning 201 status.
    //If there is an error with the database in either case you get 500
app.post('/items', function(req, res) {
    Item.create({
        name: req.body.name
    }, function(err, item) {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        res.status(201).json(item);
    });
});



    //USE
    //this is a catch all endpoint which returns 404 if neither endpoints were hit by a request
app.use('*', function(req, res) {
    res.status(404).json({
        message: 'Not Stinking Found'
    });
});


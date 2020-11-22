const express = require('express')
const MongoClient = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID;
var bodyParser = require('body-parser')
const fs = require('fs')
const https = require('https')


const app = express()

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.use(express.json())

app.post('/get-profile-data', function(req, res){
    var data = req.body
    console.log(data)
    var objectId = new ObjectID(data.objectId)
    console.log(objectId);
    MongoClient.connect("mongodb://127.0.0.1:27017", function(error, client){
        var db = client.db('ghost_db');
        db.collection('users').findOne({_id: objectId}, function (error, result){
            res.send(JSON.stringify(result));
        });
        
    });  
})

app.get('/get-user', function(req, res){
    MongoClient.connect("mongodb://127.0.0.1:27017", function(error, client){
        var db = client.db('ghost_db');
        db.collection('users').findOne({}, {projection: {_id: 1}}, function (error, result){
            res.send(JSON.stringify(result));
        });
        
    });   
});

app.post('/create-user', function(req, res){
    MongoClient.connect("mongodb://127.0.0.1:27017", function(error, client){
        var db = client.db('ghost_db');
        db.collection('users').insert({username: req.username, password: req.username, age: req.age}, function(error, result){
            res.send(JSON.stringify(result))
        })
    })
})

app.get('/verify-user', function(req, res){
    MongoClient.connect("mongodb://127.0.0.1:27017", function(error, client){
        var db = client.db('ghost_db');
        db.collection('users').findOne({username: req.username, password: req.password}, function(error, result){
            res.send(JSON.stringify(result))
        })
    })
})

app.get('/get-users', function(req, res){
    MongoClient.connect("mongodb://127.0.0.1:27017", function(error, client){
        var db = client.db('ghost_db');
        db.collection('users').find({}, function(error, result){
            res.send(JSON.stringify(result))
        })
    })
})

app.get('/home', (req, res) => {
    res.send('we are on home')
})


// https.createServer({
//     key: fs.readFileSync('./key.pem'),
//     cert: fs.readFileSync('./cert.pem'),
//     passphrase: 'letmein'
// }, app)
app.listen(8080);

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
        var db = client.db('ghost-db')
        db.collection('users').insert({username: req.username, password: req.username, age: req.age}, function(error, result){
            res.send(JSON.stringify(result))
        })
    })
})

app.post('/verify-user', function(req, res){
    var data = req.body
    console.log(data);
    MongoClient.connect("mongodb://127.0.0.1:27017", function(error, client){
        var db = client.db('ghost_db')
        db.collection('users').findOne({username: data.username, password: data.password}, {projection: {_id: 1}}, function(error, result){
            if (result != null) {
                result["signedIn"] = true;
                console.log(result);
            } else {
                console.log('User Not Found')
            }
            res.send(JSON.stringify(result));
        })
    })
})

app.get('/test', function (req, res){
    console.log("HIT")
    var hi = {test : "testmessage"};
    res.send(JSON.stringify(result));
})

app.get('/get-ghost-run', function(req, res){
    var data = req.body
    console.log(data)
    var oid = new ObjectID(data.oid)
    console.log(oid);
    MongoClient.connect("mongodb://127.0.0.1:27017", function(error, client){
        var db = client.db('ghost_db');
        db.collection('users').findOne({_id: oid}, {projection: {latest_run: 1}}, function (error, result){
            res.send(JSON.stringify(result));
        });
        
    });   
});



// app.listen(8080, () => {
//     console.log('app starting')
// })



https
  .createServer(
    {
      key: fs.readFileSync("/etc/letsencrypt/live/ghost.ryandavis.tech/privkey.pem"),
      cert: fs.readFileSync("/etc/letsencrypt/live/ghost.ryandavis.tech/fullchain.pem"),
    },
    app
  )
  .listen(8080, () => {
    console.log('Listening...')
  })

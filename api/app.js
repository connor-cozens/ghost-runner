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

app.post('/get-ghost-run', function(req, res){
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

app.post('/friendly-ghost-list', function(req, res){
    var data = req.body
    var km = data["km"]
    var field_name = "best_" + km + "k";
    var query = {}
    query[field_name] = {$exists:1}
    var proj = {projection: {}};
    proj["projection"][field_name] = 1;
    proj["projection"]["username"] = 1;
    console.log(query);
    console.log(proj);
    MongoClient.connect("mongodb://127.0.0.1:27017", function(error, client){
        var db = client.db('ghost_db');
        db.collection('users').find(query, proj).toArray( function (error, result){
            console.log(result);
            res.send(JSON.stringify(result));
        });
        
    });   
});

app.post('/upload_run', function(req, res){
    var data = req.body;
    console.log(data);
    var oid = new ObjectID(data.oid);
    var set = {}
    set[data.field_name] = data.avg
    set['latest_run'] = data.run
    MongoClient.connect("mongodb://127.0.0.1:27017", function(error, client){
        var db = client.db('ghost_db');
        db.collection('users').update({_id: oid}, {$set: set},function (error, result){
            res.send(JSON.stringify(result));
        });
        
    });   
});


// app.post('/friendly-ghost-list', function(req, res){
//     MongoClient.connect("mongodb://127.0.0.1:27017", function(error, client){
//         var db = client.db('ghost_db');
//         db.collection('users').find({}, {projection: {username: 1}}, function (error, result){
//             res.send(JSON.stringify(result));
//         });
        
//     });   
// });



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

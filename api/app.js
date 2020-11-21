const express = require('express')
const MongoClient = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID;
var bodyParser = require('body-parser')


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


app.listen(8080, () => {
    console.log('app starting')
})
const express = require('express')
const MongoClient = require('mongodb').MongoClient
const app = express()

app.get('/', function(req, res){
    res.send('some text')
})

app.get('/get-user', function(req, res){
    MongoClient.connect("mongodb://127.0.0.1:27017/ghost_db", function(error, db){
        db.collection('users', function (err, collection){
            collection.find().toArray(function (err, items){
                res.send(JSON.stringify(items));
            });
        });
        
    });
    
    
});

app.listen(8080, () => {
    console.log('app starting')
})
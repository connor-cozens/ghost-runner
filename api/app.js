const express = require('express')
const MongoClient = require('mongodb').MongoClient
const app = express()

app.get('/', function(req, res){
    res.send('some text')
})

app.get('/get-user', function(req, res){
    MongoClient.connect("mongodb://127.0.0.1:27017", function(error, client){
        var db = client.db('ghost_db');
        db.collection('users').findOne({}, function (error, result){
            console.log(error);
            console.log(result);
            res.send(JSON.stringify(result));
        });
        
    });
    
    
});

app.listen(8080, () => {
    console.log('app starting')
})
const express = require('express')
const MongoClient = require('mongodb').MongoClient

var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.use(express.json())

const app = express()

app.get('/', function(req, res){
    res.send('some text')
})

app.get('/get-user', function(req, res){
    MongoClient.connect("mongodb://127.0.0.1:27017", function(error, client){
        var db = client.db('ghost_db');
        db.collection('users').findOne({}, function (error, result){
            res.send(JSON.stringify(result));
        });
        
    });   
});

app.post('/put-something', function(req, res){
    const data = req.body;
    console.log(data);
    res.send(JSON.stringify(data));
})

app.listen(8080, () => {
    console.log('app starting')
})
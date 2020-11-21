const express = require('express')

const app = express()

app.get('/', function(req, res){
    res.send('some text')
})

app.listen(8080, () => {
    console.log('app starting')
})
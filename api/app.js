const express = require('express')

const app = express()

app.get('/', function(req, res){
    res.send('some text')
})

app.listen(3000, () => {
    console.log('app starting')
})
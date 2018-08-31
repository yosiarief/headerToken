const express = require('express')
const app = express()
var jwt = require('jsonwebtoken')

app.get('/get', (req, res) => {
    res.json({'Hello' :  'World!'})
})

app.get('/protect', ensureToken, (req, res) => {
    jwt.verify(req.token, 'my_secret_key', function(err, data){
        if (err){
            res.sendStatus(403)
        }else{
            res.json({
                text: "this is protect",
                data: data
            })
        }
    })
    
})

app.post('/api/login', (req, res) => {
    const user = { id: 3}
    const token = jwt.sign({ user}, 'my_secret_key');
    res.json({
        token: token
    })
})

function ensureToken(req, res, next){
    const bearerHeader = req.headers["authorization"]
    if (typeof bearerHeader !== "undefined"){
        const bearer = bearerHeader.split(" ")
        const beareToken = bearer[1]
        req.token = beareToken
        next();
    }else{
        res.sendStatus(403)
    }
}

app.listen(3000, () => console.log('Example app listening on port 3000!'))
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const {config} = require("./config");

// Config Express Server
const app = express();
app.use(cors());


// Body Parser
app.use(bodyParser.json());

app.get("/api/auth/verify", function (req, res, next) {
    const {access_token} = req.query;
    try {
        const decoded = jwt.verify(access_token, config.authJwtSecret);
        res.json({message: "The access token in valid", username: decoded.sub})
    } catch (e) {
        next(e)
    }
});

app.post("/api/auth/token", function (req, res) {
    const {email, username, name} = req.body;
    const token = jwt.sign({sub: username, email, name}, config.authJwtSecret);
    res.json({access_token: token})
});

const server = app.listen(5000, function () {
    console.log(`Listening http://localhost:${server.address().port}`)
});
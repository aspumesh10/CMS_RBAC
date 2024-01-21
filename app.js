'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const router = require('./router.js')

//setup redisClient
global.redisConnection = require("./redisConnector.js");

//setup sqllite
global.sqliteDb = require("./sqliteConnector.js");


console.log(`Running worker server with port 3000`)
const app = express();
// taking up only raw data as of now
// app.use(bodyParser.urlencoded({
//     extended: true, limit: '60mb'
// }));

app.use(bodyParser.json());
app.get("/", (req, res)=>{
    console.log("Hitting get request on root")
    return res.status(200).json({message: "All ok", status : 200})
});

// start the server
app.listen(3000);

// add routes
router(app);

app.use((req, res)=>{
    return res.status(404).json({message: "Not found", status : 404})
});

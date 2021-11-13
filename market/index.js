const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const axios = require("axios");
const cors = require("cors");
const items = require("./items");

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());


app.get("/",(req,res)=>{
    res.send(items)
})

app.post("/addPhone",(req,res)=>{
 console.log(req.body);
 let itemAdded=req.body
 items.push(itemAdded)
 res.send(itemAdded)
})


app.listen(4000);
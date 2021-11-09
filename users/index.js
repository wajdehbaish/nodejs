const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const axios = require("axios");
const cors = require('cors')
const users = require("./users")
const app = express();
app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.get("/",(req,res)=>{

    res.send(users)
  
})

app.post("/",(req,res)=>{
    console.log("addUser",req.body.User);
    let Users=getUser()
    console.log(Users);
    Users.push(req.body.User)
    const dataJSON = JSON.stringify(Users);
    fs.writeFileSync('users.json', dataJSON);
    res.status(201).send(req.body.User)

})


const getUser=()=>{
    ///get data from file
    try{
        const dataBuffer = fs.readFileSync('users.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (e) {
        return [];
    }
  
}


app.listen(4000);
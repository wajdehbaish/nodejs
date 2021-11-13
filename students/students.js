const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const app = express()
const mongoose = require('mongoose');
const { studentsModel } = require("./student.model");


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors())

app.get('/',(req,res)=>{
    console.log('students');
    res.send('students')
})


app.get('/getStudents',(req,res)=>{
    studentsModel.find({},(err,data)=>{
        if (err) throw err;
        res.send(data);
    })
})


app.post('/createStudent',(req,res)=>{
    console.log('req.params',req.body);
    const {name,age,email}=req.body;
    console.log('createStudent',name,age,email);

    const newStudents = new studentsModel({
        name:name,
        age:age,
        email:email
    });
    newStudents.save();
    res.send('student created')
})


mongoose.connect('mongodb://localhost/studentsdb', {useNewUrlParser: true, useUnifiedTopology: true}, () => {
    console.log('Connected to DB');
});


app.listen(4000)


const express= require('express');
const app=express();
const bodyParser=require("body-parser");
const employees = require('./app/routes/employeeRoute');
const mongoose=require('mongoose');
const port='3000';
const cors=require('cors');
app.set('port',port);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors());

mongoose.connect('mongodb+srv://mongouser1:mongouser1@cluster0.yt8nk.mongodb.net/employees?retryWrites=true&w=majority',
{
    useNewUrlParser: true
}).then(()=>{
    console.log('connected to databse');
}).catch(err=>{
    console.log('could not connect to database');
})

app.listen(port,() => {
console.log('server listening on port',port);
});

app.use('/', employees);
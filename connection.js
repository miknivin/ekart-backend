//Connect node and mongodb
//1 import mongoose
const mongoose = require('mongoose')

//add connection from .env
const DB = process.env.DATABASE

mongoose.connect(DB,{useUnifiedTopology:true,useNewUrlParser:true})
.then(()=>{
    console.log('Database connection established');
})
.catch((err)=>{
    console.error(err);
})
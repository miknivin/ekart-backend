//1 automatically load .env file into the application

require('dotenv').config()

//2. import express
const express = require('express')

//6 import cors
const cors = require('cors')

//3. Create an application using the express
const server = express()
//
//10 import router
const router = require('./routes/router')

//9. import connection.js
require('./connection')
//4. Define the port
const PORT = 5000

const allowedOrigins = ['http://localhost:4200'];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};
//7 Use CORS
server.use(cors(corsOptions));
server.use(express.json())
server.use(router)



//5. run the application
server.listen(PORT,()=>{
    console.log('Listening on port'+'-'+PORT);
})

//8 Define Routes
server.get('/',(req,res)=>{
    res.status(200).json('Ecommerece service started')
})
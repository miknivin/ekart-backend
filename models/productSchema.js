//1 import mongoose
const mongoose = require('mongoose')

//2 define schema for product collection 
const productSchema = new mongoose.Schema({
    id:{
        type:String,
        required:true,
        unique:true
    },
    title:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    }
    ,
    category:{
        type:String,
        required:true
    },
    rating:{
        rate:{
            type:Number,
            required:true
        },
        count:{
            type:Number,
            required:true
        }
    }
})
//3 create a model to store products
const products = new mongoose.model('products',productSchema) 

module.exports = {
    products
}
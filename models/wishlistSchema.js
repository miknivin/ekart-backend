//1 import mongoose
const mongoose=require('mongoose')

//2 Define a schema for wishList  collection and store products
        //In this only id have unique and others have same key and value.
const wishlistSchema = new mongoose.Schema({
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
        required:true
    },
    image:{
        type:String,
        required:true
    }
 
})

//3 Create a Model to store products
const wishlists = new mongoose.model('wishlists',wishlistSchema)                    //model name = products
                                                                                 //schema name = productSchema

//4 Export the Model
module.exports = wishlists
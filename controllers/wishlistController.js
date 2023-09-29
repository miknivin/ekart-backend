//logic for wishLists
//import wishLists form model
const wishlists = require('../models/wishlistSchema')

//logic for add wishlist
exports.addToWishlist=async(req,res)=>{
    //get product details 
    // req.body={
    //     id:9890,
    //     title:'err',
    //     price:'688'
    // }
    // - Probably we give like this but here we cant set like this because the data is dependent ,So we use destructuring
    // Destructuring 
    // syntax:  = const {id,title,price,image}=req.body
        const {id,title,price,image}=req.body

        //logic

        try{
              //check the product is already available in wishlists
        const item = await wishlists.findOne({id})
        if(item){
            res.status(401).json("Product already available in Wishlist")
        }
        else{
            //add a new product  to  the wishlists
             const newProduct = new wishlists({id,title,price,image})
             //To store the new product in the wishlists
             await newProduct.save()
             //send response back to the client
             res.status(200).json("Product added successfully")

        }
}
catch(error){
    res.status(200).json(error)
}

        }
      
// get all wishlist products
exports.getWishListsItems=async (req,res)=>{
        //logic

        try{
    const allWishlist=await wishlists.find()
    res.status(200).json(allWishlist) // wishlists products details


        }
        catch(error){

            res.status(404).json(error)
        }
}

// Delete a product from the wishlist
exports.deleteWishlist = async (req, res) => {
    // Get the product ID from the request body
    // const {id} = req.body.id;
    //get id from path parameter
    const { id } = req.params;
    try {
        // Find the product in the wishlist by its ID and remove it
        const removedProduct = await wishlists.deleteOne({id});
        //get remaining product details after deleting a particular product

        if (removedProduct) {
            const allItems = await wishlists.find()
            res.status(200).json(allItems);
        } else {
            res.status(404).json({ message: "Product not found in wishlist" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

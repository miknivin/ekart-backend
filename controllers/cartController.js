
const Cart = require('../models/cartSchema'); // Corrected import
const { products } = require('../models/productschema');

exports.addToCart = async (req, res) => {
  // Get product details from the request
  const { id, title, price, image, quantity } = req.body;

  try {
    // Check if the product is already in the cart
    const existingProduct = await Cart.findOne({ id });

    if (existingProduct) {
      // Product is present in the cart, update the quantity and price accordingly
      existingProduct.quantity += quantity; // Update quantity
      existingProduct.grandTotal = existingProduct.price * existingProduct.quantity; // Update grandTotal

      // Save changes to the database
      await existingProduct.save();

      // Send response back to the client
      return res.status(200).json('Product details updated');
    } else {
      // Product is not present in the cart, add the product to the cart
      const newProduct = new Cart({
        id,
        title,
        price,
        image,
        quantity,
        grandTotal: price * quantity, // Calculate grandTotal
      });

      // Save the new product details
      await newProduct.save();

      return res.status(200).json('Product added successfully');
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json('Internal server error');
  }
};

exports.getCarts = async (req,res) =>{
  try {
    const cartItems = await Cart.find()
    return res.status(200).json(cartItems)
  } catch (error) {
    return res.status(400).json("Cart Items not found")
  }
}

exports.deleteCartProducts=async(req,res)=>{
  //get products id from request
  const {id} = req.params
  //remove product from cart
  try{
    const removeProduct = await Cart.deleteOne({id})
    //get all remaining products from cart
    if (removeProduct.deletedCount!==0) {
      const allProducts = await Cart.find()
      res.status(200).json(allProducts)
    }
    else{
      res.status(400).json("cart is empty")
    }
 
  }
  catch(error){
    res.status(404).json(error)
  }
}

//increment the cart product count
exports.incrementProductCount = async(req,res)=>{
  //find product id
  const {id} = req.params
  try{
    //if the product already in the cart then quantity will be incremenred by 1
    //then update the grand total
    const product = await Cart.findOne({id})
    if(product){
      product.quantity+=1;//increment the quantity by 1
      product.grandTotal=product.price*product.quantity
      //save changes to the db
      product.save()
      //after the product has been saved, update the content into the client side
      const allCart = await Cart.find()
      res.status(200).json(allCart)
    }
    else{
      res.status(401).json("product not Found")
    }
  }

  catch(error){
    res.status(404).json(error)
  }
}

//decrement cart product count
exports.decrementProductCount = async(req,res)=>{
  //find product id
  const {id} = req.params
  try{
    //if the product already in the cart then quantity will be incremenred by 1
    //then update the grand total
    const product = await Cart.findOne({id})
    if(product){
      product.quantity-=1;//increment the quantity by 1
   
      if (product.quantity==0) {
        await Cart.deleteOne({id})
        const allCart = await Cart.find()
        res.status(200).json(allCart)
      }
      else{
      product.grandTotal=product.price*product.quantity
      //save changes to the db
      await product.save()
      //after the product has been saved, update the content into the client side
      const allCart = await Cart.find()
      res.status(200).json(allCart)
      }
    }
    if (!product) {
      res.status(401).json("product not Found")
    }
  }

  catch(error){
    res.status(404).json(error)
  }
}
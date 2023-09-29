//1 import express
const express = require('express');

//4 import product controller
const productController = require('../controllers/productController')
const wishlistController = require('../controllers/wishlistController')
const cartController = require('../controllers/cartController')
//2 Using express create object for router class inorder to setup path
const router = new express.Router()

//3 Use router object to resolve client request

    //get all prodcuts api request

router.get('/products/all-products',productController.getAllProducts)

// Get a particular product based on its ID
router.get('/products/view-products/:id', productController.viewProduct);

//add new product to the wishlist
router.post('/wishlists/add-to-wishlist',wishlistController.addToWishlist);

//view all wishlist items
router.get('/wishlists/view-all-wishlist',wishlistController.getWishListsItems)

// Delete a product from the wishlist
router.delete('/wishlists/delete-wishlist-product/:id', wishlistController.deleteWishlist);

//add to cart
router.post('/carts/add-to-cart',cartController.addToCart)

//get cart items
router.get('/carts/get-cart',cartController.getCarts)

//delete cart products
router.delete('/carts/delete-products/:id',cartController.deleteCartProducts)

//increment cart quantity
router.get('/carts/increment-product/:id',cartController.incrementProductCount)

//decrement cart quantity
router.get('/carts/decrement-product/:id',cartController.decrementProductCount)

module.exports=router 
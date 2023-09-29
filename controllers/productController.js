//logic for getting all products from mongodb

//1. import product collection

const products = require('../models/productschema');

exports.getAllProducts = async (req, res) => {
    try {
        const allProducts = await products.find(); 
        res.status(200).json(allProducts);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

exports.viewProduct = async (req, res) => {
    try {
      // Extract the product ID from the request parameters
      const id = req.params.id;
  
      // Check if the product ID is present in the db
      const product = await products.findOne({ id });
  
      if (product) {
        res.status(200).json(product);
      } else {
        res.status(404).json('Product not found');
        console.log(req.body);
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  
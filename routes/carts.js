const { OrderItem } = require('../models/cart');  
const express = require('express');
const router = express.Router();
const {Product} = require('../models/product');

router.get(`/`, async (req, res) =>{
    const cart = await OrderItem.find().populate('product');

    if(!cart) {
        res.status(500).json({success: false})
    }
    res.send(cart);
})

router.get('/:id', async(req,res)=>{
    const cart = await OrderItem.findById(req.params.id);

    if(!cart) {
        res.status(500).json({message: 'The category with the given ID was not found.'})
    } 
    res.status(200).send(cart);
})


router.post('/', async (req, res) => {
    const { quantity, product } = req.body;
  
    try {
      // Fetch the product from the database
      const productData = await Product.findById(product);
  
      if (!productData) {
        return res.status(404).json({ error: 'Product not found' });
      }
  
      // Calculate tax based on the product's price
      let tax = 0;
      if (productData.price > 1000 && productData.price <= 5000) {
        tax = productData.price * 0.12;
      } else if (productData.price > 5000) {
        tax = productData.price * 0.18;
      }
      else{
        tax = 200;
      }
  
      // Calculate total price including tax
      const totalPriceWithTax = productData.price + tax;
      const totalPrice = totalPriceWithTax * quantity;
  
      // Create a new order item with calculated values
      const newOrderItem = new OrderItem({
        quantity,
        product,
        tax,
        totalPriceWithTax,
        totalPrice,
      });
  
      // Save the order item
      const savedOrderItem = await newOrderItem.save();
  
      if (!savedOrderItem) {
        return res.status(400).send('The order item could not be created.');
      }
  
      res.status(200).json(savedOrderItem);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Internal server error.');
    }
  });

router.put('/:id', async (req, res) => {
    try {
        const cart = await OrderItem.findByIdAndUpdate(
            req.params.id,
            {
                quantity: req.body.quantity,
                product: req.body.product,
            },
            { new: true }
        );

        if (!cart) {
            return res.status(400).send('The cart cannot be updated!');
        }

        res.send(cart);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
});

router.delete(`/:id`, async(req,res)=>{
    OrderItem.findByIdAndRemove(req.params.id).then(orderitem =>{
        if(orderitem){
            return res.status(200).json({success: true, message: 'the cart is deleted'})
        }
        else{
            return res.status(404).json({success: false, message: 'the cart not found'})
        }
    }).catch(err=>{
        return res.status(400).json({success : false, error: err})
    })
})


module.exports =router;

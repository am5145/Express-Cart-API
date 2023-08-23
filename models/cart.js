const mongoose = require('mongoose');

const orderItemSchema = mongoose.Schema({
    quantity: {
        type: Number,
        required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
   
    tax: {
        type: Number,
        default:0
    },

    totalPriceWithTax: {
        type: Number,
        default:0
    },
    totalPrice: {
        type: Number,
        default:0
    },
})

exports.OrderItem = mongoose.model('OrderItem', orderItemSchema);
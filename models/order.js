const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderSchema = new Schema({
    shippingInfo: {
        address: {
            type: String, 
            required: true
        },
        city: {
            type: String, 
            required: true
        },
        phoneNum: {
            type: String, 
            required: true
        },
        postalCode: {
            type: String, 
            required: true
        },
        country: {
            type: String, 
            required: true
        },
    },
    // user: {
    //     type: String, 
    //     required
    // }
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true, 
        ref: 'user'
    },
    orderItems: [
        {
            name: {
                type: String, 
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            image: {
                type: String,
                required: true
            },
            price: {
                type: Number, 
                required: true
            },
            id: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'Product'
            },
            totalPrice: {
                type: Number,
                required: true
            },

            //New stuff under here
            waistSize: {
                type: String,
                
                
            },
            lengthSize: {
                type: String,
                required: true

            },
            category: {
                type: String,
                required: [true, 'Please select category for this product'],
                enum: {
                    values: [
                        'Jeans',
                        'Shirts',
                        'Dress Shirts',
                        'Dress Pants',
                        'Dresses',
                        'Skirts',
                        'Sweaters',
                        'Shorts',
                        'Tops',
                        'Button Down Shirts'
                    ],
                    message: 'Please select correct category for product'
                }
            },
            gender: {
                type: String,
                required: [true, 'Please enter a gender'],
                enum: {
                    values: ["Male", "Female"],
                    message: 'Please select a gender'
                }
            },

        }
    ],
    paymentInfo: {
        id: {
            type: String
        },
        status: {
            type: String
        }
    },
    itemsPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    taxPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    shippingPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    orderStatus: {
        type: String,
        required: true,
        default: 'Processing'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }



})

module.exports = mongoose.model('order', orderSchema);
const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true, 
        ref: 'user'
    },
    cartItems: [
        {
            product: {type: mongoose.Schema.Types.ObjectId, ref:'Product', require: true},
            quantity: {type: Number, default: 1},
            price: {type: Number, require: true},
            name: {
                type: String,
                required: [true, 'Please enter product name'],
                trim: true,
                maxLength: [100, 'Product name cannot exceed 100 characters']
            },
            image: {
                type: String,
                required: true
            },
            waistSize: {
                type: String,
                
                
            },
            lengthSize: {
                type: String,
                required: true

            },
            totalPrice: {
                type: Number,
                required: true
            },

            //new
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
    ]

}, {timestamps: true})

module.exports = mongoose.model('Cart', cartSchema);


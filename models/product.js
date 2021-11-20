const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please enter product name'],
        trim: true,
        maxLength: [100, 'Product name cannot exceed 100 characters']
    },
    gender: {
        type: String,
        required: [true, 'Please enter a gender'],
        enum: {
            values: ["Male", "Female"],
            message: 'Please select a gender'
        }
    },
    price: {
        type: Number,
        required: [true, 'Please enter product name'],
        maxLength: [5, 'Product name cannot exceed 5 characters'],
        default: 0.0
    },
    description: {
        type: String,
        required: [true, 'Please enter product description'],
    },
    ratings: {
        type: Number,
        default: 0
    },
    recommended: {
        type: Number,
        default: 0
    },
    color: {
        type: String,
    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            },
        }
    ],
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
    // stock: {
    //     type: Number,
    //     required: [true, 'Please enter product stock'],
    //     maxLength: [5, 'Product name cannot exceed 5 characters'],
    //     default: 0
    // },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            name: {
                type: String,
                required: true,
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            },
            headline: {
                type: String,
                required: true
            },
            recommend: {
                type: Number, 
                required: true
            }

        }
    ]

}, {
    timestamps: true
})

module.exports = mongoose.model('Product', productSchema);
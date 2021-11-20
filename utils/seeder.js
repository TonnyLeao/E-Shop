const Product = require('../models/product');

const mongoose = require('mongoose');

const products = require('../data/product.json');
const keys = require('../config/keys');

mongoose.connect(keys.mongoURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  });

const seedProducts = async () => {
    try {

        await Product.deleteMany();
        console.log('Products are deleted');

        await Product.insertMany(products)
        console.log('All Products are added.')

        process.exit();

    } catch (error) {
        console.log(error.message);
        process.exit();
    }
}

seedProducts()
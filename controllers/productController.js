const Product = require('../models/product');

//Create new product => /api/v1/product/new
exports.newProduct = async (req, res, next) => {
    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product
    })
}
//Get all products => /api/v1/products
exports.getProducts = async (req, res, next) => {

    const products = await Product.find();
    
    // req.body.user = req.user.id

    res.status(200).json({
        success: true,
        count: products.length,
        products
    })
}

//Get all Male Products 
exports.getMaleProducts = async (req, res, next) => {

    const products = await Product.find({ gender: "Male"});

    res.status(200).json({
        success: true,
        count: products.length,
        products
    })
}

//Get all Female Products 
exports.getFemaleProducts = async (req, res, next) => {

    const products = await Product.find({ gender: "Female"});

    res.status(200).json({
        success: true,
        count: products.length,
        products
    })
}

//Get single product details => /api/v1/product/:id
exports.getSingleProduct = async (req, res, next) => {
    const product = await Product.findById(req.params.id);

    if(!product) {
        return res.status(404).json({
            success: false,
            message: 'Product not found'
        })
    }

    res.status(200).json({
        success: true,
        product
    })
}

//Create new review => /api/v1/review
exports.createProductReview = async(req, res, next) => {
    const { rating, comment, productId, headline, recommend} = req.body;

    const review = {
        // user: req.user._id,
        // name: req.user.name, 
        name: "Tony",
        rating: Number(rating),
        headline,
        comment,
        recommend
    }

    const product = await Product.findById(productId);
    console.log(product)

    // const isReviewed = product.reviews.find(
    //     r => r.user.toString() === req.user._id.toString()
    // )

    // if(isReviewed) {
    //     if(review.user.toString() === req.user._id.toString()) {
    //         review.comment = comment;
    //         review.rating = rating;
    //     }
    // } else {
    //     product.reviews.push(review);
    //     product.numReviews = product.reviews.length
    // }

    
        if(review) {
            console.log(review)
            product.reviews.push(review);
            product.numOfReviews = product.reviews.length
        } else {
            product.reviews.push(review);
            product.numOfReviews = product.reviews.length
        }   


    product.ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0)/ product.reviews.length
    product.recommended = product.reviews.reduce((acc, item) => item.recommend + acc, 0)/ product.reviews.length

    await product.save({ validateBeforeSave: false});

    res.status(200).json({
        success: true
    })
}


// Get Product Reviews => /api/v1/reviews
exports.getProductReviews = async(req, res, next) => {
    const product = await Product.findById(req.query.id);

    res.status(200).json({
        success: true,
        reviews: product.reviews
    })

}

// Delete Product Review => /api/v1/reviews
exports.deleteReview = async(req, res, next) => {
    const product = await Product.findById(req.query.productId);

    const reviews = product.reviews.filter(review => review._id.toString() !== req.query.id.toString());

    const numOfReviews = reviews.length
    
    const ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0)/ reviews.length

    await Product.findByIdAndUpdate(req.query.productId, {
        reviews,
        ratings,
        numOfReviews
    }, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })
    
    res.status(200).json({
        success: true,
    })

}

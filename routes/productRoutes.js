const express = require('express')
const router = express.Router();
const passport = require('passport');
const requireLogin = require('../middlewares/requireLogin');

const { getProducts, newProduct, getSingleProduct, getMaleProducts, getFemaleProducts, createProductReview, getProductReviews, deleteReview } = require('../controllers/productController')

router.route('/products').get(getProducts);

router.route('/productsTest').get(passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/auth/google'
}))

router.route('/products/male').get(getMaleProducts);
router.route('/products/female').get(getFemaleProducts);
router.route('/product/:id').get(getSingleProduct);

router.route('/product/new').post(newProduct);

router.route('/review').put(createProductReview);
router.route('/reviews').get(getProductReviews);
router.route('/reviews').delete(deleteReview);

module.exports = router;
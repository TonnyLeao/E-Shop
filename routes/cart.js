const express = require('express')
const {addItemToCart, removeItemToCart, getCartOrder, emptyItemToCart, addGuestCart, removeEntireItem} = require('../controllers/cart');
const router = express.Router();

router.get('/getcart', getCartOrder);
router.post('/addtocart', addItemToCart);
router.post('/removeitem', removeItemToCart);
router.post('/emptyCart', emptyItemToCart);
router.post('/addguestcart', addGuestCart);


module.exports = router;
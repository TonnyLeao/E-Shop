const express = require('express')
const router = express.Router();

const {newOrder, getsingleOrder, myOrders, allOrders } = require('../controllers/orderController');


router.route('/order/new').post(newOrder);

router.route('/order/:id').get(getsingleOrder);

router.route('/orders/me').get(myOrders);

router.route('/admin/orders').get(allOrders)

module.exports = router;
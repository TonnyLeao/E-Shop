const Order = require('../models/order');
const Product = require('../models/product');

//Create a new order => /api/v1/order/new
exports.newOrder = async(req, res, next) => {
    const{
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice, 
        totalPrice,
        paymentInfo
    } = req.body;

    const order = await Order.create({
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice, 
        totalPrice,
        paymentInfo,
        paidAt: Date.now(),
        user: req.user._id
    })

    res.status(200).json({
        success: true,
        order
    })
}

// Get single order => /api/v1/order/:id
exports.getsingleOrder = async(req, res, next) => {
    const order = await Order.findById(req.params.id)

    if(!order) {
        return res.status(404).json({
            success: false,
            message: 'Order not found'
        })
    }

    res.status(200).json({
        success: true,
        order
    })
}


// Get logged in user order => /api/v1/orders/me 
exports.myOrders = async(req, res, next) => {
    const orders = await Order.find({user: req.user._id})

    res.status(200).json({
        success: true,
        orders
    })
}

//Get all orders => /api/v1/admin/orders/
exports.allOrders = async(req, res, next) => {
    const orders = await Order.find()

    res.status(200).json({
        success: true,
        orders
    })

}

const keys = require('../config/keys');

const stripe = require('stripe')(keys.STRIPE_SECRET_KEY);

// Process stripe payments => /api/v1/payment/process
exports.processPayment = async(req, res, next) => {
    const paymentIntent = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: 'usd',
        metadata: { integration_check: 'accept_a_payment'}
    })

    res.status(200).json({
        success: true,
        client_secret: paymentIntent.client_secret
    })
}

// Send stripe API Key => /api/v1/stripeapi
exports.sendStripeApi = async(req, res, next) => {

    res.status(200).json({
        stripeApiKey: keys.STRIPE_API_KEY
    })
}
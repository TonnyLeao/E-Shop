//prod
module.exports = {
    googleClientID: process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
    mongoURI: process.env.MONGO_URI,
    cookieKey: process.env.COOKIE_KEY,
    STRIPE_API_KEY: process.env.STRIPE_PUBLISHABLE_KEY,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    // stripePublishableKey: process.env.REACT_APP_STRIPE_KEY
    // stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    // stripeSecretKey: process.env.STRIPE_SECRET_KEY,

};
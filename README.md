<a href="https://mighty-tundra-29925.herokuapp.com/">Deployed Site</a>

# E-Shop
E-Shop is an E-commerce website using the MERN stack. I wanted to build a fully featured E-commerce with secured backend and promote a frictionless user experience.  

# Features
* Multiple filtering for price and color
* Sign up and Log In with Passport Local Strategy
* Log in with Google OAuth 
* Add and delete products from shopping cart 
* Auto merge guest cart to user cart when logged in, prices are pulled from MongoDB 
* User cart is stored in MongoDB for secure checkout 
* Stripe integration, use Stripe <a href="https://stripe.com/docs/testing">test card numbers</a> to checkout 
* Paypal integration, use Paypal <a href="https://developer.paypal.com/docs/payflow/payflow-pro/payflow-pro-testing/">test card numbers</a> to checkout
* Signed in user can view purchase history 

# Tech Stack/ libraries used:
* ReactJs
* Node.js
* Express.js
* React Strap 
* React Router
* MongoDB
* Mongoose
* Passport
* Stripe API
* Paypal API
* Nodemon
* Axios
* FontAwesome

# Run
To run this application, you have to set your own environmental variables. For security reasons, some variables have been hidden from view and used as environmental variables with the help of dotenv package. Below are the variables that you need to set in order to run the application:

* googleClientID: The developer key to use the 0google Oauth feature
* googleClientSecret: The secret key to use for the google Oauth feature
* mongoURI: This is the connection string to your MongoDB Atlas database
* STRIPE_API_KEY: The stripe API key to use test cards 
* STRIPE_SECRET_KEY: The stripe secret key to use test cards





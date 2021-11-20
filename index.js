const express = require('express');
const mongoose = require('mongoose');

//new
const session = require('express-session');
const FileStore = require('session-file-store')(session);

const cookieSession = require('cookie-session');
const passport = require('passport');
const authenticate = require('./authenticate');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');


const connectDB = async () => {
    try {
        mongoose.connect(keys.mongoURI, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });
        
        console.log('MongoDB connected!!');
    } catch (err) {
        console.log('Failed to connect to MongoDB', err);
    }
};

connectDB();


// mongoose.connect(keys.mongoURI, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useUnifiedTopology: true,
// });

const app = express();

app.use(express.json())


//Import all routes
const products = require('./routes/productRoutes');
const order = require('./routes/order');
const payment = require('./routes/payment');
const usersRouter = require('./routes/usersRoute');
const cartRoutes = require('./routes/cart');



app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);

//new adding session
app.use(session({
    name: 'session-id',
    secret: '12345-67890-09876-54321',
    saveUninitialized: false,
    resave: false,
    store: new FileStore()
}));

app.use(passport.initialize());
app.use(passport.session());

//new
app.use('/api/users', usersRouter);

// function auth(req, res, next) {
//     console.log(req.user);

//     if (!req.user) {
//         const err = new Error('You are not authenticated!');                    
//         err.status = 401;
//         return next(err);
//     } else {
//         return next();
//     }
// }

// app.use(auth)

app.use('/api/v1', products)
app.use('/api/v1', order)
app.use('/api/v1', payment)
app.use('/api/v1', cartRoutes)




require('./routes/authRoutes')(app);

// app.get('/', function (req, res) {
//     res.send('hello world')
// })

// app.use(express.static(__dirname + '/public'));

// app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
//   });

app.use(express.static(path.join(__dirname, 'public')));

// router.get('/', function(req, res, next) {
//     res.sendFile(path.join(__dirname, '../public', 'index.html'));
// });


const PORT = process.env.PORT || 5000;
app.listen(PORT);
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

//this line is new
const LocalStrategy = require('passport-local').Strategy;


const User = mongoose.model('user');

passport.serializeUser((user, done) => {
    done(null, user.id);
})

passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => {
            done(null, user);
        })
})

passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback',
    proxy: true
    }, 
    async (accessToken, refreshToken, profile, done) => {
        console.log('access token', accessToken);
        console.log('refreshToken', refreshToken);
        console.log('profile', profile.photos[0].value);
        const existingUser = await User.findOne({ googleId: profile.id })
        if(existingUser){
            done(null, existingUser);
        } else {
            const user = await new User({ googleId: profile.id, userPhoto:profile.photos[0].value}).save()
            done(null, user);
        }
    })
);

//this line is new 
passport.use(new LocalStrategy(User.authenticate()));

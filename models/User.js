const mongoose = require('mongoose');

//under this, 1 line is new, (also note that we didn't change the userSchema, may effect the rendering later)
const passportLocalMongoose = require('passport-local-mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
    googleId: String,
    userPhoto: String,
})

//this line is new
userSchema.plugin(passportLocalMongoose);

//adding module export to see if it works
module.exports = mongoose.model('user', userSchema);
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var userSchema = new Schema({
    email: { type: String, unique: true, required: true },
    username: { type: String, unique: true, index: true, required: true },
    password: { type: String, required: true },
    name:String,
    profileImage:String,
    userType:String
});

userSchema.pre('save', function (done) {
    var user = this;

    if (!user.isModified('password')) {
        return done();
    }

    bcrypt.hash(user.password, 10, function (err, hash) {
        if (err) {
            return done(err);
        }
        user.password = hash;
        return done();
    });
});

userSchema.methods.checkPassword = function (password, done) {
    bcrypt.compare(password, this.password, function (err, isMatch) {
        return done(err, isMatch);
    });
};

userSchema.methods.isAdmin = function ()
{
  return this.userType === 'Admin';
};

userSchema.methods.isBusiness = function ()
{
  return this.userType === 'Business';
};

mongoose.model('User', userSchema);

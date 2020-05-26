var mongoose = require('mongoose'), Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var UserSchema = new mongoose.Schema({	
  firstname: {
    type: String,
    required: true,
    trim: true
  },
    lastname: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
       trim: true
  },

  username: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
  },
  loan_applied:String
  
},{ timestamps: true });

//authenticate input against database
UserSchema.statics.authenticate = function (email, password, callback) {
 User.findOne( (email.indexOf('@') === -1) ? {username: email} : {email: email})    .exec(function (err, user) {
      if (err) {
        return callback(err)
      } else if (!user) {
        var err = new Error('User not found.');
        err.status = 401;
        return callback(err);
      }
      bcrypt.compare(password, user.password, function (err, result) {
        if (result === true) {
          return callback(null, user);
        } else {
          return callback();
        }
      })
    });
}

//hashing a password before saving it to the database
UserSchema.pre('save', function (next) {
  var user = this;
  bcrypt.hash(user.password, 10, function (err, hash) {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  })
});


const User = mongoose.model('User', UserSchema);
module.exports = mongoose=>{ User;
return User;
};


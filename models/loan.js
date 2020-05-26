module.exports = mongoose => {
	var UserSchema = new mongoose.Schema(
      {
        username:{
    type: String,
    required: true,
    trim: true,
	unique:true
  },
        lastname: String,
        firstname: String,
		password:String,
		loan_applied:String,
		prompt:String,
		loan_status:String,
		user_type:String,
		CRM_number:String
      },
      { timestamps: true }
    );
	
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
  const Loan = mongoose.model("loan",UserSchema );

  return Loan;
};
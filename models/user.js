const mongoose = require('mongoose'),
	  Schema = mongoose.Schema,
    bcrypt = require('bcryptjs');
    
const UserSchema = new Schema({
  roleType: {
    type: String, 
    required: true,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true
    },
  password: {
      type: String,
      required: true,
      minlength: 8,
      maxlength: 64
    },
  phone_number:{
      type : String,
      required: true,
      unique: true
  }
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.createUser = function(newUser, callback){
  bcrypt.genSalt(10, function(err, salt) {
    if(err) {
      return err
    }

    bcrypt.hash(newUser.password, salt, function(err, hash) {
      if(err) {
        return err
      }
      newUser.password = hash;
      newUser.save(callback);
    });
  });
}

  module.exports.getUserByEmail = function(email, callback){
    var query = {email: email};
  
    User.findOne(query, callback);
  
  }
  
  module.exports.getUserById = function(id, callback){
  
    User.findById(id, callback);
  
  }
  
  module.exports.comparePassword = function(candidatePassword, 
  hash, callback){
  
    bcrypt.compare(candidatePassword, hash, function(err, isMatch)
  {
  
      if(err) throw err;
  
      callback(null, isMatch);
  
    });
  
  }
  
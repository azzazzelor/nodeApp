const mongoose = require('mongoose'),
	Schema = mongoose.Schema;

const UserSchema = new Schema({
	roleType: {
		type: String, 
		required: true,
		minlength: 6,
		maxlength: 10,
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
		minlength: 8
	},
	phoneNumber: {
		type : String,
		required: true,
		unique: true
	}
});

module.exports = mongoose.model('User', UserSchema);
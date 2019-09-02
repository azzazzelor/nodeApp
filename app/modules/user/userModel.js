const mongoose = require('mongoose'),
	Schema = mongoose.Schema;

const UserSchema = new Schema({
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
	facebook: {
		id: String,
		token: String,
		firstName: String,
		lastName: String,
		email: String
	},
	roleType: {
		type: String,
		required: true,
		minlength: 6,
		maxlength: 10,
	},
	phoneNumber: {
		type : String,
		required: true,
		unique: true
	},
	google: {
		id: String,
		token: String,
		firstName: String,
		lastName: String,
		email: String
	}
});

module.exports = mongoose.model('User', UserSchema);
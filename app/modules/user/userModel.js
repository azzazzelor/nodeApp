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
	facebook: {
		id: {
			type: String
		},
		token: {
			type: String
		},
		firstName: {
			type: String
		},
		lastName: {
			type: String
		},
		email: {
			type: String
		}
	},
	google: {
		id: {
			type: String
		},
		token: {
			type: String
		},
		firstName: {
			type: String
		},
		lastName: {
			type: String
		},
		email: {
			type: String
		}
	},
	active:{
		type: Boolean,
		default : false
	},
	location: {
		type: { 
			type: String,
			enum: ['Point'],
			required: false,
		},
		coordinates: {
		 type: [Number],
			required: false
		 },
		required: false,
 	},
	school: {
		type: mongoose.Schema.Types.ObjectId, ref: 'School',
		required: false
	},
	instructor: {
		type: mongoose.Schema.Types.ObjectId, ref: 'Instructor',
		required: false
	},
	student: {
		type: mongoose.Schema.Types.ObjectId, ref: 'Student',
		required: false
	},
	activeChats: {
		type: Array, 
		default : []
	},
})

UserSchema.index({ location: '2dsphere' })

module.exports = mongoose.model('User', UserSchema);
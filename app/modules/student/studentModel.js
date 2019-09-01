const mongoose = require('mongoose'),
	Schema = mongoose.Schema;

const StudentSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId, ref: 'User',
        required: true,
    },
    firstName: {
        type: String,
        required: true,   
        minlength: 2,
        maxlength: 50
    },
    lastName: {
    	type: String,
        required: true,
        minlength: 2,
        maxlength: 50
    },
    age: {
        type: Number,
        required: true
    },
    driverLicenseStatus: {
        type: Boolean,
        required: true
    },
    personalImage: {
        type: String,
        required: false
    },
    coverImage: {
        type: String,
        required: false
    },
    likedUsers: [{
        type: Schema.Types.ObjectId, ref: 'User',
        require: false
    }]
});

module.exports = mongoose.model('Student', StudentSchema);
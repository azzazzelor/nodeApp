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
    dateOfBirth: {
        type: String,
        required: true
    },
    driverLicenseStatus: {
        type: Boolean,
        required: true
    },
    driverLicensePhoto: {
        type: String,
        required: true
    },
    personalImage: {
        type: String,
        required: false
    },
    likedUsers: {
        type: Array,
        default: [],
    }
});

module.exports = mongoose.model('Student', StudentSchema);
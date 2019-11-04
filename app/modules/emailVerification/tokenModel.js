const mongoose = require("mongoose"),
	Schema = mongoose.Schema;


const ResetTokenSchema = new Schema({
    userId : {
        type: Schema.Types.ObjectId, ref: 'User'
    },
    resettoken: {
        type: String, 
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now, 
        expires: 43200
    },
});


module.exports = mongoose.model('passwordResetToken', ResetTokenSchema);
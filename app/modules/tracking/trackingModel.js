const mongoose = require("mongoose"),
	Schema = mongoose.Schema;
    
const TrackingSchema = new Schema({
    instructorId : {
        type: Schema.Types.ObjectId, ref: 'User',
        required: true,
    },
    studentId : {
        type: Schema.Types.ObjectId, ref: 'User',
        required: true,
    },
    pricePerKm : {
        type: String,
        required: true
    },
    coordinates:{
        type: Array,
        default: []
    },
    orderId:{
        type: String,
        required: true
    }
},
{
    timestamps: true 
});

module.exports = mongoose.model("Tracking", TrackingSchema)
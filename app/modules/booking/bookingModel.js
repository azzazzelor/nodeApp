const mongoose = require('mongoose'),
	Schema = mongoose.Schema;

const BookingSchema = new Schema({

    orderUserId: {
        type: Schema.Types.ObjectId ,
        ref: 'User',
        required : false
    },
    orderOfilietId: {
        type: Schema.Types.ObjectId ,
        ref: 'User'
    },
    orderCreateDate: {
        type: Number,
        default: new Date().getTime()
    },
    orderUpdateDate: {
        type: Date,
        required: false 
    },
    orderStartTime: {
        type : String,
        required: true 
    },
    orderEndTime: {
        type : String,
        required: true
    },
    orderType: {
        type: String,
        required: true
    },              // per hour or per km
    orderStatus: {
        type : String,
        default: 'pending',
    },
    orderDescription: {
        type: String,
        required: false
    },  
    unicId: {
        type: String,
        required: true
    },
    trackId: {
        type: Schema.Types.ObjectId ,
        ref: 'Tracking',
        required: false   
    }
});

// BookingSchema.static('compareTimes',function(start2,end2,cb){
//     return 
// })


module.exports = mongoose.model('Booking', BookingSchema);
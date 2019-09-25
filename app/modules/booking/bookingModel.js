const mongoose = require('mongoose'),
	Schema = mongoose.Schema;

const BookingSchema = new Schema({

    orderUserId: {
        type: Schema.Types.ObjectId ,
         ref: 'User',require : false
    },
    orderOfilietId : {
        type: Schema.Types.ObjectId ,
        ref: 'User'
    },
    orderCreateDate : {
        type: Date,
        require: true,
        default: Date.now
    },
    orderUpdateDate : {
        type: Date,
        require: false 
    },
    orderStartTime : {
        type : String,
        require: true 
    },
    orderEndTime : {
        type : String,
        require: true
    },
    orderType: {
        type: String,
        require: true
    },              // per hour or per km
    orderStatus : {
        type : String,
        default: 'pending',
    },
    orderDescription : {
        type: String,
        require: false
    }  
});

// BookingSchema.static('compareTimes',function(start2,end2,cb){
//     return 
// })


module.exports = mongoose.model('Booking', BookingSchema);
const mongoose = require('mongoose'),
	Schema = mongoose.Schema;

const SchoolSchema = new Schema({
    userId : { type: Schema.Types.ObjectId , ref: 'User'},
    name:{
        type : String,
        required : true,
    },
    address: {
        type : String,
        required : true,
    },
    zipCode: {
        type : String,
        required : true,
    },
    vatNumber: {
        type : String,
        required : true,
    },
    lastDayInspection:{
        type : String,
        required : true,
    },
    pricePerTraining:{
        type : String,
        required: true,
    },
    pricePerTrainingCurrency:{
        type : String,
        required: true,
    },
    coverImage : {
        type : String,
        required : false
    },
    schoolLicensePhoto:{
        type: String,
        required: true
    },
    personalImage:{
        type: String,
        required : false
    },
    studentsWhoLike: {
        type: Array,
        default: [],
    },
    instructors : {
        type: Array,
        default: [],
    },
    rating: {
        rate: {
            type: String,
            default: 0
        },
        emount: {
            type: String,
            default: 0
        }
    },
    city: {
        type: String,
        required: true
    }
});




module.exports = mongoose.model('School', SchoolSchema);
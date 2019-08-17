const mongoose = require('mongoose'),
	Schema = mongoose.Schema;

const SchoolSchema = new Schema({
    user_id : { type: Schema.Types.ObjectId , ref: 'User'},
    name:{
        type : String,
        required : true,
    },
    adress: {
        type : String,
        required : true,
    },
    zip_code: {
        type : String,
        required : true,
    },
    vat_number: {
        type : String,
        required : true,
    },
    last_day_inspection:{
        type : String,
        required : true,
    },
    price_per_training:{
        type : String,
        required: true,
    },
    price_per_training_currency:{
        type : String,
        required: true,
    },
    cover_photo : {
        type : String,
        required : false
    },
    school_license_photo:{
        type: String,
        required: true
    }
    
});




module.exports = mongoose.model('School', SchoolSchema);
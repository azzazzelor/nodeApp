'use strict';

const mongoose = require('mongoose'),
	Schema = mongoose.Schema;

const InstructorSchema = new Schema({
    userID : {
        type: Schema.Types.ObjectId, ref: 'User'
        },
    driver_license_number:{
        type: String,
        required: true,
        unique: true
    },
    driver_experience_year:{ 
        type: String,
        required: true
    },
    car : [{
        brand:{
            type: String,
            required: true
        },
        transmission :{
            type: String,
            required: false
        },
        registration_number :{
            type: String,
            required: true
        },
        price_per_km :{
            type: String,
            required: true
        },
        price_per_hour:{
            type:String,
            required:true
        }
    }],
       
    price_per_km_currency:{
        type:String,
        required:true
    },
    price_per_hour_currency:{
        type:String,
        required:true
    }, 
    driving_schoolID : {
        type: String,
        required: false
    },
    first_name: {
    	type: String,
        required: true,   
        minlength: 3,
        maxlength: 50
    
    },
    second_name:{
    	type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    plate_number : {
        type : String,
        required: true
    },
    photo: {
        type: String,
        required : false
    },
    driver_license_photo :{
        type: String,
        required: false
    },
});




module.exports = mongoose.model('Instructor', InstructorSchema);
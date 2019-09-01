const mongoose = require('mongoose'),
	Schema = mongoose.Schema;

const InstructorSchema = new Schema({
    userId : {
        type: Schema.Types.ObjectId, ref: 'User'
    },
    driverLicenseNumber: {
        type: String,
        required: true,
        unique: true
    },
    driverExperienceYear: { 
        type: String,
        required: true
    },
    car : [{
        brand:{
            type: String,
            required: true
        },
        transmission : {
            type: String,
            required: false
        },
        registrationNumber : {
            type: String,
            required: true
        },
        pricePerKm : {
            type: String,
            required: true
        },
        pricePerHour: {
            type:String,
            required:true
        }
    }],
       
    pricePerKmCurrency: {
        type:String,
        required:true
    },
    pricePerHourCurrency: {
        type:String,
        required:true
    }, 
    drivingSchoolId : {
        type: String,
        required: false
    },
    firstName: {
    	type: String,
        required: true,   
        minlength: 3,
        maxlength: 50
    
    },
    lastName: {
      	type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    plateNumber : {
        type : String,
        required: true
    },
    personalImage : {
        type: String,
        required : false
    },
    driverLicensePhoto :{
        type: String,
        required: false
    },
    coverImage :{
        type: String,
        required: false
    }
})


module.exports = mongoose.model('Instructor', InstructorSchema)
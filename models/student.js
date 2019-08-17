const mongoose = require('mongoose'),
	Schema = mongoose.Schema;

const StudentSchema = new Schema({
    user_id : {
        type: Schema.Types.ObjectId, ref: 'User',
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
    age: {
        type: String,
        required: true
    },
    driver_license :{
        type: Boolean,
        required: true
    },
    photo: {
        type: String,
        required : false
    },
    id_photo:{
        type: String,
        required : false
    },
    liked_users: [{
        type:String,
        require:false
    }]
})




const Student = module.exports = mongoose.model('Student', StudentSchema);


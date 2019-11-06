const mongoose = require("mongoose"),
	Schema = mongoose.Schema;
    
const TheorySchema = new Schema({
    name : String,
    coursePhoto : {
        type: String,
        required: false
    },
    topics :[{
        topicPhoto : {
            type: String, 
            required: false
        },
        title: String,
        text : String,
        rating : String,
        data : String,
    }] 
});

module.exports = mongoose.model("Theory", TheorySchema)
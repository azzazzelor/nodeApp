const mongoose = require("mongoose"),
	Schema = mongoose.Schema;
    
const TheorySchema = new Schema({
    name : String,
    // photo : String,
    topics :[{
        title: String,
        text : String,
        rating : String,
        data : String,
    }] 
});

module.exports = mongoose.model("Theory", TheorySchema)
const mongoose = require("mongoose"),
	Schema = mongoose.Schema;
    
const FilterSchema = new Schema({
    user_id : {
        type: Schema.Types.ObjectId, ref: "User"
    },
    city : {
        type: String,
        required: true
    },
    price_currency: {
        type: String,
        required: false
    },
    price_from: {
        type: String,
        required: false
    },
    price_to: {
        type: String,
        required: false
    },
    rate: {
        type: String,
        required: false
    },
    transmission: {
        type: String,
        required: false
    },
    time: {
        type: String,
        required: false 
    },
    availible_date_from: {
        type: String,
        required: false
    },
    availible_date_to: {
        type: String,
        required: false
    },
});

module.exports = mongoose.model("Filter", FilterSchema)
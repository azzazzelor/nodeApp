const mongoose = require("mongoose"),
	Schema = mongoose.Schema;
    
const FilterSchema = new Schema({
    userId : {
        type: Schema.Types.ObjectId, ref: "User"
    },
    city : {
        type: String,
        required: true
    },
    priceCurrency: {
        type: String,
        required: false
    },
    priceFrom: {
        type: String,
        required: false
    },
    priceTo: {
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
    availibleDateFrom: {
        type: String,
        required: false
    },
    availibleDateTo: {
        type: String,
        required: false
    },
});

module.exports = mongoose.model("Filter", FilterSchema)
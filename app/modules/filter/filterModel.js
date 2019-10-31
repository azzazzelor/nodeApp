const mongoose = require("mongoose"),
	Schema = mongoose.Schema;
    
const FilterSchema = new Schema({
    userId : {
        type: Schema.Types.ObjectId, ref: "User"
    },
    km: {
        type: String,
        required: true,
        default: '30',
    },
    priceCurrency: {
        type: String,
        required: false,
        default: 'chf',
    },
    priceFrom: {
        type: String,
        required: false,
        default: '0',
    },
    priceTo: {
        type: String,
        required: false,
        default: '100',
    },
    rate: {
        type: String,
        required: false,
        default: 'Top rated' 
    },
    transmission: {
        type: String,
        required: false,
        default: 'Auto'
    },
    time: {
        type: String,
        required: false,
        default: 'Morning'
    },
    availibleDateFrom: {
        type: String,
        required: false,
        default: null
    },
    availibleDateTo: {
        type: String,
        required: false,
        default: null
    },
});

module.exports = mongoose.model("Filter", FilterSchema)
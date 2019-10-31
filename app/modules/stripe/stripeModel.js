const mongoose = require("mongoose"),
	Schema = mongoose.Schema;
    
const StripeSchema = new Schema({
    Email: {
        type: String,
        required: true
    },
    stripeAccKey: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: false
    },
    last_three: {
        type: String,
        required: false
    },
    first_name: {
        type: String,
        required: false
    },
    last_name: {
        type: String,
        required: false
    },
    exp_month: {
        type: String,
        required: false
    },
    exp_year: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model("Stripe", StripeSchema)
const mongoose = require("mongoose"),
	Schema = mongoose.Schema;
    
const StripeSchema = new Schema({
    Email: {
        type: String,
        require: true
    },
    stripeAccKey: {
        type: String,
        required: true
    },

});

module.exports = mongoose.model("Stripe", StripeSchema)
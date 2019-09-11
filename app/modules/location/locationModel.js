const mongoose = require('mongoose'),
	Schema = mongoose.Schema;

const LocationSchema = new Schema({
    userId : { type: Schema.Types.ObjectId , ref: 'User'},
    latitude : {
        type: String
    },
    longitude : {
        type: String
    }
});




module.exports = mongoose.model('Location', LocationSchema);
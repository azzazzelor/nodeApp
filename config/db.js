require('dotenv').config();
const mongoose = require('mongoose');

const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
};



mongoose.connect(process.env.HOST, options, onConnect);

function onConnect(error) {
    if (!error) {
        console.log('Mongodb is connected');
    }
}

module.exports = mongoose;
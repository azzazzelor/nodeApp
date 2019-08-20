require('dotenv').config();
const mongoose = require('mongoose');
const HOST = process.env.MONGODB_URI || process.env.HOST;
const URl = `${HOST}${process.env.DB}`;

const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
};

mongoose.connect(URl, options, onConnect);

function onConnect(error) {
    if (!error) {
        console.log('Mongodb is connected');
    }else {
        console.log(`Mongodb connection error: ${error}`);
      }
  
}

module.exports = mongoose;
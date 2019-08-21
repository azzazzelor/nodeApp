require('dotenv').config();
const mongoose = require('mongoose');

const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
};

const HOST = process.env.MONGODB_URI || process.env.HOST;
const DB = "heroku_36nt81n4" || process.env.DB;

const URL = `${HOST}${DB}`;

mongoose.connect(URL, options, onConnect);

function onConnect(error) {
    if (!error) {
        console.log('Mongodb is connected');
    }else {
        console.log(`Mongodb connection error: ${error}`);
      }
  
}

module.exports = mongoose;
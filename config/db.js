const mongoose = require('mongoose');

const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
};

const HOST = process.env.MONGODB_URI || process.env.HOST;

mongoose.connect(HOST, options, onConnect);

function onConnect(error) {
    if (!error) {
        console.log("\x1b[32m", 'DB is connected', "\x1b[37m");
    } else {
        console.log("\x1b[31m", `DB connection error: ${error}`, "\x1b[37m");
    }
}

module.exports = mongoose;
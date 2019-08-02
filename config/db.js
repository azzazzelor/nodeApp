
const mongoose = require('mongoose')

const options = {
    useNewUrlParser: true,
    useCreateIndex: true
};

mongoose.connect("mongodb://localhost:27017/testdb",options,function(err){
    if(!err){console.log('Mongodb is connected')}
}
)

module.exports = mongoose;
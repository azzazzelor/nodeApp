const mongoose = require('mongoose'),  
      Schema = mongoose.Schema;

const MessageSchema = new Schema({  
  chatId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  recipientId : {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
},
{
  timestamps: true 
});

module.exports = mongoose.model('Message', MessageSchema);
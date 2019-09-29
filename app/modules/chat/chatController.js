const MessageModel = require('./messageModel');
const ChatModel = require('./chatModel');

exports.getChats = function (req, res) {
    const {userId,} = req.body;
    
    ChatModel
    .find({participants: userId})
    .select('_id')
    .exec((err,chats)=>{
        if(err){
            res.send('{error: 1}')
        }else{
            let fullChats = [];
            chats.forEach((chat)=>{
                MessageModel.find({'chatId': chat._id }).sort('-createdAt').limit(1)
            })

        }

    })
}
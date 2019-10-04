const MessageModel = require('./messageModel');
const ChatModel = require('./chatModel');

exports.getChats = function (req, res) {
    const {userId} = req.body;
    
    ChatModel
    .find({participants: userId})
    .select('_id')
    .exec((err,chats)=>{
        if(err){
            res.send('{ error: 1}')
        }else{
            let fullChats = [];
            chats.forEach((chat)=>{
                MessageModel.find({'chatId': chat._id })
                .sort('-createdAt')
                .limit(1)
                .exec((err, messaage)=>{
                    if(err){
                        res.send('{error: 1}')
                    }else{
                        fullChats.push(messaage);
                        if(fullChats.length === chats.length){
                            return res.status(200).json({ chats: fullChats });
                        }
                    }
                })
            })

        }

    })
}

exports.getChat = function (req, res) {
    const {chatId} = req.body;

    MessageModel
    .find({chatId : chatId})
    .select('createdAt body author')
    .sort('-createdAt')
    .exec((err, messages)=> {
        if (err) {
          res.send('{ error: 1 }');
        }else{
        res.status(200).json({ chat: messages });
        }
    });
}

exports.newChat = function (req, res) {
    const {recipientId, message, senderId} =req.body;

    if(!recipientId) {
        res.status(422).send({ error: 'Please choose a valid recipient for your message.' });
    }
    
    if(!message) {
    res.status(422).send({ error: 'Please enter a message.' });
    }

    const Chat = new ChatModel({
    participants: [senderId, recipientId]
    });

    Chat.save((err, chat)=> {
    if (err) {
        res.send('{ error: 1 }');
    }

    let newMess = new MessageModel({
        chatId: chat._id,
        body: message,
        author: senderId
    });

        newMess.save(function(err, newMessage) {
            if (err) {
            res.send('{ error: 1 }');
            }

            res.status(200).send(`chat is started. Chat id : ${chat._id}`)
        });
    });
}

exports.sendReply = function (req, res){
    let {chatId, message, senderId} = req.body;

     let reply = new MessageModel({
        chatId : chatId,
        body : message,
        author : senderId
     })
     reply.save((err, sentReply)=>{
         if (err){
             res.send('{error : 1}')
         }else{
            res.status(200).json({ message: 'Reply successfully send!' });
         }
     })
}


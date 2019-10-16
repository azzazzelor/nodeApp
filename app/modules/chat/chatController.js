const MessageModel = require('./messageModel');
const ChatModel = require('./chatModel');
const UserModel = require('../user/userModel')

exports.getChats = function (req, res) {
    const {userId} = req.body;
    
    if(!userId) {
        return res.status(422).send({ error: 'Please enter userID.' });
    }

    ChatModel
    .find({participants: userId})
    .select('_id')
    .exec((err,chats)=>{
        if(err){
            return res.send('{ error: 1}')
        }else{
            let fullChats = [];

            chats.forEach((chat)=>{
                MessageModel.find({'chatId': chat._id })
                .populate({
                    path: 'recipientId',
                    select :'email -_id', 
                    populate : {
                        path : 'school',
                        select: 'personalImage userId name -_id'
                    }
                })
                .populate({
                    path: 'recipientId',
                    select :'email -_id', 
                    populate : {
                        path : 'instructor',
                        select: 'personalImage firstName userId lastName -_id'
                    }
                })
                .populate({
                    path: 'recipientId',
                    select :'email -_id', 
                    populate : {
                        path : 'student',
                        select: 'personalImage firstName userId lastName -_id'
                    }
                })
                .populate({
                    path: 'author',
                    select :'email -_id', 
                    populate : {
                        path : 'school',
                        select: 'personalImage userId name -_id'
                    }
                })
                .populate({
                    path: 'author',
                    select :'email -_id', 
                    populate : {
                        path : 'instructor',
                        select: 'personalImage firstName userId lastName -_id'
                    }
                })
                .populate({
                    path: 'author',
                    select :'email -_id', 
                    populate : {
                        path : 'student',
                        select: 'personalImage firstName userId lastName -_id'
                    }
                })
                .sort('-createdAt')
                .limit(1)
                .exec((err, messaage)=>{
                    if(err){
                        return res.send('{error: 1}')
                    }else{
                        fullChats.push(...messaage);
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
     if(!chatId) {
        return res.status(422).send({ error: 'Please enter chatId.' });
        }
    MessageModel
    .find({chatId : chatId})
    .select('createdAt body author')
    .sort('-createdAt')
    .exec((err, messages)=> {
        if (err) {
            return res.send('{ error: 1 }');
        }else{
            return res.status(200).json({ chat: messages });
        }
    });
}

exports.newChat = function (req, res) {
    const {recipientId, message, senderId} = req.body;

    if(!senderId) {
        return  res.status(422).send({ error: 'Please choose a valid senderId.' });
    }

    if(!recipientId) {
        return  res.status(422).send({ error: 'Please choose a valid recipient for your message.' });
    }
    
    if(!message) {
        return res.status(422).send({ error: 'Please enter a message.' });
    }

    const Chat = new ChatModel({
    participants: [senderId, recipientId]
    });

    Chat.save((err, chat)=> {
    if (err) {
        return res.send('{ error: 1 }');
    }

    let newMess = new MessageModel({
        chatId: chat._id,
        body: message,
        author: senderId,
        recipientId: recipientId
    });

        newMess.save(function(err, newMessage) {
            if (err) {
                return res.send('{ error: 1 }');
            }

            let obj = {
                'senderId':senderId,
                'recipientId': recipientId,
                'chatId': chat._id,
            }
            
            UserModel.findOneAndUpdate({_id: senderId}, {$push: {activeChats: obj}},(err,result)=>{
                if(err){
                    return res.send({error: 1})
                }else{
                    UserModel.findOneAndUpdate({_id: recipientId}, {$push: {activeChats: obj}},(err,result)=>{
                        if(err){
                            return res.send({error: 1})
                        }
                    })
                    
                }
            })
            return res.status(200).json(`${chat._id}`)
        });
    });
}

exports.sendReply = function (req, res){
    let {chatId, message, senderId, recipientId} = req.body;

    if(!message) {
        return status(422).send({ error: 'Please enter a message.' }).end();
    }
    if(!chatId) {
        return res.status(422).send({ error: 'Please enter a chatId.' }).end();
    }
    if(!senderId) {
        return res.status(422).send({ error: 'Please enter a senderId.' }).end();
    }

    if(!recipientId) {
        return res.status(422).send({ error: 'Please enter a senderId.' }).end();
    }
    
     let reply = new MessageModel({
        chatId : chatId,
        body : message,
        author : senderId,
        recipientId: recipientId
     })
     reply.save((err, sentReply)=>{
         if (err){
            return res.send('{error : 1}')
         }else{
            return res.status(200).json({ message: 'Reply successfully send!' });
         }
     })
}



const passport = require('passport');

const ChatController = require('./chatController');


module.exports = (app) => {
    app.post(
        '/getChats',
        //passport.authenticationMiddleware(),
        ChatController.getChats
    );
    app.post(
        '/getChat',
        // passport.authenticationMiddleware(),
        ChatController.getChat
    )
    app.post(
        '/sendReply',
        // passport.authenticationMiddleware(),
        ChatController.sendReply
    );
    app.post(
        '/newChat',
         // passport.authenticationMiddleware(),
        ChatController.newChat
    );
};
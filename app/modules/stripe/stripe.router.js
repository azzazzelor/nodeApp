const passport = require('passport');

const StripeController = require('./stripeController');


module.exports = (app) => {
    app.post(
        '/individual_acc',
        //passport.authenticationMiddleware(),
        StripeController.createAcc
    );
    app.post(
        '/add_card', 
        //passport.authenticationMiddleware(),
        StripeController.addCard
    );
    app.post(
        '/transaction',
         //passport.authenticationMiddleware(),
         StripeController.transaction

    );
    app.post(
        '/get_card_info',
        //passport.authenticationMiddleware(),
        StripeController.get_card_info
    );
};
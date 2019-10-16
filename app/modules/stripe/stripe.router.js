const passport = require('passport');

const StripeController = require('./stripeController');


module.exports = (app) => {
    app.post(
        '/acc_auth',
        //passport.authenticationMiddleware(),
        StripeController.accountAuth
    );
    // app.post(
    //     '/add_filters/:id',
    //     // passport.authenticationMiddleware(),
    //     FilterController.add_filters
    // );
};
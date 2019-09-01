const passport = require('passport');

const FilterController = require('./filterController');


module.exports = (app) => {
    app.get(
        '/get_filters/:id',
        //passport.authenticationMiddleware(),
        FilterController.get_filters
    );
    app.post(
        '/add_filters/:id',
        // passport.authenticationMiddleware(),
        FilterController.add_filters
    );
};
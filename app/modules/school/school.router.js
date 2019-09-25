const passport = require('passport');

const SchoolController = require('./schoolController');

module.exports = (app) => {
    app.get(
        '/school/:id',
        // passport.authenticationMiddleware(),
        SchoolController.getByUserId
    );
    app.post(
        '/school/update/:id',
        // passport.authenticationMiddleware(),
        SchoolController.updateById
    );
};


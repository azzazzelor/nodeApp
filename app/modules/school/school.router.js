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
    app.post(
        '/get_school_instructors',
        // passport.authenticationMiddleware(),
        SchoolController.getInstructors
    );
    app.post(
        '/change_rating',
            // passport.authenticationMiddleware(),
            SchoolController.changeRating
    )
};


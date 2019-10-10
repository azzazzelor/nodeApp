const passport = require('passport');

const InstructorController = require('./instructorController');

module.exports = (app) => {
    app.get(
        '/instructor/:id',
        // passport.authenticationMiddleware(),
        InstructorController.getByUserId
    );
    app.post(
        '/instructor/update/:id',
        // passport.authenticationMiddleware(),
        InstructorController.updateById
    );
    app.post(
        '/become_instructor/:id',
        // passport.authenticationMiddleware(),
        InstructorController.becomeInstructor
    );
    app.post(
        '/get_users_by_car',
        // passport.authenticationMiddleware(),
        InstructorController.getUsersCar
    )
};
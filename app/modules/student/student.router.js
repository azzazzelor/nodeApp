const passport = require('passport');

const StudentController = require('./studentController');

module.exports = (app) => {
    app.get(
        '/student/:id',
        // passport.authenticationMiddleware(),
        StudentController.getByUserId
    );
    app.post(
        '/student/update/:id',
        // passport.authenticationMiddleware(),
        StudentController.updateById
    );
    app.post(
        '/add_like_user/:id',
        // passport.authenticationMiddleware(),
        StudentController.add_like_user
    );
    app.post(
        '/take_like/:id',
        // passport.authenticationMiddleware(),
        StudentController.takeLike
    );
    app.post(
        '/get_status',
        // passport.authenticationMiddleware(),
        StudentController.get_status
    );
};


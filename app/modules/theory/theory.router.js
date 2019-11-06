const TheoryController = require('./theoryController');

module.exports = (app) => {
    app.post(
        '/add_course',
        //passport.authenticationMiddleware(),
        TheoryController.addCourse
    );
    app.get(
        '/get_all_courses',
        // passport.authenticationMiddleware(),
        TheoryController.getAllCourses
    );
    app.post(
        '/add_one_topic',
        //passport.authenticationMiddleware(),
        TheoryController.addNewTopic
    );
    app.post(
        '/change_topic_rating',
        //passport.authenticationMiddleware(),
        TheoryController.changeTopicRating
    )
};
const passport = require('passport');

const BookingController = require('./bookingController');

module.exports = (app) => {
    app.post(
        '/filterAvalibleBookings',
        // passport.authenticationMiddleware(),
        BookingController.filterBookings
    );
    app.post(
        '/addBooking',
        //passport.authenticationMiddleware(),
        BookingController.addBooking
    );
    app.post(
        '/getOrders/:type',
        //passport.authenticationMiddleware(),
        BookingController.getOrders
    );
    app.post(
        '/acceptById',
        //passport.authenticationMiddleware(),
        BookingController.accept
    );
    app.post(
        '/declineById',
        //passport.authenticationMiddleware(),
        BookingController.decline
    );
    app.post(
        '/getInProgresStudents',
        //passport.authenticationMiddleware(),
        BookingController.getInProgresStudents
    );
    app.post(
        '/getByUnicId',
          //passport.authenticationMiddleware(),
          BookingController.getByUnicId
    )
    app.post(
        '/finishOrder',
        //passport.authenticationMiddleware(),
        BookingController.finishOrder
    );
    app.post(
        '/getStudentsOrders',
        //passport.authenticationMiddleware(),
        BookingController.getStudentsOrders
    )
};


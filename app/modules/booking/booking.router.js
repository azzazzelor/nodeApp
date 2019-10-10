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
    )
    app.post(
        '/changeOrderStatus',
        //passport.authenticationMiddleware(),
        BookingController.changeOrderStatus
    )
    app.post(
        '/getInProgresStudents',
        //passport.authenticationMiddleware(),
        BookingController.getInProgresStudents
    )

};


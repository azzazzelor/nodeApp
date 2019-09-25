const passport = require('passport');

const BookingController = require('./bookingController');

module.exports = (app) => {
    app.get(
        '/filterAvalibleBookings',
        // passport.authenticationMiddleware(),
        BookingController.filterBookings
    );
    app.post(
        '/addBooking',
        //passport.authenticationMiddleware(),
        BookingController.addBooking
    );
    app.get(
        '/getOrders/:type',
        //passport.authenticationMiddleware(),
        BookingController.getOrders
    )
    app.post(
        '/changeOrderStatus',
        //passport.authenticationMiddleware(),
        BookingController.changeOrderStatus
    )
    app.get(
        '/getInProgresStudents',
        //passport.authenticationMiddleware(),
        BookingController.getInProgresStudents
    )

};


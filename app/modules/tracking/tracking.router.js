const TrackingController = require('./trackingController');

module.exports = (app) => {
    app.post(
        '/startTracking',
        //passport.authenticationMiddleware(),
        TrackingController.startTracking
    );
//    app.post(
//        '/addPoints',
//         //passport.authenticationMiddleware(),
//         TrackingController.addPoints
//    );
   app.post(
       '/getTracking',
        //passport.authenticationMiddleware(),
        TrackingController.getTrack
   );
//    app.get(
//        '/getSystemPref',
//        //passport.authenticationMiddleware(),
//        TrackingController.getSystemPref
//    );
};
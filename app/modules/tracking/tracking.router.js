const TrackingController = require('./trackingController');

module.exports = (app) => {
    app.post(
        '/startTracking',
        //passport.authenticationMiddleware(),
        TrackingController.startTracking
    );
   app.post(
       '/addPoints',
        //passport.authenticationMiddleware(),
        TrackingController.addPoints
   );
   app.get(
       '/getTracking',
        //passport.authenticationMiddleware(),
        TrackingController.getTrack
   )
};
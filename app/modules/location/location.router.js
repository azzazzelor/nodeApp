const LocationController = require('./locationController');

module.exports = (app) => {
  app.post(
    '/update_location',
    LocationController.updateLocation
    )
  // app.post(
  //   '/get_near_'
  // )
};


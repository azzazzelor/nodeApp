const EmailVerifController = require('./emailVerificationController');

module.exports = (app) => {
  app.get(
    '/send_verification',
     // passport.authenticationMiddleware(),
    EmailVerifController.sendScript
    )
  app.get(
    '/verify',
     // passport.authenticationMiddleware(),
    EmailVerifController.getScript
  );
  app.post(
    '/reset_passw',
    // passport.authenticationMiddleware(),
    EmailVerifController.reset_passw
  );
  app.post(
    '/reset_passw_beck',
    // passport.authenticationMiddleware(),
    EmailVerifController.reset_passw_beck
  );
};


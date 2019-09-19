const EmailVerifController = require('./emailVerificationController');

module.exports = (app) => {
  app.get(
    '/send_verification',
    EmailVerifController.sendScript
    )
  app.get(
    '/verify',
    EmailVerifController.getScript
  )
};


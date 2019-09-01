const PhotoController = require('./photoController');

module.exports = (app) => {
  app.post(
    '/upload_photo',
    PhotoController.uploadPhoto
    )
};


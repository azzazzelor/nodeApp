/**
 * load DB config
 */
require('./db');
/**
 * load cloudinary config
 */
require('./cloudinary')

module.exports = {
	loader: require('./loader')
}

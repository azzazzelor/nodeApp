const glob = require('glob');
const path = require('path');

module.exports = (app) => {
	glob.sync(`app/modules/**/*.router.js`).forEach((file) => {
		//for debug, need remove:
		console.log("require file:");
		console.log(file);
		//-----------------------

		require(path.resolve(file))(app);
	});
};
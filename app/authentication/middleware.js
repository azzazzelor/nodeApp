module.exports = () => {
	return (req, res, next) => {

		if (req.isAuthenticated()) {
			return next();
		}
		
		res.status(403).json({ 
			error: 1,
			errmsg: 'Access denied',
			name: "AppError",
		});
	}
};

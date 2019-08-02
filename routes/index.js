const express = require('express');
const router = express.Router();
const {passport} = require('../passport/passport');
const registrationController = require('../controllers/registrationController')
const studentController = require('../controllers/studentController');
const schoolControllers = require('../controllers/schoolControllers');
const instructorControllers = require('../controllers/instructorControllers');
//auth
router.post("/", passport.authenticate('local'),
function(req,res){
	res.send(req.user);
}
)

//registration 
router.post('/registration', registrationController.registration
)

// get by id users
router.get('/student/:id' , studentController.get_by_id)
router.get('/school/:id' , schoolControllers.get_by_id)
router.get('/instructor/:id' , instructorControllers.get_by_id)



module.exports = router;
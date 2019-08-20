const express = require('express');
const router = express.Router();
const {passport} = require('../passport/passport');
const registration_controller = require('../controllers/registrationController');
const student_controller = require('../controllers/studentController');
const school_controllers = require('../controllers/schoolControllers');
const instructor_controllers = require('../controllers/instructorControllers');
const become_instructor_controllers = require('../controllers/becomeInstructorControllers');
const filter_users_controllers = require('../controllers/filterUsersControllers');
const find_car = require('../controllers/findCarByNameControllers');

router.get("/",
	function(req, res){
		res.status(200).json({ messages: 'server is runing' });
	}
);
//auth

router.post(
	"/", 
	passport.authenticate('local'),
	function(req, res){
		res.send(req.user);
	}
)

//registration 
router.post('/registration', registration_controller.registration);

// get by id users
router.get('/student/:id' , student_controller.get_by_id);
router.get('/school/:id' , school_controllers.get_by_id);
router.get('/instructor/:id' , instructor_controllers.get_by_id);

// update by id
router.post('/student/update/:id' , student_controller.update_by_id);
router.post('/school/update/:id' , school_controllers.update_by_id);
router.post('/instructor/update/:id' , instructor_controllers.update_by_id);

//become instructor
router.post('/become_instructor/:id', become_instructor_controllers.become_instructor );

// update filters 
router.post('/add_filters/:id', filter_users_controllers.add_filters_for_user );
router.get('/get_filters/:id', filter_users_controllers.get_user_filters);

// add like user
router.post('/add_like_user/:id' , student_controller.add_likes_users );

// find car 
router.get('/get_users_by_car/' , find_car.get_car_by_name );



module.exports = router;
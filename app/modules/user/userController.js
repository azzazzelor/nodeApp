const bcrypt = require('bcryptjs');

const User = require('./userModel');
const Student = require('../student/studentModel');
const Instructor = require('../instructor/instructorModel')
const School = require('../school/schoolModel')
const validationService = require('../../services/validation.service');
const {APP_ERRORS} = require('../../../config/constants');

/**
 * Base GET "/" method
 * @param req
 * @param res
 */
exports.root = (req, res) => {

	const loginErrors = {
		localLoginError: req.flash('loginMessage'),
		facebookLoginError: req.flash('facebookError'),
		googleLoginError: req.flash('googleError')
	};

	switch(loginErrors){
		case loginErrors.localLoginError.length:
			res.status(401).json({
				error: 1,
				name: "AppError",
				code: APP_ERRORS.LOCAL_AUTHENTICATE_ERROR,
				errmsg: loginErrors.localLoginError[0]
			});
			break;

		case loginErrors.facebookLoginError:
			res.status(401).json({
				error: 1,
				name: "AppError",
				code: APP_ERRORS.FACEBOOK_AUTHENTICATE_ERROR,
				errmsg: loginErrors.facebookLoginError[0]
			});
			break;

		case loginErrors.googleLoginError:
			res.status(401).json({
				error: 1,
				name: "AppError",
				code: APP_ERRORS.GOOGLE_AUTHENTICATE_ERROR,
				errmsg: loginErrors.googleLoginError[0]
			});
			break;

		default :
			res.status(200).json({
				error: 0,
			});
			break;
	}


};

/**
 * Log In method
 * @param req
 * @param res
 */
exports.signin = (req, res) => {
	res.status(200).json({
		error: 0,
		user: req.user
	});
};

/**
 * Registration method
 * @param req
 * @param res
 * @returns {*}
 */
exports.signup = (req, res) => {
	try {
		const roleType = req.body.roleType;
	    const roleTypeValidation = validationService.validateRoleType(roleType);

	    if (roleTypeValidation.error === 0) {
	    	switch(roleType) {
		        case 'student':
		            return createNewStudent(req.body)
			            .then(() => {
			            	res.status(200).json({error: 0});
			            })
			            .catch((error) => {
			            	res.status(200).json(error);
			            });

		        case 'instructor':
					return createNewInstructor(req.body)
						.then(() => {
							res.status(200).json({error: 0});
						})
						.catch((error) => {
							res.status(200).json(error);
						});

		        case 'school':
					return createNewSchool(req.body)
						.then(() => {
							res.status(200).json({error: 0});
						})
						.catch((error) => {
							res.status(200).json(error);
						});
		    }
	    } else {
	    	res.status(200).json(roleTypeValidation);
	    }

	} catch(error) {
		res.status(500).json({
			error: 1,
			name: "AppError",
			errmsg: `Server general error: ${error}`,
			code: APP_ERRORS.GENERAL_ERROR
		});
	}

};

exports.getUserByEmail = (email, next) => {
	User.findOne({email}, next);
};

exports.getUserByID = (id) => {
	return new Promise((resolve, reject) => {
		User.findById(id, (error, user) => {
			if (error) return reject(error);
			return resolve(user);
		});
	});
};

/**
 * Create User helper
 * @param data
 * @returns {Promise<any>}
 */
const createUser = (data) => {
	const {
		email,
        password,
        phoneNumber,
		roleType,
		facebook,
		google
    } = data;

	return new Promise((resolve, reject) => {
		//check email
		const emailValidation = validationService.validateEmail(email);
		if (emailValidation.error) return reject(emailValidation);
		//check password
		const passwordValidation = validationService.validatePassword(password);
		if (passwordValidation.error) return reject(passwordValidation);
		//check phone number
		const phoneNumberValidation = validationService.validatePhoneNumber(phoneNumber);
		if (phoneNumberValidation.error) return reject(phoneNumberValidation);
		
		//create new user
		let newUser = new User({
			email: email.toLowerCase(),
			password,
			phoneNumber,
			roleType,
			facebook,
			google
		});

		bcrypt.genSalt(10, (err, salt) => {
			if(err) return reject(err);

		    bcrypt.hash(newUser.password, salt, (err, hash) => {
		    	if(err) return reject(err);

		    	//hashed password
		    	newUser.password = hash;

      			newUser.save((err, user) => {
      				if(err) return reject(err);

      				return resolve(user);
  				});
	    	});
		});

	});
};

/**
 * Remove user helper
 * @param userId
 * @returns {Promise<any>}
 */
const removeUser = (userId) => {
	return new Promise((resolve, reject) => {
		User.remove({_id: userId}, (err, user) => {
        	if (err) return reject(err);

        	return resolve();
        });
	});
};

/**
 * Create New Student helper
 * @param data
 * @returns {Promise<any>}
 */
const createNewStudent = (data) => {
	const {
        firstName,
        lastName,
        age,
        driverLicenseStatus,
        personalImage,
        //coverImage
    } = data;

	return new Promise((resolve, reject) => {
		//check first name
		const firstNameValidation = validationService.validateFirstName(firstName);
		if (firstNameValidation.error) return reject(firstNameValidation);
		//check last name
		const lastNameValidation = validationService.validateLastName(lastName);
		if (lastNameValidation.error) return reject(lastNameValidation);
		//check age
		const ageValidation = validationService.validateAge(age);
		if (ageValidation.error) return reject(ageValidation);
		//check driver license status
		const driverLicenseStatusValidation = validationService.validateStudentDriverLicense(driverLicenseStatus);
		if (driverLicenseStatusValidation.error) return reject(driverLicenseStatusValidation);
		//check personal image
		const personalImageValidation = validationService.validatePersonalPhotoUrl(personalImage);
		if (personalImageValidation.error) return reject(personalImageValidation);
		//check cover image
		// const coverImageValidation = validationService.validateCoverPhotoUrl(coverImage);
		// if (coverImageValidation.error) return reject(coverImageValidation);

		createUser(data).then((user) => {

			const newStudent = new Student({
                userId: user.id,
                firstName,
                lastName,
                age: +age,
                driverLicenseStatus,
                personalImage,
                // coverImage
            });

            newStudent.save((err, student) => {
            	if (err) {
                    removeUser(user._id).then(() => {
                    	return reject(err);
                    });
                } else {
                    return resolve(student);
                }
            });
		}).catch((error) => {
			return reject(error);
		});

	});
};

const createNewInstructor = (data) => {
	const {
		firstName,
        lastName,
        personalImage,
        driverLicenseNumber,
        driverExperienceYear,
        plateNumber,
        driverLicensePhoto,
        drivingSchoolId, 
        coverImage,
        pricePerKmCurrency,
		pricePerHourCurrency,
	} = data;

	const newInstructBodyCar = Object.assign({}, ...data.car);
        
    const {
		brand,
        transmission,
        registrationNumber,
        pricePerKm,
		pricePerHour
    } = newInstructBodyCar;
		
	return new Promise((resolve, reject)=>{
		//check first name
		const firstNameValidation = validationService.validateFirstName(firstName);
		if (firstNameValidation.error) return reject(firstNameValidation);
		//check last name
		const lastNameValidation = validationService.validateLastName(lastName);
		if (lastNameValidation.error) return reject(lastNameValidation);
		//check personal image
		const personalImageValidation = validationService.validatePersonalPhotoUrl(personalImage);
		if (personalImageValidation.error) return reject(personalImageValidation);
		//check cover image
		const coverImageValidation = validationService.validateCoverPhotoUrl(coverImage);
		if (coverImageValidation.error) return reject(coverImageValidation);
		//check driver License Number
		const validateDriverLicenceNumber = validationService.validateDriverLicenceNumber(driverLicenseNumber);
		if (validateDriverLicenceNumber.error) return reject(validateDriverLicenceNumber);
		//check driver experience year
		const validateExperienceYear = validationService.validateExperienceYear(driverExperienceYear);
		if (validateExperienceYear.error) return reject(validateExperienceYear);
		//check plate Number
		const validatePlateNumber = validationService.validatePlateNumber(plateNumber);
		if (validatePlateNumber.error) return reject(validatePlateNumber);
		//check driver License Photo
		const validateDriverLicencePhoto = validationService.validateDriverLicencePhoto(driverLicensePhoto);
		if (validateDriverLicencePhoto.error) return reject(validateDriverLicencePhoto);
		//check price Per Km Currency
		const validatePricePerKmCurrency = validationService.validatePricePerKmCurrency(pricePerKmCurrency);
		if (validatePricePerKmCurrency.error) return reject(validatePricePerKmCurrency);
		//check price Per Hour Currency
		const validatePricePerHourCurrency = validationService.validatePricePerHourCurrency(pricePerHourCurrency);
		if (validatePricePerHourCurrency.error) return reject(validatePricePerHourCurrency);
		//check brand
		const validateCarBrand = validationService.validateCarBrand(brand);
		if (validateCarBrand.error) return reject(validateCarBrand);
		//check transmission
		const validateТransmission = validationService.validateТransmission(transmission);
		if (validateТransmission.error) return reject(validateТransmission);
		//check registration Number
		const validateCarRegistrationNumber = validationService.validateCarRegistrationNumber(registrationNumber);
		if (validateCarRegistrationNumber.error) return reject(validateCarRegistrationNumber);
		//check price Per Km
		const validatePricePerKM = validationService.validatePricePerKM(pricePerKm);
		if (validatePricePerKM.error) return reject(validatePricePerKM);
		//check price Per Hour
		const validatePricePerHour = validationService.validatePricePerHour(pricePerHour);
		if (validatePricePerHour.error) return reject(validatePricePerHour);

		createUser(data).then((user) => {
			const newInstructor = new Instructor({
                userId: user.id,
                driverLicenseNumber,
                driverExperienceYear, 
                car:[{
                    brand,
                    transmission ,
                    registrationNumber,
                    pricePerKm,
                    pricePerHour,
                }],
                firstName,
                lastName,
                plateNumber,
                personalImage,
                drivingSchoolId,
				pricePerHourCurrency,
                driverLicensePhoto,
                pricePerKmCurrency,
				coverImage         
			})
			newInstructor.save((err, instructor) => {
            	if (err) {
                    removeUser(user._id).then(() => {
                    	return reject(err);
                    });
                } else {
					User.updateOne({_id:user.id},{instructor:instructor._id},(err)=>{if(err){reject(err)}});
                    return resolve(instructor);
                }
            });
        }).catch((error) => {
			return reject(error);
		});

	})
}

const createNewSchool = (data) => {
	const {
		name,
        adress,
        zipCode,
        vatNumber,
        lastDayInspection,
        pricePerTraining,
        pricePerTrainingCurrency,
        coverImage, 
        schoolLicensePhoto,
        personalImage
	} = data;

	return new Promise((resolve, reject)=>{
		//check personal image
		const personalImageValidation = validationService.validatePersonalPhotoUrl(personalImage);
		if (personalImageValidation.error) return reject(personalImageValidation);
		//check cover image
		const coverImageValidation = validationService.validateCoverPhotoUrl(coverImage);
		if (coverImageValidation.error) return reject(coverImageValidation);
		//check name
		const validateName = validationService.validateName(name);
		if (validateName.error) return reject(validateName);
		//check adress
		const validateAdress = validationService.validateAdress(adress);
		if (validateAdress.error) return reject(validateAdress);
		//check zip 
		const validateZipCode = validationService.validateZipCode(zipCode);
		if (validateZipCode.error) return reject(validateZipCode);
		//check vatNumber
		const validateVatNumber = validationService.validateVatNumber(vatNumber);
		if (validateVatNumber.error) return reject(validateVatNumber);
		//check last Day Inspection
		const validateLastDayInspection = validationService.validateLastDayInspection(lastDayInspection);
		if (validateLastDayInspection.error) return reject(validateLastDayInspection);
		//check pricePerTraining
		const validatePricePerTraining = validationService.validatePricePerTraining(pricePerTraining);
		if (validatePricePerTraining.error) return reject(validatePricePerTraining);
		//check price Per Training Currency
		const validatePricePerTrainingCurrency = validationService.validatePricePerTrainingCurrency(pricePerTrainingCurrency);
		if (validatePricePerTrainingCurrency.error) return reject(validatePricePerTrainingCurrency);
		//check school License Photo
		const validateSchoolLicencePhoto = validationService.validateSchoolLicencePhoto(schoolLicensePhoto);
		if (validateSchoolLicencePhoto.error) return reject(validateSchoolLicencePhoto);

		createUser(data).then((user) =>{
			const newSchool = new School({
                userId: user.id,
				name,
				adress,
				zipCode,
				vatNumber,
				lastDayInspection,
				pricePerTraining,
				pricePerTrainingCurrency,
				coverImage,
				schoolLicensePhoto,
				personalImage,				
			})
			
			newSchool.save((err, school) => {
            	if (err) {
                    removeUser(user._id).then(() => {
                    	return reject(err);
                    });
                } else {
					User.updateOne({_id:user.id},{school:school._id},(err)=>{if(err){reject(err)}});
                    return resolve(school);
                }
            });
        }).catch((error) => {
			return reject(error);
		});
	})
}

//Location set/update
exports.updateLocationUser = function(req, res){
	const {
		id,
		latitude,
		longitude,
		type
	} = req.body;
	
	User.updateOne({ _id: id },
		{
			$set: {
				'location.coordinates': [longitude, latitude],
				'location.type': type
			}
		},
		(err) => {
			if(err){
				res.status(401).json(err);
			} else {
				res.status(200).json({
					error: 0,
				});
			}
		}
	);

};


exports.allNearest = function(req, res) {
	const type = req.params.type;
	const limit = 10;

	const {
		studentId,
		latitude,
		longitude,
		maxDistance,
		pageNumber
	} = req.body;
	
	const latitudeNum = +latitude;
	const longitudeNum = +longitude;

	//TODO: add checks for required params
	 
	 User.find(
		{
			"roleType": type,
			"location": {
				$near:{
					$geometry: {
						type: "Point",
						coordinates: [longitudeNum, latitudeNum]
					},
					$maxDistance: +maxDistance
				}
			},
		}
	).select('location email phoneNumber')
	.populate(
		type
	)
	.skip((pageNumber - 1) * limit).limit(limit)
	.exec((err, users) => {
		if (err) {
			res.status(401).json(err);
		} else {
			//TODO: prepare what exactly you want returned

			users.forEach(user=>{
				if(user.school.studentsWhoLike.includes(studentId)){
					console.log('true')
				}
			})
			// res.status(200).json(users);
		}
	});
}

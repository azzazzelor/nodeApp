const Instructor = require('./instructorModel');
const validationService = require('../../services/validation.service');
const passwordService = require('../../services/password.service');
const User = require('../user/userModel');
const Student = require('../student/studentModel');
const bcrypt = require('bcryptjs');

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
        roleType
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
			email,
			password,
			phoneNumber,
			roleType
		});

		bcrypt.genSalt(10, (err, salt) => {
			if(err) return reject(err);

		    bcrypt.hash(newUser.password, salt, (err, hash) => {
		    	if(err) return reject(err);

		    	newUser.password = hash;
      			newUser.save((err, user) => {
      				if(err) return reject(err);

      				return resolve(user);
  				});
	    	});
		});

	});
};

exports.getByUserId = (req, res) => {
    Instructor.findOne({userId: req.params.id}, (err, instructor) => {
        if (err) res.status(404).json(err);

        res.status(200).json(instructor);
    });
};


exports.updateById = (req, res) => {
    const reqBody = req.body  
    const id = req.params.id

    return changeFields(reqBody,id).then((instructor)=>{
        res.send(instructor)
    }).catch((error) => {
        res.status(200).json(error);
    })
}   

const changeFields = (data,id) => {

    const {
        email,
        password,
        phoneNumber,
        firstName,
        lastName,
        driverExperienceYear,
        personalImage,
        coverImage
    } = data;

    const newReqbodyCar = Object.assign({}, ...data.car)
      
    const { 
        brand,
        transmission,
        registrationNumber,
        pricePerKm,
        pricePerHour
    } = newReqbodyCar;
    

    return new Promise((resolve, reject)=>{
        //check email
        const emailValidation = validationService.validateEmail(email);
        if (emailValidation.error) return reject(emailValidation);
        //check password
        const passwordValidation = validationService.validatePassword(password);
        if (passwordValidation.error) return reject(passwordValidation);
        //check phone number
        const phoneNumberValidation = validationService.validatePhoneNumber(phoneNumber);
        if (phoneNumberValidation.error) return reject(phoneNumberValidation);
        // check driver experience year
		const validateExperienceYear = validationService.validateExperienceYear(driverExperienceYear);
		if (validateExperienceYear.error) return reject(validateExperienceYear);
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

        let newpassw = passwordService.bcrptPassw(password)

        User.findByIdAndUpdate(id , 
            {   email,
                password: newpassw,
                phoneNumber,
            },
            function(err, user ) {
                if (err) {
                    return reject(err);
                }else{
                    Instructor.findOneAndUpdate(
                        { userId : id }, // критерий выборки
                        { $set: {
                            firstName,
                            lastName,
                            driverExperienceYear,
                            personalImage,
                            coverImage,
                            car:[{transmission,brand,registrationNumber,pricePerKm,pricePerHour}]
                            }}, // параметры обновления
                        function(err, instructor){
                            if(err){
                                return reject(err);
                            }
                            return resolve(instructor);
                        }
                    )
                }
            })
    })
}

exports.becomeInstructor = (req, res) => {
    const reqBody = req.body  
    const id = req.params.id

    return studentBecomeInstructor(reqBody,id).then((instructor)=>{
        res.send(instructor)
    }).catch((error) => {
        res.status(200).json(error);
    })
} 

const studentBecomeInstructor = (data,id) =>{
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
        pricePerHourCurrency
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

            User.deleteOne({_id:id}, function(err){
                if(err){reject(err)}
                
            })
            Student.deleteOne({userId:id}, function(err){
                if(err){reject(err) }
            })
            
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
                    return resolve(instructor);
                }
            });
        })
      }
    )
} 

exports.getUsersCar = (req,res) => {
    const brand = req.body.carBrand;
    const pageNum = +req.body.pageNumber;
    const limit = 10;

    if(brand === ''){
        res.status(400).json({ error: 'No brand' })
    }
    if(isNaN(pageNum)){
        res.status(400).json({ error: 'No page number' })
    }

    Instructor
    .find({'car': {$elemMatch: {brand: brand }}})
    .skip((pageNum - 1) * limit).limit(limit)
    .exec(function(err, result) {
        if(err){
            res.send(err)
        }else{
            res.send(result)
        }
    });
}


exports.updateLocationInstructor = function(req,res){
    createLocationForInstructor(req.body)
    .then(()=>{
        res.status(200).json({error: 0});
    })
    .catch((err) =>{
        res.satus(200).json(err);
    });
}

const createLocationForInstructor = function(data){
     const {id, latitude, longitude,} = data;
     return new Promise((resolve, reject) => {
        Instructor.updateOne({userId:id},{$push:{'location.coordinates':[longitude, latitude]}},(err,res)=>{
        if(err){
            reject(err)
        }else{
            resolve(res)
        }
     })
    })
}
